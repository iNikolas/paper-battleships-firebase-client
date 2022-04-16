import React from "react";
import { renderSquare } from "../../utils";
import { BoardWrapper } from "../BoardWrapper";

export const RivalBoard = () => {
  const isRival = true;
  const squares = [];

  for (let i = 0; i < 100; i++) squares.push(renderSquare(i, isRival));

  return <BoardWrapper elevation={6}>{squares}</BoardWrapper>;
};
