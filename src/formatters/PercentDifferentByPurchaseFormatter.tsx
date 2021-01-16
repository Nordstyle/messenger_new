import React from "react";
import { Box, Grid, Icon, useTheme } from "@material-ui/core";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { ITheme } from "../theme";

const formatNumberToCurrency = (value: number = 0) =>
  `${value ? value.toLocaleString() : value}`;

interface PercentDifferentByPurchaseFormatter {
  value: number;
}

const PercentDifferentByPurchaseFormatter = (
  props: PercentDifferentByPurchaseFormatter
) => {
  const { value } = props;
  const theme: ITheme = useTheme();
  const aboveZero = value >= 0;
  const color = aboveZero
    ? theme.palette.themeColors.success
    : theme.palette.themeColors.fail;

  return (
    <Grid container alignItems="center" style={{ color, height: "16px" }}>
      <Grid item>
        <Box mr={0.5} fontSize="12px">
          {`${formatNumberToCurrency(Math.abs(value))} %`}
        </Box>
      </Grid>
      {value > 0 && (
        <Grid item>
          <Icon
            style={{
              width: "14px",
              display: "flex",
              transform: !aboveZero ? "rotate(180deg)" : "none",
              color,
              alignItems: !aboveZero ? "center" : "unset",
            }}
          >
            {value > 0 && <ArrowUpwardIcon fontSize="small" />}
          </Icon>
        </Grid>
      )}
    </Grid>
  );
};

export default PercentDifferentByPurchaseFormatter;
