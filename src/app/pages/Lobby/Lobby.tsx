import React from "react";
import { Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Chat, CreateGame, GamesTable } from "../../../components";
import { useGameData } from "../../../utils";

export const Lobby = () => {
  const { status, data: activeGame } = useGameData();

  if (status === "loading") return null;
  if (activeGame) return <Navigate to="game" />;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        <CreateGame />
        <GamesTable />
      </Box>
      <Chat />
    </Box>
  );
};
