import React from "react";
import { Typography } from "@mui/material";
import { useGameData } from "../../utils";

export const PlayerIsNotReadyNotification = () => {
  const {
    data: { rivalName },
  } = useGameData();

  return (
    <Typography
      align="center"
      sx={{
        backgroundColor: (theme) => theme.palette.error.light,
        color: (theme) => theme.palette.common.white,
        borderRadius: 1,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: (theme) => theme.zIndex.modal,
        fontWeight: 500,
        p: 1,
        width: (theme) => theme.spacing(25),
      }}
    >{`${rivalName} is not ready`}</Typography>
  );
};
