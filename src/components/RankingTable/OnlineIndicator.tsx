import React from "react";
import { Box } from "@mui/material";
import { OnlineIndicatorProps } from "./types";
import { useStore } from "../../context";

export const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ uid }) => {
  const {
    state: {
      lobby: { online },
    },
  } = useStore();
  return (
    <Box
      sx={{
        display: "inline-block",
        width: (theme) => theme.spacing(1),
        height: (theme) => theme.spacing(1),
        borderRadius: "50%",
        backgroundColor: (theme) => {
          if (online.includes(uid)) return theme.palette.success.light;
          return theme.palette.error.light;
        },
      }}
    />
  );
};
