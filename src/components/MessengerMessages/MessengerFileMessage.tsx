import React, { useCallback } from "react";
import { Grid, Link, Box } from "@material-ui/core";
import { File } from "../../types";

import { ReactComponent as DocIcon } from "../../assets/doc.svg";

export const MessengerFileMessage: React.FC<File> = (props) => {
  const { fileName, url } = props;

  const downloadFile = useCallback((url: string, fileName: string) => {
    /* TODO: download file */
    return { url, fileName };
    // onGetFile(url).then((response) => {
    //   if ("data" in response) {
    //     const objectLink = URL.createObjectURL(response.data);
    //     const a = document.createElement("a");
    //     a.href = objectLink;
    //     a.download = fileName || "download";
    //     const clickHandler = () => {
    //       setTimeout(() => {
    //         URL.revokeObjectURL(objectLink);
    //         a.removeEventListener("click", clickHandler);
    //       }, 150);
    //     };
    //     a.addEventListener("click", clickHandler, false);
    //     a.click();
    //   }
    // });
  }, []);

  return (
    <Link
      underline="none"
      style={{ cursor: "pointer" }}
      onClick={() => downloadFile(url, fileName)}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <DocIcon />
        </Grid>
        <Grid item>
          <Box fontSize="12px" color="text.hint">
            {fileName}
          </Box>
        </Grid>
      </Grid>
    </Link>
  );
};
