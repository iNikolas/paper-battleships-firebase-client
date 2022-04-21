import React from "react";
import { renderSquare } from "../../utils";
import { BoardWrapper } from "../BoardWrapper";
import { GamePanel } from "../GamePanel";
import { GamePanelWrapper } from "../";

export const RivalBoard = () => {
  const isRival = true;
  const squares = [];

  for (let i = 0; i < 100; i++) squares.push(renderSquare(i, isRival));

  return (
    <GamePanelWrapper>
      <GamePanel isRival />
      <BoardWrapper elevation={6}>{squares}</BoardWrapper>
    </GamePanelWrapper>
  );
};
