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

import { ReactComponent as LikeIcon } from "../../../../assets/like_icon.svg";
import { ReactComponent as DislikeIcon } from "../../../../assets/dislike_icon.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    iconButton: {
      marginRight: theme.spacing(0.5),
      padding: 0,
      "& img": {
        width: "20px",
      },
      cursor: "pointer",
    },
    activeButton: {
      "& svg, path": {
        fill: theme.palette.text.hint,
      },
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
          className={voted.length > 0 ? classes.activeButton : undefined}
          onClick={onClickLike}
          classes={{ root: classes.iconButton }}
        >
          <LikeIcon />
        </IconButton>
      </Grid>

      <Grid item>
        <Box mr={3}>
          {voted.length > 0 ? (
            <StyledTooltip
              title={<MessengerVotingTooltipAccountList voted={voted} />}
            >
              <Box fontWeight="bold" fontSize="14px" color="text.hint">
                {voted.length}
              </Box>
            </StyledTooltip>
          ) : (
            <Box fontWeight="bold" fontSize="14px" color="text.secondary">
              {voted.length}
            </Box>
          )}
        </Box>
      </Grid>

      <Grid item>
        <IconButton
          className={votedAgainst.length > 0 ? classes.activeButton : undefined}
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
            <Box fontWeight="bold" fontSize="14px" color="text.hint">
              {votedAgainst.length}
            </Box>
          </StyledTooltip>
        ) : (
          <Box fontWeight="bold" fontSize="14px" color="text.secondary">
            {votedAgainst.length}
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
