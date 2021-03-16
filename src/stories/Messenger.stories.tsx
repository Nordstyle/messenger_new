import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react";
import Messenger from "../components/Messenger";
import MessengerButton from "../components/MessengerButton";

storiesOf("Messenger", module).add("Chat", () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Messenger
        settings={{
          url: "",
          // documentId: "67274a79-6319-4155-a188-e5442c854238",
          documentId: "ec08aa7a-f8ba-4630-b698-855a78bc9db8",
          // defaultChatId: "8b6ccb60-8578-40d6-bbaa-02894f56fb93",
        }}
        user={{
          userId: 12146,
          email: "spampost470@gmail.com",
          authToken:
            // eslint-disable-next-line max-len
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMyMzUzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImxvZ29wZXJAbWFpbC5ydSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbS5jdXN0b21lci5tb2R1bGUucGxhdGZvcm07TE9HSVNUO2FkbWluLm1vZHVsZS5sb2dpc3RpYyIsIm5iZiI6MTYxNTgxNDI0OSwiZXhwIjoxNjE1ODgyNjQ5LCJpc3MiOiJTUC5NYXJrZXRwbGFjZS5BdXRoU2VydmVyLlYxIiwiYXVkIjoiaHR0cHM6Ly9nYXpwcm9tLm1hcmtldC8iLCJ1c2VyX2lkIjozMjM1MywiaWF0Ijo0Nzg0OTk3MzY2MDIsImxvZ2luIjoibG9nb3BlckBtYWlsLnJ1IiwiZmlyc3RfbmFtZSI6ItCQ0LTQvNC40L3QmCIsIm1pZGRsZV9uYW1lIjoi0J7RgtGHIiwibGFzdF9uYW1lIjoi0JDQtNC80LjQvdCkIiwicm9sZXMiOlsiYWRtLmN1c3RvbWVyLm1vZHVsZS5wbGF0Zm9ybSIsIkxPR0lTVCIsImFkbWluLm1vZHVsZS5sb2dpc3RpYyJdLCJsZWdhbF9pZCI6NDM5MDgzLCJleHBpcmVzIjoiMjAyMS0wMy0xNlQwODoxNzoyOS45NzM2NjAyWiIsInR5cGVfZmFjdG9yX2F1dGhlbnRpY2F0aW9uIjoyfQ.A9S299hLcHQcYDfTLLwILd3Wdfhp3qPnuLDz6GdWXro",
        }}
        modalProps={{
          open,
          onClose: () => setOpen(false),
        }}
      />
      <MessengerButton onClick={() => setOpen(true)} />
    </>
  );
});
