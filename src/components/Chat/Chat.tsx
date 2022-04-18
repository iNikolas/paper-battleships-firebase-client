import React from "react";
import { Paper } from "@mui/material";
import { MessageWindow, SendMessageArea } from "./";

export const Chat = () => {
  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        height: "100%",
        p: 1,
        display: "flex",
        flexDirection: "column",
        "@media screen and (orientation: landscape)": {
          width: "60%",
          minHeight: (theme) => theme.spacing(20),
        },
      }}
    >
      <MessageWindow />
      <SendMessageArea />
    </Paper>
  );
};
