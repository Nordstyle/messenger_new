import React from "react";
import Box from "@material-ui/core/Box";

import { ReactComponent as Loader } from "../assets/loader.svg";

interface MessengerLoaderProps {
  size: number;
  list?: boolean;
}

export const MessengerLoader: React.FC<MessengerLoaderProps> = (props) => {
  const { size, list } = props;

  return (
    <Box
      style={{
        position: list ? "absolute" : "static",
        left: list ? 0 : "50%",
        bottom: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: list ? "flex-start" : "center",
        zIndex: 1000000,
      }}
    >
      <Loader style={{ width: size }} />
    </Box>
  );
};
