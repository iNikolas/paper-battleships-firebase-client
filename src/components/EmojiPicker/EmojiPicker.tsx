import React from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "@mui/material";
import { EmojiPickerProps } from "./EmojiPickerProps";

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  getFieldProps,
  setFieldValue,
}) => {
  const portrait = useMediaQuery("(orientation: portrait)");

  return (
    <Picker
      pickerStyle={{
        position: "absolute",
        bottom: "56px",
        zIndex: "5",
        right: portrait ? "" : "8px",
      }}
      onEmojiClick={(event, data) => {
        const fieldValue = getFieldProps("message").value;
        setFieldValue("message", fieldValue + data.emoji);
      }}
    />
  );
};
