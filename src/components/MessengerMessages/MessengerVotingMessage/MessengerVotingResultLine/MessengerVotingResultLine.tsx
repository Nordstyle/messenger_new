import React from "react";
import { Box, Grid, useTheme } from "@material-ui/core";
import { Voter } from "../../../../types";
import MessengerVotingGroupInfo from "../MessengerVotingGroupInfo";
import { MessengerVotingResultTotal } from "./MessengerVotingResultTotal";

interface MessengerVotingResultLineProps {
  voted: Voter[]; // проголосовавшие за
  votedAgainst: Voter[]; // проголосовавшие против
  // eslint-disable-next-line no-unused-vars
  total: Voter[]; // полный список голосующих
  isUserVoted: boolean; // признак того, проголосовал ли уже пользователь
  isClosed: boolean;
  pollId: string;
  pollOptionId: string;
}

export const MessengerVotingResultLine: React.FC<MessengerVotingResultLineProps> = (
  props
) => {
  const {
    voted,
    votedAgainst,
    total,
    isUserVoted,
    isClosed,
    pollId,
    pollOptionId,
  } = props;
  const theme = useTheme();

  return (
    <Box pt={2} style={{ borderTop: `1px solid ${theme.palette.divider}` }}>
      <Grid
        container
        justify="space-between"
        direction="row"
        alignItems="baseline"
      >
        <Grid item>
          <MessengerVotingResultTotal
            pollId={pollId}
            pollOptionId={pollOptionId}
            voted={voted}
            votedAgainst={votedAgainst}
            isUserVoted={isUserVoted}
            isClosed={isClosed}
          />
        </Grid>
        <Grid item>
          <MessengerVotingGroupInfo total={total} />
        </Grid>
      </Grid>
    </Box>
  );
};
