import React from "react";
import { Grid, Box, useTheme } from "@material-ui/core";
import { useStore } from "effector-react";
import { PollOption, Voter } from "../../../types";
import { MessengerVotingCard } from "./MessengerVotingCard";
import { MessengerVotingResultLine } from "./MessengerVotingResultLine/MessengerVotingResultLine";
import { $Settings } from "../../../stores/settings.effector";

interface MessengerVotingOption {
  pollId: string;
  option: PollOption;
  voters: Voter[];
  isClosed: boolean;
}

export const MessengerVotingOption: React.FC<MessengerVotingOption> = (
  props
) => {
  const { pollId, option, voters, isClosed } = props;
  const theme = useTheme();
  const $settings = useStore($Settings);

  return (
    <Box py={1} width="100%">
      <Grid container spacing={1}>
        <Grid item style={{ width: "100%" }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Box
                    fontSize="14px"
                    fontWeight={700}
                    style={{ marginBottom: theme.spacing(1.5) }}
                  >
                    {option.name}
                  </Box>
                </Grid>
                <Grid item>
                  <MessengerVotingCard meta={option.pollMeta} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <MessengerVotingResultLine
                pollId={pollId}
                pollOptionId={option.id}
                voted={voters.filter((voter) => voter.isLike)}
                votedAgainst={voters.filter(
                  (voter) => voter.isLike !== null && !voter.isLike
                )}
                total={voters}
                isUserVoted={
                  $settings?.user.userId
                    ? voters
                        .filter((item) => item.isLike !== null)
                        .map((item) => item.id)
                        .includes($settings?.user.userId)
                    : false
                }
                isClosed={isClosed}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
