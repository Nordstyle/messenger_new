import React from "react";
import { Box, Grid } from "@material-ui/core";
import { MessengerVotingTextLine } from "./MesengerVotingTextLine";
import PercentDifferentByPurchaseFormatter from "../../../formatters/PercentDifferentByPurchaseFormatter";
import DefermentDeviationFormatter from "../../../formatters/DefermentDeviationFormatter";
import { PollMeta } from "../../../types";

interface MessengerVotingCardProps {
  meta: PollMeta;
}

export const MessengerVotingCard: React.FC<MessengerVotingCardProps> = (
  props
) => {
  const { meta } = props;

  const formatNumberToCurrency = (value: number = 0) =>
    `${value ? value.toLocaleString() : value}`;

  return (
    <Box mb={1}>
      <Grid container direction="column">
        <Grid item>
          <MessengerVotingTextLine title="Поставщик:">
            {meta.contractorName}
          </MessengerVotingTextLine>
        </Grid>
        <Grid item>
          <MessengerVotingTextLine title="Ценовое предложение:">{`${
            meta.priceOffer ? formatNumberToCurrency(meta.priceOffer) : 0
          } ₽`}</MessengerVotingTextLine>
        </Grid>

        <Grid item>
          <MessengerVotingTextLine title="Отклонение от лучших ц.п.:">
            <PercentDifferentByPurchaseFormatter
              value={meta.percentDifferentByPurchase || 0}
            />
          </MessengerVotingTextLine>
        </Grid>

        <Grid item>
          <MessengerVotingTextLine title="Срок поставки:">{`${Number(
            meta.termLimit
          )} дн.`}</MessengerVotingTextLine>
        </Grid>

        <Grid item>
          <MessengerVotingTextLine title="Отсрочка платежа/отклонение:">
            <DefermentDeviationFormatter
              value={meta.defermentPayment || 0}
              deviation={meta.defermentDeviation || 0}
            />
          </MessengerVotingTextLine>
        </Grid>
      </Grid>
    </Box>
  );
};
