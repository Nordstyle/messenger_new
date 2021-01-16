import React from "react";
import {
  Grid,
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Box,
} from "@material-ui/core";
import { StyledTooltip } from "../MessengerVotingGroupInfo";
import { VotedAccount } from "../../../../types";
import { MessengerVotingCommentPopover } from "./MessengerVotingCommentPopover";
import { MessengerVotingTooltipAccountList } from "../MessengerVotingTooltipAccountList";

import { ReactComponent as LikeIcon } from "../../../../assets/thumb_up.svg";
import { ReactComponent as DislikeIcon } from "../../../../assets/thumb_down.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    iconButton: {
      padding: theme.spacing(1),
      "& img": {
        width: "20px",
      },
      cursor: "pointer",
    },
    dislike: {
      paddingLeft: theme.spacing(3),
    },
  })
);

interface MessengerVotingResultTotalProps {
  voted: VotedAccount[]; // проголосовавшие "за"
  votedAgainst: VotedAccount[]; // проголосовавшие "против"
  onLike: () => void; // клик на иконку голосования "За"
  // eslint-disable-next-line no-unused-vars
  onDislike: (comment: string) => void; // клик на иконку "Против"
  isUserVoted: boolean;
  isClosed: boolean;
}

export const MessengerVotingResultTotal: React.FC<MessengerVotingResultTotalProps> = (
  props
) => {
  const {
    voted,
    onLike,
    votedAgainst,
    onDislike,
    isUserVoted,
    isClosed,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const classes = useStyles();

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isUserVoted && votedAgainst.length === 0 && !isClosed) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLike = () => {
    if (!isUserVoted) {
      onLike();
    }
  };

  const onSubmit = (comment: string) => {
    if (!isUserVoted && comment) {
      onDislike(comment);
      setAnchorEl(null);
    }
  };

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item>
        <IconButton
          onClick={onClickLike}
          classes={{ root: classes.iconButton }}
        >
          <LikeIcon />
        </IconButton>
      </Grid>

      <Grid item>
        {voted.length > 0 ? (
          <StyledTooltip
            title={<MessengerVotingTooltipAccountList voted={voted} />}
          >
            <Box fontWeight="bold" lineHeight="36px">
              {voted.length}
            </Box>
          </StyledTooltip>
        ) : (
          <Box fontWeight="bold" lineHeight="36px">
            {voted.length}
          </Box>
        )}
      </Grid>

      <Grid item className={classes.dislike}>
        <IconButton
          onClick={handleOpenPopover}
          classes={{ root: classes.iconButton }}
        >
          <DislikeIcon />
        </IconButton>
      </Grid>

      <Grid item>
        {votedAgainst.length > 0 ? (
          <StyledTooltip
            title={<MessengerVotingTooltipAccountList voted={votedAgainst} />}
          >
            <Box fontWeight="bold" lineHeight="36px">
              {votedAgainst.length}
            </Box>
          </StyledTooltip>
        ) : (
          <Box fontWeight="bold" lineHeight="36px">
            <Box fontWeight="bold" lineHeight="36px">
              {votedAgainst.length}
            </Box>
          </Box>
        )}
      </Grid>

      <MessengerVotingCommentPopover
        anchorEl={anchorEl}
        onSubmit={onSubmit}
        onClose={handleClose}
      />
    </Grid>
  );
};
