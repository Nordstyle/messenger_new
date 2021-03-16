import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Grid,
  Box,
  makeStyles,
  RootRef,
  Theme,
  IconButton,
  createStyles,
} from "@material-ui/core";
import { useStore } from "effector-react";
import uniqBy from "lodash.uniqby";
import { $widthSettings, setMode } from "../stores/resize.effector";
import MessengerMessage from "./MessengerMessages/MessengerMessage";
import { MessengerMessageSeparator } from "./MessengerMessages/MessengerMessageSeparator";
import { MessengerTextArea } from "./MessengerTextArea";
import { MessengerPinnedContainer } from "./MessengerPinnedContainer";
import { MessengerLoader } from "./MessengerLoader";
import { ChatName } from "../stores/chatName.effector";
import { $Settings } from "../stores/settings.effector";
import MessageService from "../services/MessageService";
import { $CurrentChat } from "../stores/currentChat.effector";
import { Message } from "../types";
import SignalRProvider, {
  NewMessageEvent,
  UpdatePollCommand,
} from "../services/SignalRProvider/SignalRProvider";
import { chatFindById } from "../helpers/findById";
import { $Chats, chatUpdateLastMessage } from "../stores/chats.effector";
import { MessengerTooltip } from "./MessengerTooltip";

import { ExpandIcon } from "../helpers/SvgComponents/ExpandIcon";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      header: {
        height: "52px",
        padding: theme.spacing(1.5, 2),
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      heading: {
        fontSize: "14px",
        lineHeight: "28px",
        fontWeight: "bolder",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      chatContainer: {
        position: "relative",
        height: "calc(100% - 52px)",
      },
      chatView: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto",
        padding: theme.spacing(3, 2, 1, 2),
      },
      pinnedContainer: {
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        cursor: "pointer",
      },
      textAreaContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
      },
    }),
  { name: "MessengerChatContainer" }
);

const INIT_COUNT_MESSAGES = 40;
const INIT_PAGE_INDEX = 1;

