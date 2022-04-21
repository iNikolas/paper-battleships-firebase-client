import React from "react";
import { Paper } from "@mui/material";
import { Battleship, DirectionToggle, Timer } from "../";
import { useGameData } from "../../utils";
import { GamePanelProps } from "./GamePanelProps";

export const GamePanel: React.FC<GamePanelProps> = ({ isRival }) => {
  const { data: playerGameState } = useGameData();
  const isEditable = playerGameState?.isEditable;

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          position: "absolute",
          top: (theme) => 0,
          right: (theme) => theme.spacing(2),
          width: (theme) => `calc(35vw - ${theme.spacing(8)})`,
          minHeight: "65vw",
          p: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          "@media screen and (orientation: landscape)": {
            transform: "translateX(calc(-100%))",
            minHeight: "30vw",
            width: (theme) => theme.spacing(15),
            top: (theme) => theme.spacing(4),
            left: 0,
          },
        }}
      >
        {isEditable && !isRival && <DirectionToggle />}
        <Battleship isRival={isRival} shipName="Battleship" shipSize={4} />
        <Battleship isRival={isRival} shipName="Cruiser" shipSize={3} />
        <Battleship isRival={isRival} shipName="Submarine" shipSize={2} />
        <Battleship isRival={isRival} shipName="Destroyer" shipSize={1} />
        {!isRival && <Timer />}
      </Paper>
    </>
  );
};
