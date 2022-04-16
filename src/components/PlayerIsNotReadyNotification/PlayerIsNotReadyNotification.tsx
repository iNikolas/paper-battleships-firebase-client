import React from "react";
import { Typography } from "@mui/material";
import { useGameData } from "../../utils";

export const PlayerIsNotReadyNotification = () => {
  const {
    data: { rivalName },
  } = useGameData();

  return (
    <Typography
      sx={{
        backgroundColor: (theme) => theme.palette.error.light,
        color: (theme) => theme.palette.common.white,
        borderRadius: 1,
        position: "fixed",
        bottom: (theme) => theme.spacing(8),
        right: (theme) => theme.spacing(1),
        zIndex: (theme) => theme.zIndex.modal,
        fontWeight: 500,
        p: 1,
      }}
    >{`${rivalName} is not ready`}</Typography>
  );
};
