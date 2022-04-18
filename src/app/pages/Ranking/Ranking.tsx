import React from "react";
import { LobbyWrapper, RankingTable } from "../../../components";
import { Box, Typography } from "@mui/material";

export const Ranking = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
      }}
    >
      <Typography align="center" gutterBottom variant="h6">
        TOP 100 PLAYERS
      </Typography>
      <LobbyWrapper>
        <RankingTable />
      </LobbyWrapper>
    </Box>
  );
};
