import React from "react";
import { useStore } from "../../context";
import { CounterProps } from "./types";
import { Typography } from "@mui/material";

export const Counter: React.FC<CounterProps> = ({ shipName }) => {
  const {
    state: {
      game: {
        beforeGameState: { fleetPool },
      },
    },
  } = useStore();
  return (
    <Typography
      component="div"
      variant="caption"
      align="center"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        border: (theme) => `1px solid ${theme.palette.common.black}`,
        fontWeight: 600,
        width: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 5)`,
        height: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 5)`,
        borderRadius: "50%",
        fontSize: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 6)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: (theme) => theme.palette.common.white,
        transform: "translate(25%, -50%)",
      }}
    >
      {fleetPool[shipName]}
    </Typography>
  );
};
