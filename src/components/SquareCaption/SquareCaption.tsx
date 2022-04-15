import React from "react";
import { Typography } from "@mui/material";
import { SquareCaptionProps } from "./SquareCaptionProps";

export const SquareCaption: React.FC<SquareCaptionProps> = ({
  children,
  top,
}) => {
  return (
    <Typography
      variant="caption"
      sx={{
        position: "absolute",
        top: (theme) => (top ? theme.spacing(-3) : "50%"),
        left: (theme) => (top ? "50%" : theme.spacing(-2)),
        color: (theme) => theme.palette.info.light,
        fontWeight: "bold",
        transform: top ? "translate(-50%, 0)" : "translate(0, -50%)",
      }}
    >
      {children}
    </Typography>
  );
};
