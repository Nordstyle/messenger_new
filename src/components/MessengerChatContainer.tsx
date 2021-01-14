import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: theme.spacing(1.5, 2),
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "bolder",
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: "52px",
  },
}));

export const MessengerChatContainer = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.header}>СК002004560</Box>
      <Box>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, neque
        labore sapiente quos nesciunt soluta numquam minima ad sit fugiat dolor
        in ducimus porro minus eius perspiciatis? Eum, magni odit. Praesentium
        voluptatibus nam, cum dolorum quo labore corrupti dolorem atque sunt
        accusamus non voluptatum animi dolor? Perspiciatis porro perferendis,
        sit, sapiente reprehenderit deleniti corporis tempore dolores voluptatum
        quia, ex ab? Consequuntur inventore aspernatur fugit doloribus ducimus
        dolore exercitationem, dolorem numquam animi odit quaerat illo
        consequatur at illum vero soluta impedit esse tenetur, porro molestias
        cupiditate! Veniam consectetur blanditiis ducimus dolorem? Culpa nostrum
        officiis perspiciatis nulla temporibus, debitis sapiente neque.
        Temporibus amet deserunt nemo in maxime. Voluptates, necessitatibus
        maxime deleniti impedit natus voluptatum, eos cumque, commodi doloribus
        quod ab asperiores qui. Deserunt esse ullam consequatur debitis
        quibusdam sed quam, molestiae reiciendis cum! Neque, obcaecati! A magnam
        aliquid asperiores aut sunt qui officia, accusantium quia dolores,
        blanditiis neque incidunt libero accusamus hic. Quia ea, unde fuga
        recusandae, qui cum, voluptatum corrupti ipsum ex deleniti saepe impedit
        minus inventore cumque. Similique ipsam ab quae inventore perferendis a,
        odit magni tempore dolorum facere voluptatum? Debitis suscipit delectus
        libero deleniti culpa, exercitationem sapiente labore. Rerum sequi
        consectetur exercitationem sint necessitatibus, a magni? Magni
        reprehenderit nemo soluta eum maxime temporibus voluptas aperiam quidem
        ratione. Velit, natus! Atque ducimus blanditiis obcaecati amet quo in
        dolorum doloribus nisi enim maxime id alias, reiciendis neque magni quis
        molestias aspernatur voluptas sequi itaque excepturi voluptates minus
        numquam repellat? Quidem, laboriosam. Dolor temporibus doloribus
        mollitia in labore sapiente magnam reprehenderit distinctio nesciunt
        similique voluptate sed rerum, numquam vero et molestias eos minus,
        assumenda reiciendis. Voluptatibus consectetur exercitationem soluta
        eos, dignissimos animi? Nesciunt culpa unde mollitia rerum, alias ipsum
        facilis, quo dolorem itaque inventore iure saepe est nihil incidunt?
        Soluta accusamus quos officiis explicabo velit recusandae. Dolorum
        labore eum quidem expedita minus.
      </Box>
    </Box>
  );
};