export const MessengerChatContainer: React.FC = () => {
  const classes = useStyles();
  const viewRef = useRef<Nullable<HTMLDivElement>>(null);
  const pinnedRef = useRef<Nullable<HTMLDivElement>>(null);
  const widthSettings = useStore($widthSettings);
  const $settings = useStore($Settings);
  const $currentChat = useStore($CurrentChat);
  const $chats = useStore($Chats);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(INIT_PAGE_INDEX);
  const currentChat = useMemo(() => chatFindById($chats, $currentChat), [
    $chats,
    $currentChat,
  ]);
  const isEmpty = useRef<boolean>(false);
  const pinnedMessage = useMemo(
    () => (currentChat ? currentChat?.pinnedMessage : null),
    [currentChat]
  );

  useEffect(() => {
    if (viewRef && viewRef.current) {
      viewRef.current.scrollTop = viewRef.current.scrollHeight;
    }
  }, [$currentChat]);

  useEffect(() => {
    if ($currentChat && !isEmpty.current && viewRef && viewRef.current) {
      const height = viewRef.current.scrollHeight;
      const position = viewRef.current.scrollTop;

      setIsFetching(true);
      MessageService.getMessagesByChat({
        pageIndex,
        pageSize: INIT_COUNT_MESSAGES,
        filter: {
          chatId: $currentChat,
        },
      })
        .then((response) => {
          if (!response.data.data.length && pageIndex !== INIT_PAGE_INDEX) {
            isEmpty.current = true;

            return;
          }

          setMessages((messages) =>
            uniqBy([...response.data.data, ...messages], "id").filter(
              (message) => message.chatId === $currentChat
            )
          );
        })
        .then(() => {
          if (viewRef && viewRef.current) {
            const newHeight = viewRef.current.scrollHeight;
            viewRef.current.scrollTop = position + (newHeight - height);
          }
        })
        .catch(() => setMessages([]))
        .finally(() => setIsFetching(false));
    }
  }, [$currentChat, pageIndex]);

  useEffect(() => {
    if (SignalRProvider.isConnected) {
      SignalRProvider.connection?.on(
        "onGetMessages",
        (onGetMessages: NewMessageEvent) => {
          chatUpdateLastMessage(onGetMessages.message);
          if ($currentChat === onGetMessages.chatId) {
            setMessages((messages) =>
              uniqBy([...messages, onGetMessages.message], "id").filter(
                (message) => message.chatId === $currentChat
              )
            );
          }
        }
      );
      SignalRProvider.connection?.on(
        "onUpdatePollMessage",
        (onUpdatePollCommand: UpdatePollCommand) => {
          if ($currentChat === onUpdatePollCommand.chatId) {
            setMessages((messages) => {
              const currentMessage = messages.find(
                (message) => message.id === onUpdatePollCommand.messageId
              );

              if (currentMessage && currentMessage.poll) {
                currentMessage.poll = {
                  ...currentMessage.poll,
                  voters: onUpdatePollCommand.voters.map((item) => ({
                    id: item.voterId,
                    firstName: item.voter.firstName,
                    lastName: item.voter.lastName,
                    middleName: item.voter.middleName,
                    login: item.voter.email,
                    isLike: item.isLike,
                  })),
                };
              }

              return uniqBy([...messages], "id").filter(
                (message) => message.chatId === $currentChat
              );
            });
          }
        }
      );
    }

    return () => {
      SignalRProvider.connection?.off("onGetMessages");
      SignalRProvider.connection?.off("onUpdatePollMessage");
    };
  }, [$currentChat, $settings]);

  useEffect(() => {
    setPageIndex(INIT_PAGE_INDEX);
    isEmpty.current = false;
  }, [$currentChat]);
  const messageList = useCallback(
    (messages: Message[]) => {
      return [...messages]
        .sort((a, b) => {
          return new Date(a.created).getTime() - new Date(b.created).getTime();
        })
        .map((message, index, msgs) => {
          const [date] = message.created.split("T");

          const isNewDate =
            index === 0 || date !== msgs[index - 1].created.split("T")[0];

          const isPinned = pinnedMessage?.id === message.id;

          return (
            <Box key={message.id}>
              {isNewDate && <MessengerMessageSeparator date={date} />}
              {isPinned ? (
                <RootRef rootRef={pinnedRef}>
                  <MessengerMessage
                    key={message.id}
                    isCurrentUserMessage={
                      message.author?.id === $settings?.user.userId
                    }
                    name={`${message?.author?.firstName ?? ""} ${
                      message?.author?.lastName ?? ""
                    }${
                      message.author?.organizations.length
                        ? `, ${message.author?.organizations[0].name}`
                        : ""
                    }`}
                    message={message.content ?? ""}
                    date={message.created}
                    file={message.file}
                    poll={message.poll}
                  />
                </RootRef>
              ) : (
                <MessengerMessage
                  key={message.id}
                  isCurrentUserMessage={
                    message.author?.id === $settings?.user.userId
                  }
                  name={`${message?.author?.firstName ?? ""} ${
                    message?.author?.lastName ?? ""
                  }${
                    message.author?.organizations.length
                      ? `, ${message.author?.organizations[0].name}`
                      : ""
                  }`}
                  message={message.content ?? ""}
                  date={message.created}
                  file={message.file}
                  poll={message.poll}
                />
              )}
            </Box>
          );
        });
    },
    [$settings?.user.userId, pinnedMessage]
  );

  const scrollToPinned = useCallback(() => {
    if (pinnedRef?.current && viewRef?.current) {
      const newHeight = pinnedRef.current.scrollHeight;
      viewRef.current.scrollTop = newHeight;
    }
  }, [pinnedRef]);

  const onScrollHandle = useCallback(() => {
    if (viewRef && $currentChat) {
      if (
        viewRef.current &&
        viewRef.current.scrollTop < 100 &&
        !isFetching &&
        !isEmpty.current
      ) {
        setPageIndex((pageIndex) => pageIndex + 1);
      }
    }
  }, [$currentChat, isFetching]);

  return (
    <Box width="100%" height="100%" key={$currentChat}>
      <Box className={classes.header}>
        <Box>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <ChatName>
              {(name) => (
                <Grid item style={{ width: "calc(100% - 26px)" }}>
                  <MessengerTooltip title={name ?? ""}>
                    <Box className={classes.heading}>{name}</Box>
                  </MessengerTooltip>
                </Grid>
              )}
            </ChatName>
            <Grid item>
              <IconButton
                size="small"
                onClick={() => setMode(!widthSettings.isFull)}
              >
                <ExpandIcon open={widthSettings.isFull} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className={classes.chatContainer}>
        {pinnedMessage && (
          <Box className={classes.pinnedContainer} onClick={scrollToPinned}>
            <MessengerPinnedContainer message={pinnedMessage.message} />
          </Box>
        )}
        <RootRef rootRef={viewRef}>
          <Box
            id="MessageBox"
            className={classes.chatView}
            onScroll={onScrollHandle}
            style={{
              top: pinnedMessage ? 51 : 0,
              height: `calc(100% - ${
                currentChat?.chatStatus?.name === "active" ? "40px" : ""
              } ${pinnedMessage ? " - 52px" : ""})`,
              overflowX: "hidden",
            }}
          >
            {messageList(messages)}
            {isFetching && <MessengerLoader size={40} list />}
          </Box>
        </RootRef>
        {currentChat?.chatStatus?.name === "active" && (
          <Box className={classes.textAreaContainer}>
            <MessengerTextArea />
          </Box>
        )}
      </Box>
    </Box>
  );
};
