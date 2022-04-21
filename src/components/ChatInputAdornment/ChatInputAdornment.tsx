import React from "react";
import { styled } from "@mui/material/styles";
import { InputAdornment } from "@mui/material";
import { ChatInputAdornmentProps } from "./ChatInputAdornmentProps";

const StyledInputAdornment = styled(InputAdornment)({ cursor: "pointer" });

export const ChatInputAdornment: React.FC<ChatInputAdornmentProps> = ({
  children,
  onClick,
}) => {
  return (
    <StyledInputAdornment onClick={onClick} position="end">
      {children}
    </StyledInputAdornment>
  );
};
