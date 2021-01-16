import React from "react";
import { Box, Grid } from "@material-ui/core";

import { VotingObject } from "../../../types";
import { MessengerVotingTextLine } from "./MesengerVotingTextLine";
import PercentDifferentByPurchaseFormatter from "../../../formatters/PercentDifferentByPurchaseFormatter";
import DefermentDeviationFormatter from "../../../formatters/DefermentDeviationFormatter";

interface MessengerVotingCardProps {
  data: VotingObject;
}

export const MessengerVotingCard: React.FC<MessengerVotingCardProps> = (
  props
) => {
  const {
    data: { name, contractors },
  } = props;

  const formatNumberToCurrency = (value: number = 0) =>
    `${value ? value.toLocaleString() : value}`;

  return (
    <Grid container direction="column">
      <Grid item>
        <Box fontSize="14px" fontWeight={700}>
          {name}
        </Box>
      </Grid>
      <Grid item>
        {contractors &&
          contractors.map((contractor, idx) => (
            <Grid
              container
              direction="column"
              style={{
                paddingBottom: idx === contractors.length - 1 ? "0px" : "20px",
              }}
              key={contractor.contractorId}
            >
              <Grid item>
                <MessengerVotingTextLine title="Поставщик:">
                  {contractor.contractorName}
                </MessengerVotingTextLine>
              </Grid>
              <Grid item>
                <MessengerVotingTextLine title="Ценовое предложение:">{`${
                  contractor.priceOffer
                    ? formatNumberToCurrency(contractor.priceOffer)
                    : 0
                } ₽`}</MessengerVotingTextLine>
              </Grid>

              <Grid item>
                <MessengerVotingTextLine title="Отклонение от лучших ц.п.:">
                  <PercentDifferentByPurchaseFormatter
                    value={contractor.percentDifferentByPurchase || 0}
                  />
                </MessengerVotingTextLine>
              </Grid>

              <Grid item>
                <MessengerVotingTextLine title="Срок поставки:">{`${Number(
                  contractor.termLimit
                )} дн.`}</MessengerVotingTextLine>
              </Grid>

              <Grid item>
                <MessengerVotingTextLine title="Отсрочка платежа/отклонение:">
                  <DefermentDeviationFormatter
                    value={contractor.defermentPayment || 0}
                    deviation={contractor.defermentDeviation || 0}
                  />
                </MessengerVotingTextLine>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};
