import { Grid } from "@material-ui/core";
import React from "react";
import { VotingClient } from "../../../types";
import { MessengerVotingCard } from "./MessengerVotingCard";
import MessengerVotingResultLine from "./MessengerVotingResultLine/MessengerVotingResultLine";

interface MessengerVotingMessageProps {
  client: VotingClient;
}

export const MessengerVotingMessage: React.FC<MessengerVotingMessageProps> = (
  props
) => {
  const {
    client: { votingObjects, isClosed },
  } = props;
  /* TODO: id user */
  const idUser = 1;

  return (
    <Grid container spacing={1}>
      {votingObjects.map((object) => (
        <Grid key={object.variantId} item>
          <Grid container direction="column">
            <Grid item>
              <MessengerVotingCard data={object} />
            </Grid>
            <Grid item>
              <MessengerVotingResultLine
                voted={object.accounts.filter((account) =>
                  Boolean(account.isLike)
                )}
                votedAgainst={object.accounts.filter(
                  (account) => account.isLike !== null && !account.isLike
                )}
                total={object.accounts}
                onLike={() => {
                  if (!isClosed) {
                    // onVoteLike(votingId, item.variantId, idUser);
                  }
                }}
                onDislike={() => {
                  if (!isClosed) {
                    // onVoteDislike(votingId, item.variantId, comment, idUser);
                  }
                }}
                isUserVoted={
                  idUser
                    ? object.accounts
                        .filter((item) => item.isLike !== null)
                        .map((item) => item.accountId)
                        .includes(idUser)
                    : false
                }
                isClosed={isClosed}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
