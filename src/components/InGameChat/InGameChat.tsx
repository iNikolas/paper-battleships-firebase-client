import React, { useState } from "react";
import { SendMessageForm } from "./SendMessageForm";
import { Box } from "@mui/material";

export const InGameChat = () => {
  const [opacity, setOpacity] = useState(0.3);
  const [isFocused, setIsFocused] = useState(false);

  const handleShow = () => setOpacity(1);
  const handleHide = () => setOpacity(0.3);
  const handleMouseLeave = () => {
    if (!isFocused) handleHide();
  };
  const handleFocus = () => {
    setIsFocused(true);
    handleShow();
  };
  const handleBlur = () => {
    setIsFocused(false);
    handleHide();
  };

  return (
    <Box
      onMouseOver={handleShow}
      onFocus={handleFocus}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      sx={{
        opacity,
        "@media screen and (orientation: landscape)": {
          maxWidth: (theme) => theme.spacing(40),
        },
      }}
    >
      <SendMessageForm />
    </Box>
  );
};
