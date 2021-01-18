import React, { useEffect, useRef } from "react";
import {
  Grid,
  Box,
  makeStyles,
  RootRef,
  Theme,
  IconButton,
} from "@material-ui/core";
import { useStore } from "effector-react";
import { $widthSettings, setMode } from "../stores/resize.effector";
import { MessengerMessage } from "./MessengerMessages/MessengerMessage";
import { MessengerMessageSeparator } from "./MessengerMessages/MessengerMessageSeparator";
import { MessengerTextArea } from "./MessengerTextArea";
import { voitingClientMock } from "../constants/mocks";
import { MessengerPinnedContainer } from "./MessengerPinnedContainer";

import { ReactComponent as ExpandIcon } from "../assets/expand_icon.svg";
import { MessengerLoader } from "./MessengerLoader";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

export const MessengerChatContainer: React.FC = () => {
  const classes = useStyles();
  const viewRef = useRef<Nullable<HTMLDivElement>>(null);
  const widthSettings = useStore($widthSettings);
  /* TODO: заглушки pinned & isLoading */
  const isLoading = true;
  const pinned = true;
  // const [pinned, setPinned] = useState(true);

  useEffect(() => {
    if (viewRef && viewRef.current) {
      const { scrollHeight, clientHeight } = viewRef.current;
      const maxScrollTop = scrollHeight - clientHeight;

      viewRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }, [viewRef]);

  return (
    <Box width="100%" height="100%">
      <Box className={classes.header}>
        <Box>
          <Grid
            container
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item style={{ width: "calc(100% - 26px)" }}>
              <Box title="СК002004560" className={classes.heading}>
                СК002004560
              </Box>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                onClick={() => setMode(!widthSettings.isFull)}
              >
                <ExpandIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
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
                  // eslint-disable-next-line max-len
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
            {isLoading && <MessengerLoader size={40} />}
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
