import React from "react";
import {
  Grid,
  IconButton,
  makeStyles,
  createStyles,
  Box,
  Theme,
} from "@material-ui/core";
import { MessengerVotingCommentPopover } from "./MessengerVotingCommentPopover";
import { MessengerVotingTooltipAccountList } from "../MessengerVotingTooltipAccountList";
import { Voter } from "../../../../types";
import PollService from "../../../../services/PollService";
import { MessengerTooltip } from "../../../MessengerTooltip";

const useStyles = makeStyles(
  (theme: Theme) =>
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
          fill: theme.palette.primary.main,
        },
      },
      hoverWrapper: {
        "&:hover": {
          "& svg, path, div": {
            color: theme.themeColors.hoverFilled,
            fill: theme.themeColors.hoverFilled,
          },
        },
      },
    }),
  { name: "MessengerVotingResultTotal" }
);

interface MessengerVotingResultTotalProps {
  voted: Voter[]; // проголосовавшие "за"
  votedAgainst: Voter[]; // проголосовавшие "против"
  isUserVoted: boolean;
  isClosed: boolean;
  pollId: string;
  pollOptionId: string;
}

export const MessengerVotingResultTotal: React.FC<MessengerVotingResultTotalProps> = (
  props
) => {
  const {
    voted,
    pollId,
    votedAgainst,
    pollOptionId,
    isUserVoted,
    isClosed,
  } = props;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const sendVote = (like: boolean, comment?: string) => {
    PollService.poll({
      pollId,
      pollOptionId,
      like,
      comment: comment ?? null,
    });
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isUserVoted && !isClosed) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLike = () => {
    if (!isUserVoted) {
      sendVote(true);
    }
  };

  const onSubmit = (comment: string) => {
    if (!isUserVoted && comment) {
      sendVote(false, comment);
      setAnchorEl(null);
    }
  };

  return (
    <Grid container direction="row" spacing={4} className={classes.root}>
      <Grid item className={classes.hoverWrapper}>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton
              className={voted.length > 0 ? classes.activeButton : undefined}
              onClick={onClickLike}
              classes={{ root: classes.iconButton }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  // eslint-disable-next-line max-len
                  d="M1.66699 16.6667H3.33366C3.79199 16.6667 4.16699 16.2917 4.16699 15.8333V8.33332C4.16699 7.87499 3.79199 7.49999 3.33366 7.49999H1.66699V16.6667ZM18.192 10.7333C18.2837 10.525 18.3337 10.3 18.3337 10.0667V9.16666C18.3337 8.24999 17.5837 7.49999 16.667 7.49999H12.0837L12.8503 3.62499C12.892 3.44166 12.867 3.24166 12.7837 3.07499C12.592 2.69999 12.3503 2.35832 12.0503 2.05832L11.667 1.66666L6.32533 7.00832C6.00866 7.32499 5.83366 7.74999 5.83366 8.19166V14.725C5.83366 15.7917 6.70866 16.6667 7.78366 16.6667H14.542C15.1253 16.6667 15.6753 16.3583 15.9753 15.8583L18.192 10.7333Z"
                  fill="#A7A8B6"
                />
              </svg>
            </IconButton>
          </Grid>
          <Grid item>
            {voted.length > 0 ? (
              <MessengerTooltip
                title={<MessengerVotingTooltipAccountList voted={voted} />}
              >
                <Box fontWeight="bold" fontSize="14px" color="text.hint">
                  {voted.length}
                </Box>
              </MessengerTooltip>
            ) : (
              <Box fontWeight="bold" fontSize="14px" color="text.secondary">
                {voted.length}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.hoverWrapper}>
        <Grid container alignItems="center">
          <Grid item>
            <IconButton
              className={
                votedAgainst.length > 0 ? classes.activeButton : undefined
              }
              onClick={handleOpenPopover}
              classes={{ root: classes.iconButton }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  // eslint-disable-next-line max-len
                  d="M18.3337 5H16.667C16.2087 5 15.8337 5.375 15.8337 5.83333V13.3333C15.8337 13.7917 16.2087 14.1667 16.667 14.1667H18.3337V5ZM1.80866 10.9333C1.71699 11.1417 1.66699 11.3667 1.66699 11.6V12.5C1.66699 13.4167 2.41699 14.1667 3.33366 14.1667H7.91699L7.15033 18.0417C7.10866 18.225 7.13366 18.425 7.21699 18.5917C7.40866 18.9667 7.65033 19.3083 7.95033 19.6083L8.33366 20L13.6753 14.6583C13.992 14.3417 14.167 13.9167 14.167 13.475V6.95C14.167 5.875 13.292 5 12.217 5H5.46699C4.87533 5 4.33366 5.30833 4.03366 5.80833L1.80866 10.9333Z"
                  fill="#A7A8B6"
                />
              </svg>
            </IconButton>
          </Grid>
          <Grid item>
            {votedAgainst.length > 0 ? (
              <MessengerTooltip
                title={
                  <MessengerVotingTooltipAccountList voted={votedAgainst} />
                }
              >
                <Box fontWeight="bold" fontSize="14px" color="text.hint">
                  {votedAgainst.length}
                </Box>
              </MessengerTooltip>
            ) : (
              <Box fontWeight="bold" fontSize="14px" color="text.secondary">
                {votedAgainst.length}
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>

      <MessengerVotingCommentPopover
        anchorEl={anchorEl}
        onSubmit={onSubmit}
        onClose={handleClose}
      />
    </Grid>
  );
};
