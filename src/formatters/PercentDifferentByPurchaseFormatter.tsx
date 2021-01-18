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
        <Box fontSize="12px">{`${formatNumberToCurrency(
          Math.abs(value)
        )} %`}</Box>
      </Grid>
      {value > 0 && (
        <Grid item>
          <Icon
            style={{
              display: "flex",
              justifyContent: "flex-end",
              transform: !aboveZero ? "rotate(180deg)" : "none",
              color,
              alignItems: !aboveZero ? "center" : "unset",
            }}
          >
            {value > 0 && (
              <ArrowUpwardIcon
                style={{
                  fontSize: "14px",
                  transform: aboveZero ? "translateY(3px)" : "",
                }}
              />
            )}
          </Icon>
        </Grid>
      )}
    </Grid>
  );
};

export default PercentDifferentByPurchaseFormatter;
