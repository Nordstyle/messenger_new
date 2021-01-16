import React, { PropsWithChildren } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 0,
    "& .MuiGrid-item": {
      fontSize: "12px",
    },
  },
  title: {
    marginBottom: "2px",
  },
}));

interface MessengerVotingTextLine {
  title: React.ReactNode;
}

export const MessengerVotingTextLine: React.FC<
  PropsWithChildren<MessengerVotingTextLine>
> = (props) => {
  const classes = useStyles();
  const { children, title } = props;

  return (
    <Grid
      container
      spacing={0}
      className={classes.root}
      justify="space-between"
    >
      <Grid item className={classes.title}>
        {title}
      </Grid>

      {children && <Grid item>{children}</Grid>}
    </Grid>
  );
};
