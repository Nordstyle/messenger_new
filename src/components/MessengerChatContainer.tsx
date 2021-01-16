import React, { useEffect, useRef } from "react";
import { Box, makeStyles, RootRef, Theme } from "@material-ui/core";
import { MessengerMessage } from "./MessengerMessages/MessengerMessage";
import { MessengerMessageSeparator } from "./MessengerMessages/MessengerMessageSeparator";
import { MessengerTextArea } from "./MessengerTextArea";
import { voitingClientMock } from "../constants/mocks";
import { MessengerPinnedContainer } from "./MessengerPinnedContainer";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    width: "100%",
    height: "52px",
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  heading: {
    width: "90%",
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
}));

export const MessengerChatContainer: React.FC = () => {
  const classes = useStyles();
  const viewRef = useRef<Nullable<HTMLDivElement>>(null);
  const pinned = false;

  useEffect(() => {
    if (viewRef && viewRef.current) {
      const { scrollHeight, clientHeight } = viewRef.current;
      const maxScrollTop = scrollHeight - clientHeight;

      viewRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [viewRef]);

  return (
    <Box width="443px" height="100%">
      <Box className={classes.header}>
        <Box className={classes.heading}>СК002004560</Box>
      </Box>
      <Box className={classes.chatContainer}>
        {pinned && (
          <Box
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            <MessengerPinnedContainer message="Голосование идёт" />
          </Box>
        )}
        <RootRef rootRef={viewRef}>
          <Box
            className={classes.chatView}
            style={{
              top: pinned ? 51 : 0,
              height: `calc(100% - 39px${pinned ? " - 51px" : ""})`,
            }}
          >
            <MessengerMessageSeparator date="2021-01-14T11:20:21.989667Z" />
            <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Сергей Мороз"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessageSeparator date="2021-01-15T11:20:21.989667Z" />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Игорь Анохин"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T13:20:21.989667Z"
              file={{
                contentType: "image/png",
                extension: ".png",
                fileName: "org_logo (8).png",
                lenght: 0,
                url:
                  "https://api-mto-stage.lahta-spb.ru/filestorage-service/api/v1/files/bucket-chat-101947/z4uwixbiwqo_637463003458589096",
              }}
            />
            <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Системный помощник"
              pinned
              message="Добрый день!
              Когда ждать следующий этап?"
              votingClient={voitingClientMock}
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Сергей Мороз"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Сергей Мороз"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T11:20:21.989667Z"
            />
            {/* <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Сергей Мороз"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Сергей Мороз"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Сергей Мороз"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage
              name="Сергей Мороз"
              message="Добрый день"
              date="2021-01-14T11:20:21.989667Z"
            />
            <MessengerMessage
              isCurrentUserMessage={false}
              name="Сергей Мороз"
              message="Добрый день!
              Когда ждать следующий этап?"
              date="2021-01-14T11:20:21.989667Z"
            /> */}
          </Box>
        </RootRef>
        <Box
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            left: 0,
          }}
        >
          <MessengerTextArea />
        </Box>
      </Box>
    </Box>
  );
};
