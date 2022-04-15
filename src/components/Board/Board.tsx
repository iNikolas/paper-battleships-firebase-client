import React from "react";
import { Paper } from "@mui/material";
import { renderSquare } from "../../utils";

export const Board = () => {
  const squares = [];

  for (let i = 0; i < 100; i++) squares.push(renderSquare(i));

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 4,
        mb: 1,
        ml: 4,
        width: "65vw",
        height: "65vw",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {squares}
    </Paper>
  );
};
