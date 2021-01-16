import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { VotedAccount } from "../../../types";

const useStyles = makeStyles(() => ({
  root: {
    fontSize: "12px",
    lineHeight: "14px",
    fontWeight: "normal",
    "letter-spacing": "0.2px",
  },
}));

interface MessengerVotingTooltipAccountListProps {
  voted: VotedAccount[];
  title?: string;
}

export const MessengerVotingTooltipAccountList = (
  props: MessengerVotingTooltipAccountListProps
) => {
  const { voted, title } = props;
  const classes = useStyles();

  return (
    <Grid container direction="column">
      {title && (
        <Grid item className={classes.root}>
          {title}
        </Grid>
      )}
      {voted
        .map(
          (item) =>
            `${item.lastName ?? ""} ${item.firstName ?? ""} ${
              item.middleName ?? ""
            }`
        )
        .map((account) => (
          <Grid item key={account} className={classes.root}>
            {account}
          </Grid>
        ))}
    </Grid>
  );
};
