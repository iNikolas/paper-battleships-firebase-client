import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Board,
  DitchGameDialog,
  GamePanel,
  GameControls,
} from "../../../components";
import { useGameData } from "../../../utils";

export const Game = () => {
  const { data: activeGame } = useGameData();

  if (!activeGame) return <Navigate to="/" />;

  return (
    <Box>
      <Board />
      <Board />
      <GamePanel />
      <GameControls />
      <DitchGameDialog />
    </Box>
  );
};
