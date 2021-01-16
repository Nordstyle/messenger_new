import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  createStyles,
  useTheme,
} from "@material-ui/core";
import { ITheme } from "../theme";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiGrid-item": {
        paddingLeft: "4px",
      },
    },
  })
);

interface DefermentDeviationFormatter {
  value: number;
  deviation: number;
}

const DefermentDeviationFormatter = (props: DefermentDeviationFormatter) => {
  const { value, deviation } = props;
  const theme: ITheme = useTheme();
  const aboveZero = value >= 0;
  const color = aboveZero
    ? theme.palette.themeColors.success
    : theme.palette.themeColors.fail;

  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item>{`${value} дн.`}</Grid>
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
