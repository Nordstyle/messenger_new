import React from "react";
import { Box, Grid, useTheme } from "@material-ui/core";
import { VotedAccount } from "../../../../types";
import MessengerVotingGroupInfo from "../MessengerVotingGroupInfo";
import { MessengerVotingResultTotal } from "./MessengerVotingResultTotal";

interface MessengerVotingResultLineProps {
  voted: VotedAccount[]; // проголосовавшие за
  votedAgainst: VotedAccount[]; // проголосовавшие против
  onLike: () => void; // клик на иконку "Лайк"
  // eslint-disable-next-line no-unused-vars
  onDislike: (comment: string) => void; // клик на иконку "Дизлайк"
  total: VotedAccount[]; // полный список голосующих
  isUserVoted: boolean; // признак того, проголосовал ли уже пользователь
  isClosed: boolean;
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
    onLike,
    onDislike,
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
            voted={voted}
            votedAgainst={votedAgainst}
            onLike={onLike}
            onDislike={onDislike}
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
