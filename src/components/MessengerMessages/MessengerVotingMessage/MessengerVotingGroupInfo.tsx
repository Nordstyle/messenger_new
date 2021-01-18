import React, { useState, useEffect } from "react";
import { Grid, Box, Tooltip, withStyles } from "@material-ui/core";
import { MessengerVotingTooltipAccountList } from "./MessengerVotingTooltipAccountList";
import { VotedAccount } from "../../../types";

export const StyledTooltip = withStyles({
  tooltip: {
    padding: "6px 12px",
  },
})(Tooltip);

interface MessengerVotingGroupInfoProps {
  total: VotedAccount[]; // список аккаунтов голосующих
}

const MessengerVotingGroupInfo: React.FC<MessengerVotingGroupInfoProps> = (
  props
) => {
  const { total } = props;

  const [voted, setVoted] = useState<VotedAccount[]>([]);
  const [notVoted, setNotVoted] = useState<VotedAccount[]>([]);

  useEffect(() => {
    setVoted(total.filter((item) => item.isLike !== null));
    setNotVoted(total.filter((item) => item.isLike === null));
  }, [total]);

  return (
    <Grid container direction="row" style={{ cursor: "pointer" }}>
      <Grid item>
        <StyledTooltip
          title={
            <Grid container direction="column">
              {notVoted.length > 0 && (
                <Grid item>
                  <Box mb={2}>
                    <MessengerVotingTooltipAccountList
                      title="Не голосовали"
                      voted={notVoted}
                    />
                  </Box>
                </Grid>
              )}
              {voted.length > 0 && (
                <Grid item>
                  <Box>
                    <MessengerVotingTooltipAccountList
                      title="Голосовали"
                      voted={voted}
                    />
                  </Box>
                </Grid>
              )}
            </Grid>
          }
        >
          <Box fontWeight={500} fontSize="10px" color="text.secondary">
            Проголосовало {voted.length} из {total.length}
          </Box>
        </StyledTooltip>
      </Grid>
    </Grid>
  );
};

export default MessengerVotingGroupInfo;
