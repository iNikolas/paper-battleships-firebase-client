import React from "react";
import { useStore } from "../../context";
import { CounterProps } from "./types";
import { Typography } from "@mui/material";
import { initialState } from "../../store/state/";
import { useGameData, useRivalGameState } from "../../utils";
import { BATTLESHIPS } from "../../constants";

export const Counter: React.FC<CounterProps> = ({ shipName, isRival }) => {
  const { data: playerGameState } = useGameData();
  const { data: rivalGameState } = useRivalGameState(
    playerGameState?.client || playerGameState?.host
  );
  const isEditable = playerGameState?.isEditable;
  const initialPool = initialState.game.beforeGameState.fleetPool[shipName];
  const battleshipIndex = BATTLESHIPS.indexOf(shipName);

  const playersDestroyedBattleships =
    playerGameState?.destroyedBattleships ||
    initialState.game.beforeGameState.destroyedBattleships;
  const rivalsDestroyedBattleships =
    rivalGameState?.destroyedBattleships ||
    initialState.game.beforeGameState.destroyedBattleships;

  const {
    state: {
      game: {
        beforeGameState: { fleetPool },
      },
    },
  } = useStore();

  return (
    <Typography
      component="div"
      variant="caption"
      align="center"
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        fontWeight: 600,
        width: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 5)`,
        height: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 5)`,
        borderRadius: "50%",
        fontSize: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 6)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: (theme) =>
          isRival ? theme.palette.secondary.main : theme.palette.primary.main,
        color: (theme) => theme.palette.common.white,
        transform: "translate(25%, -50%)",
        "@media screen and (orientation: landscape)": {
          fontSize: (theme) => theme.spacing(2),
          width: (theme) => theme.spacing(3),
          height: (theme) => theme.spacing(3),
        },
      }}
    >
      {isEditable && !isRival
        ? fleetPool[shipName]
        : isRival
        ? initialPool - rivalsDestroyedBattleships[battleshipIndex]
        : initialPool - playersDestroyedBattleships[battleshipIndex]}
    </Typography>
  );
};
