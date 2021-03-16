import React, { useCallback, useState } from "react";
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Button,
  IconButton,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
} from "@material-ui/core";
import { useStore } from "effector-react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  $Chats,
  $ChatsFilter,
  ChatStatus,
  getChatsFx,
  setChatsFilter,
} from "../stores/chats.effector";
import { MessengerChatItem } from "./MessengerChatItem";
import { MessengerLoader } from "./MessengerLoader";
import { Chat, User } from "../types";
import { $CurrentChat, setCurrentChat } from "../stores/currentChat.effector";

import ChatContextType from "../helpers/chatContextType";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRight: `1px solid ${theme.palette.divider}`,
      },
      header: {
        padding: theme.spacing(1.5, 2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        height: "52px",
      },
      chatList: {
        height: "calc(100% - 87px)",
        overflowY: "auto",
      },
      archiveButton: {
        width: "100%",
        background: theme.themeColors.secondary,
        color: theme.palette.text.secondary,
        textTransform: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(0.5, 1),
      },
      archiveButtonLabel: {
        fontSize: "12px",
        fontWeight: 500,
      },
      archiveTitle: {
        width: "100%",
        fontSize: "14px",
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
      },
      accordion: {
        boxShadow: "none",
      },
      expandIcon: {
        padding: "0 12px",
        color: theme.palette.text.secondary,
      },
      summary: {
        minHeight: "32px !important",
        padding: "0 12px",
        color: theme.palette.text.secondary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      content: {
        fontSize: "12px",
        lineHeight: "16px",
        margin: "0 !important",
      },
      details: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
      },
    }),
  { name: "MessengerChatList" }
);

export const MessengerChatList: React.FC = () => {
  const classes = useStyles();
  const isLoading = useStore(getChatsFx.pending);
  const $chats = useStore($Chats);
  const $currentChat = useStore($CurrentChat);
  const $chatsFilter = useStore($ChatsFilter);
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleChange = useCallback(
    (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
      if (isExpanded) {
        setExpanded((expanded) => [...expanded, panel]);
      } else {
        setExpanded((expanded) => expanded.filter((item) => item !== panel));
      }
    },
    []
  );

  const ChatList = useCallback(
    ({ childChats, parentId, ...chat }: Chat): Nullable<JSX.Element> => {
      let messageAuthor = "";

      const generateName = (author: User) =>
        `${author.firstName ?? ""} ${author.lastName ?? ""}${
          author.organizations[0]?.name
            ? `, ${author.organizations[0]?.name}`
            : ""
        }`;

      if (chat.pinnedMessage && chat.pinnedMessage.author) {
        messageAuthor = generateName(chat.pinnedMessage.author);
      } else if (chat.lastMessage && chat.lastMessage.author) {
        messageAuthor = generateName(chat.lastMessage.author);
      } else {
        messageAuthor = "Системный Помощник";
      }

      const childChatsSorted = childChats.reduce((acc, current) => {
        const group = current.contextType.mnemonic || "other";

        if (!acc[group]) acc[group] = [];

        acc[group].push(current);

        return acc;
      }, {});

      return (
        <>
          <MessengerChatItem
            isHidden={chat.chatStatus.id !== $chatsFilter}
            isActive={chat.id === $currentChat}
            pinned={Boolean(chat.pinnedMessage)}
            key={chat.id}
            chatName={chat.name ?? ""}
            name={messageAuthor}
            message={
              chat.pinnedMessage?.message ||
              chat.lastMessage?.message ||
              "Чат создан"
            }
            onClick={() => setCurrentChat(chat.id)}
          />
          {Object.keys(childChatsSorted).length > 0 &&
            Object.keys(childChatsSorted).map((key) => {
              const filtered = childChatsSorted[key].filter(
                (chat: Chat) => chat.chatStatus.id === $chatsFilter
              );

              if (!filtered.length) return null;

              return (
                <Box pl={chat.chatStatus.id !== $chatsFilter ? 0 : 2} key={key}>
                  <ExpansionPanel
                    square
                    classes={{
                      root: classes.accordion,
                      expanded: classes.content,
                    }}
                    expanded={Boolean(
                      expanded.find((item) => item === `${key}-${chat.id}`)
                    )}
                    onChange={handleChange(`${key}-${chat.id}`)}
                  >
                    <ExpansionPanelSummary
                      classes={{
                        root: classes.summary,
                        content: classes.content,
                        expandIcon: classes.expandIcon,
                      }}
                      aria-controls={`${key}-content`}
                      id={`${key}-header`}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      {
                        ChatContextType.find((item) => item.mnemonic === key)
                          ?.name
                      }
                    </ExpansionPanelSummary>
                    {filtered.map((chat: Chat) => (
                      <ExpansionPanelDetails
                        key={chat.id}
                        classes={{ root: classes.details }}
                      >
                        <ChatList {...chat} />
                      </ExpansionPanelDetails>
                    ))}
                  </ExpansionPanel>
                </Box>
              );
            })}
        </>
      );
    },
    [$chatsFilter, $currentChat, classes, expanded, handleChange]
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {$chatsFilter === ChatStatus.archive ? (
          <Box className={classes.archiveTitle}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setChatsFilter(ChatStatus.active)}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Box ml={1}>Архивные чаты</Box>
          </Box>
        ) : (
          <Box>
            <Box fontSize="20px" fontWeight={700}>
              Чаты
            </Box>
          </Box>
        )}
      </Box>
      {$chatsFilter !== ChatStatus.archive && (
        <Button
          classes={{
            root: classes.archiveButton,
            label: classes.archiveButtonLabel,
          }}
          onClick={() => setChatsFilter(ChatStatus.archive)}
        >
          Архивные чаты
        </Button>
      )}
      <Box className={classes.chatList}>
        {isLoading && <MessengerLoader size={40} list />}
        {$chats.length > 0 ? (
          $chats.map((chat) => <ChatList key={chat.id} {...chat} />)
        ) : (
          <Box
            color="text.secondary"
            fontSize="14px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            Нет доступных чатов
          </Box>
        )}
      </Box>
    </Box>
  );
};
