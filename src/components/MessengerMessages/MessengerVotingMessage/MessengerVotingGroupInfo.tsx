import React, { useState, useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import { MessengerVotingTooltipAccountList } from "./MessengerVotingTooltipAccountList";
import { Voter } from "../../../types";
import { MessengerTooltip } from "../../MessengerTooltip";

interface MessengerVotingGroupInfoProps {
  total: Voter[]; // список аккаунтов голосующих
}

const MessengerVotingGroupInfo: React.FC<MessengerVotingGroupInfoProps> = (
  props
) => {
  const { total } = props;

  const [voted, setVoted] = useState<Voter[]>([]);
  const [notVoted, setNotVoted] = useState<Voter[]>([]);

  useEffect(() => {
    setVoted(total.filter((item) => item.isLike !== null));
    setNotVoted(total.filter((item) => item.isLike === null));
  }, [total]);

  return (
    <Grid container direction="row" style={{ cursor: "pointer" }}>
      <Grid item>
        <MessengerTooltip
          title={
            total.length ? (
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
            ) : (
              "Нет проголосоваваших"
            )
          }
        >
          <Box fontWeight={500} fontSize="10px" color="text.secondary">
            Проголосовало {voted.length} из {total.length}
          </Box>
        </MessengerTooltip>
      </Grid>
    </Grid>
  );
};

export default MessengerVotingGroupInfo;
