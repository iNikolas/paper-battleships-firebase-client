import React from "react";
import { Paper } from "@mui/material";
import { Battleship, DirectionToggle, Timer } from "../";

export const GamePanel = () => {
  return (
    <Paper
      variant="outlined"
      sx={{
        position: "absolute",
        top: (theme) => theme.spacing(4),
        right: (theme) => theme.spacing(2),
        width: (theme) => `calc(35vw - ${theme.spacing(8)})`,
        minHeight: "65vw",
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        "@media screen and (orientation: landscape)": {
          minHeight: "35vw",
          width: (theme) => theme.spacing(15),
          top: (theme) => theme.spacing(6),
          left: (theme) => theme.spacing(2),
        },
      }}
    >
      <DirectionToggle />
      <Battleship shipName="Battleship" shipSize={4} />
      <Battleship shipName="Cruiser" shipSize={3} />
      <Battleship shipName="Submarine" shipSize={2} />
      <Battleship shipName="Destroyer" shipSize={1} />
      <Timer />
    </Paper>
  );
};
