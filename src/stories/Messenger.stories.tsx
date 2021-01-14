import React from "react";
import Messenger from "../components/Messenger";
import { ModuleName } from "../constants";

export default {
  title: "Messenger",
};

export const Default: React.FC = () => {
  return (
    <Messenger
      idUser={22221}
      documentId="0fe9a134-ad23-42e3-a181-bbebab6ad6fd"
      email="spampost475@gmail.com"
      open={Boolean(1)}
      messengerApi="https://api-mto-stage.lahta-spb.ru/messenger-service/messenger"
      server="https://api-lht.stecpoint.ru/filestorage-service/api/"
      // eslint-disable-next-line no-console
      onClose={() => console.log("on close")}
      moduleName={ModuleName.Stock}
      // eslint-disable-next-line max-len
      authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIyMjIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InNwYW1wb3N0NDc1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImN1c3RvbWVyLm1vZHVsZS5iaWRDZW50ZXI7bWFuYWdlci5tb2R1bGUubWFya2V0IiwibmJmIjoxNjA2OTg3MTE1LCJleHAiOjE2MDcwNTU1MTUsImlzcyI6IlNQLk1hcmtldHBsYWNlLkF1dGhTZXJ2ZXIuVjEiLCJhdWQiOiJodHRwczovL2dhenByb20ubWFya2V0LyIsInVzZXJfaWQiOjIyMjIxLCJpYXQiOjMzNTE1MDExMjEyNiwibG9naW4iOiJzcGFtcG9zdDQ3NUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoi0JzQtdC90LXQtNC20LXRgCIsIm1pZGRsZV9uYW1lIjoi0JHRgNCy0LjRhyIsImxhc3RfbmFtZSI6ItCa0LDRgtC10LPQvtGA0LjQudC90YvQuSIsInJvbGVzIjpbImN1c3RvbWVyLm1vZHVsZS5iaWRDZW50ZXIiLCJtYW5hZ2VyLm1vZHVsZS5tYXJrZXQiXSwibGVnYWxfaWQiOjQyMX0.ayLZT1_A8TjnG64BIh-Bq_hBOLm6nSPzyFw7hFmsBMc"
    />
  );
};
