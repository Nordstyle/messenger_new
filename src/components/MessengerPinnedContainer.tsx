import React from "react";
import { Box, Grid, makeStyles, Theme, createStyles } from "@material-ui/core";
import { MessengerTooltip } from "./MessengerTooltip";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        padding: theme.spacing(1, 2),
        background: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      ellepsis: {
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    }),
  { name: "MessengerPinnedContainer" }
);

interface MessengerPinnedContainerProps {
  message: Nullable<string>;
}

export const MessengerPinnedContainer: React.FC<MessengerPinnedContainerProps> = (
  props
) => {
  const { message } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container justify="space-between" alignItems="center" wrap="nowrap">
        <Grid item style={{ width: "calc(100% - 28px)" }}>
          <Box fontSize="12px" color="text.hint" marginBottom="2px">
            Закреплённое сообщение
          </Box>
          <MessengerTooltip title={message ?? ""}>
            <Box
              className={classes.ellepsis}
              fontSize="12px"
              color="text.secondary"
            >
              {message}
            </Box>
          </MessengerTooltip>
        </Grid>
      </Grid>
    </Box>
  );
};
