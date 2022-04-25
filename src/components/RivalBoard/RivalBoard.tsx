import React from "react";
import { renderSquare, useGameData, useRivalGameState } from "../../utils";
import { BoardWrapper } from "../BoardWrapper";
import { GamePanel } from "../GamePanel";
import { GamePanelWrapper, PlayerIsNotReadyNotification } from "../";

export const RivalBoard = () => {
  const isRival = true;
  const squares = [];

  const { data: activeGame } = useGameData();
  const { client, host } = activeGame;
  const { data: rivalGameState } = useRivalGameState(client || host);
  const isRivalReady = !rivalGameState?.isEditable;

  for (let i = 0; i < 100; i++) squares.push(renderSquare(i, isRival));

  return (
    <GamePanelWrapper>
      <GamePanel isRival />
      <BoardWrapper elevation={6}>
        {!isRivalReady && <PlayerIsNotReadyNotification />}
        {squares}
      </BoardWrapper>
    </GamePanelWrapper>
  );
};
