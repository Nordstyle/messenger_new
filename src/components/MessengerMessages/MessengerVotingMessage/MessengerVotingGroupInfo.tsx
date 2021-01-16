import React, { useState, useEffect } from "react";
import { Grid, Box, Tooltip, withStyles, makeStyles } from "@material-ui/core";
import { MessengerVotingTooltipAccountList } from "./MessengerVotingTooltipAccountList";
import { VotedAccount } from "../../../types";

import { ReactComponent as GroupIcon } from "../../../assets/user_group.svg";

export const StyledTooltip = withStyles({
  tooltip: {
    padding: "6px 12px",
  },
})(Tooltip);

const useStyles = makeStyles(() => ({
  img: {
    width: "25px",
    paddingTop: "5px",
  },
}));

interface MessengerVotingGroupInfoProps {
  total: VotedAccount[]; // список аккаунтов голосующих
}

const MessengerVotingGroupInfo: React.FC<MessengerVotingGroupInfoProps> = (
  props
) => {
  const { total } = props;
  const classes = useStyles();

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
                  <MessengerVotingTooltipAccountList
                    title="Не голосовали"
                    voted={notVoted}
                  />
                </Grid>
              )}
              {voted.length > 0 && (
                <Grid item>
                  <Box mt={2}>
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
          <Box fontWeight="bold" lineHeight="36px">
            {total.length}
          </Box>
        </StyledTooltip>
      </Grid>
      <Grid item>
        <Box pl={1}>
          <GroupIcon className={classes.img} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MessengerVotingGroupInfo;
