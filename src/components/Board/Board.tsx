import React, { useContext, useEffect } from "react";
import { renderSquare, useGameData, useRivalGameState } from "../../utils";
import { GameActions } from "../../store/actions/game";
import { UIContext, useStore } from "../../context";
import { BoardWrapper } from "../BoardWrapper";
import { SquareState } from "../../store/state";
import { PlayerIsNotReadyNotification } from "../PlayerIsNotReadyNotification";

export const Board = () => {
  const squares = [];
  const { data: activeGame } = useGameData();
  const { setAlert } = useContext(UIContext);
  const { isEditable, battleshipIndexes, isMoving, client, host } = activeGame;
  const { data: rivalGameState } = useRivalGameState(client || host);
  const isRivalReady = !rivalGameState?.isEditable;
  const { dispatch } = useStore();
  const gameBoard = activeGame?.gameBoard as Array<SquareState>;

  useEffect(() => {
    if (!isEditable)
      dispatch({
        type: GameActions.SYNCHRONIZE_GAME_STATE_WITH_SERVER,
        payload: { gameBoard, battleshipIndexes },
      });
  }, [isEditable, gameBoard, dispatch, battleshipIndexes]);

  useEffect(() => {
    if (isRivalReady && !isEditable && isMoving)
      setAlert({
        show: true,
        severity: "info",
        message: "Your move!",
      });
  }, [isRivalReady, isEditable, setAlert, isMoving]);

  for (let i = 0; i < 100; i++) squares.push(renderSquare(i));

  return (
    <>
      <BoardWrapper elevation={6}>{squares}</BoardWrapper>
      {!isRivalReady && <PlayerIsNotReadyNotification />}
    </>
  );
};
