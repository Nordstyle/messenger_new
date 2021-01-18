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
        left: "50%",
        transform: list ? "translateX(-50%)" : "",
        bottom: list ? 8 : 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 1000000,
      }}
    >
      <Loader style={{ width: size }} />
    </Box>
  );
};
