import React from "react";
import { Grid, Link, Box } from "@material-ui/core";
import { File } from "../../types";
import { DocIcon } from "../../helpers/SvgComponents/DocIcon";
import FilestorageService from "../../services/FilestorageService";

export const MessengerFileMessage: React.FC<File> = (props) => {
  const { fileName, url } = props;

  const handleDownload = (url: string) => {
    const urlFileStorage = url.includes("/files/")
      ? url.split("/files/")[1]
      : url;

    FilestorageService.downloadFile(urlFileStorage).then((response) => {
      if ("data" in response) {
        const objectLink = URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = objectLink;
        a.download = fileName || "download";
        const clickHandler = () => {
          setTimeout(() => {
            URL.revokeObjectURL(objectLink);
            a.removeEventListener("click", clickHandler);
          }, 150);
        };
        a.addEventListener("click", clickHandler, false);
        a.click();
      }
    });
  };

  return (
    <Link
      underline="none"
      style={{ cursor: "pointer" }}
      onClick={() => handleDownload(url ?? "")}
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
