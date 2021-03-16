import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  createStyles,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        "& .MuiGrid-item": {
          paddingLeft: "4px",
        },
      },
    }),
  { name: "DefermentDeviationFormatter" }
);

interface DefermentDeviationFormatter {
  value: number;
  deviation: number;
}

const DefermentDeviationFormatter = (props: DefermentDeviationFormatter) => {
  const { value, deviation } = props;
  const theme = useTheme();
  const aboveZero = value >= 0;
  const color = aboveZero ? theme.themeColors.success : theme.themeColors.fail;

  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item>
        <Box fontSize="12px">{`${value} дн.`}</Box>
      </Grid>
      <Grid item>/</Grid>
      <Grid item>
        <Box color={color} display="inline" fontSize="12px">
          {Math.abs(deviation)}
        </Box>
        {` дн.`}
      </Grid>
    </Grid>
  );
};

export default DefermentDeviationFormatter;
