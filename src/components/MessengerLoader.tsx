import Box from "@material-ui/core/Box";
import React from "react";

import { ReactComponent as Loader } from "../assets/loader.svg";

interface MessengerLoaderProps {
  size: number;
}

export const MessengerLoader: React.FC<MessengerLoaderProps> = (props) => {
  const { size } = props;
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      height="100%"
    >
      <Loader style={{ width: size }} />
    </Box>
  );
};
