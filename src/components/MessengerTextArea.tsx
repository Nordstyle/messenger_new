import React, { useCallback, useMemo, useState } from "react";
import {
  makeStyles,
  Theme,
  TextField,
  IconButton,
  createStyles,
} from "@material-ui/core";
import { useStore } from "effector-react";
import {
  MessageText,
  onChangeMessage,
  sendMessage,
  submitMessage,
} from "../stores/message.effector";
import { $CurrentChat } from "../stores/currentChat.effector";
import FilestorageService from "../services/FilestorageService";
import MessageService from "../services/MessageService";

import { ClipIcon } from "../helpers/SvgComponents/ClipIcon";
import { SendIcon } from "../helpers/SvgComponents/SendIcon";
import { LoaderIcon } from "../helpers/SvgComponents/LoaderIcon";
import { $Chats } from "../stores/chats.effector";
import { chatFindById } from "../helpers/findById";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      inputRoot: {
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        padding: "12px 44px 10px",
      },
      inputMultiline: {
        padding: 0,
      },
      startAdornment: {
        position: "absolute",
        left: "-28px",
        cursor: "pointer",
      },
      endAdornment: {
        position: "absolute",
        right: "-28px",
        cursor: "pointer",
      },
    }),
  { name: "MessengerTextArea" }
);

export const MessengerTextArea: React.FC = () => {
  const classes = useStyles();
  const sendIsLoading = useStore(sendMessage.pending);
  const $currentChat = useStore($CurrentChat);
  const $chats = useStore($Chats);
  const [fileIsLoading, setFileIsLoading] = useState<boolean>(false);
  const chatStatus = useMemo(() => {
    if ($currentChat) {
      return chatFindById($chats, $currentChat)?.chatStatus;
    }

    return null;
  }, [$chats, $currentChat]);

  // @ts-ignore
  const onKeyPress = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  }, []);

  const onUploadFileHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFileIsLoading(true);
      const { files } = event.currentTarget;
      const data: FormData = new FormData();
      const currentFile = files && files[0];

      if (currentFile) data.append("file", currentFile);

      if ($currentChat) {
        FilestorageService.uploadFile(
          data,
          `bucket-chat-${$currentChat}`,
          false
        ).then((response) => {
          const { link } = response.data;

          MessageService.messageFiles({
            chatId: $currentChat,
            link,
          }).finally(() => setFileIsLoading(false));
        });
      }
    },
    [$currentChat]
  );

  if (!$currentChat) return null;

  return (
    <MessageText>
      {(message) => (
        <>
          <TextField
            disabled={Boolean(chatStatus?.name !== "active")}
            className={classes.inputRoot}
            InputProps={{
              disableUnderline: true,
              classes: {
                multiline: classes.inputMultiline,
              },
              startAdornment: fileIsLoading ? (
                <IconButton size="small" className={classes.startAdornment}>
                  <LoaderIcon size={15} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.startAdornment}
                  disabled={Boolean(chatStatus?.name !== "active")}
                  component="label"
                  size="small"
                >
                  <ClipIcon />
                  <form>
                    <input
                      id="file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={onUploadFileHandler}
                    />
                  </form>
                </IconButton>
              ),
              endAdornment: sendIsLoading ? (
                <IconButton size="small" className={classes.endAdornment}>
                  <LoaderIcon size={15} />
                </IconButton>
              ) : (
                message.length > 0 && (
                  <IconButton
                    size="small"
                    className={classes.endAdornment}
                    onClick={() => submitMessage()}
                  >
                    <SendIcon />
                  </IconButton>
                )
              ),
            }}
            fullWidth
            onKeyDown={onKeyPress}
            rowsMax={8}
            multiline
            value={message}
            onChange={(e) => onChangeMessage(e.currentTarget.value)}
          />
        </>
      )}
    </MessageText>
  );
};
