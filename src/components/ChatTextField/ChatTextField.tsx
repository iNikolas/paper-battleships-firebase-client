import React from "react";
import { TextField } from "@mui/material";
import { ChatInputAdornment } from "../ChatInputAdornment";
import { ChatTextFieldProps } from "./ChatTextFieldProps";

export const ChatTextField: React.FC<ChatTextFieldProps> = ({
  getFieldProps,
  toggleEmojiView,
}) => {
  return (
    <TextField
      {...getFieldProps("message")}
      inputProps={{
        maxLength: 250,
      }}
      InputProps={{
        endAdornment: (
          <ChatInputAdornment onClick={toggleEmojiView}>😃</ChatInputAdornment>
        ),
      }}
      sx={{ width: "100%" }}
      size="small"
      name="message"
      label="Message"
      variant="filled"
    />
  );
};
