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
      messengerApi="https://api-lht.stecpoint.ru/messenger-hub-service"
      server="https://api-lht.stecpoint.ru/filestorage-service/api/"
      // eslint-disable-next-line no-console
      onClose={() => console.log("on close")}
      moduleName={ModuleName.Stock}
      // eslint-disable-next-line max-len
      authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RlYy5zdXBlcnVzZXJAbWFpbC5ydSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InN1cGVydXNlci5tb2R1bGUucGxhdGZvcm07YWRtaW4ubW9kdWxlLmxvZ2lzdGljIiwibmJmIjoxNjEwNjMxNjQyLCJleHAiOjE2MTA4MDQ0NDIsImlzcyI6IlNQLk1hcmtldHBsYWNlLkF1dGhTZXJ2ZXIuVjEiLCJhdWQiOiJodHRwczovL2dhenByb20ubWFya2V0LyIsInVzZXJfaWQiOjEsImlhdCI6NDkyNDI5MTcyNzI2LCJsb2dpbiI6InN0ZWMuc3VwZXJ1c2VyQG1haWwucnUiLCJmaXJzdF9uYW1lIjoi0KHRg9C_0LXRgCIsIm1pZGRsZV9uYW1lIjoiIiwibGFzdF9uYW1lIjoi0J_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIiwicm9sZXMiOlsic3VwZXJ1c2VyLm1vZHVsZS5wbGF0Zm9ybSIsImFkbWluLm1vZHVsZS5sb2dpc3RpYyJdLCJsZWdhbF9pZCI6MCwiZXhwaXJlcyI6IjIwMjEtMDEtMTZUMTM6NDA6NDIuOTE3MjcyNloiLCJ0eXBlX2ZhY3Rvcl9hdXRoZW50aWNhdGlvbiI6Mn0.7a1EnuzXSANPPiTkzOTGo-MueqvpP9wJUWH3wZa-iIw"
    />
  );
};
