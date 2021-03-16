import React, { PropsWithChildren } from "react";
import { Box, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        width: "100%",
        marginTop: 0,
        "& .MuiGrid-item": {
          fontSize: "12px",
        },
      },
    }),
  { name: "MessengerVotingTextLine" }
);

interface MessengerVotingTextLine {
  title: React.ReactNode;
}

export const MessengerVotingTextLine: React.FC<
  PropsWithChildren<MessengerVotingTextLine>
> = (props) => {
  const classes = useStyles();
  const { children, title } = props;

  return (
    <Box mb={1} width="100%">
      <Grid
        container
        spacing={0}
        className={classes.root}
        justify="space-between"
      >
        <Grid item>
          <Box fontSize="12px">{title}</Box>
        </Grid>

        {children && (
          <Grid item>
            <Box fontSize="12px">{children}</Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
