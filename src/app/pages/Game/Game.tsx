import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Board,
  DitchGameDialog,
  GameControls,
  GameOverAlert,
  GamePanel,
  RivalBoard,
} from "../../../components";
import { useGameData } from "../../../utils";

export const Game = () => {
  const { data: activeGame } = useGameData();

  if (!activeGame) return <Navigate to="/" />;

  return (
    <Box>
      <Board />
      <RivalBoard />
      <GamePanel />
      <GameControls />
      <DitchGameDialog />
      <GameOverAlert />
    </Box>
  );
};
