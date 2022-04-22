import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { ExplosionIcon, SquareCaption, SquareWrapper } from "../";
import { SquareProps } from "./SquareProps";
import {
  ALPHABET,
  playAudio,
  useGameData,
  useProfileBattleshipColor,
  useRivalGameState,
} from "../../utils";
import { useStore } from "../../context";
import { GameActions } from "../../store/actions/game";
import { SquareState } from "../../store/state";

const explosionSound = require("../../sounds/explosion.wav");

export const Square: React.FC<SquareProps> = ({ index, isRival }) => {
  const [rivalsBoard, setRivalsBoard] = useState<Array<SquareState>>(
    Array(100).fill(null)
  );
  const {
    data: { isEditable, winner, client, host },
  } = useGameData();
  const { data: rivalsGameState } = useRivalGameState(client || host);
  const {
    state: {
      game: {
        beforeGameState: { highlightedIndexes, gameBoard },
      },
    },
    dispatch,
  } = useStore();
  const battleshipColor = useProfileBattleshipColor();

  const isHovered = highlightedIndexes.includes(index);
  const isOccupied = isRival
    ? rivalsBoard[index] === "occupied"
    : gameBoard[index] === "occupied";
  const isBorder = isRival
    ? rivalsBoard[index] === "border"
    : gameBoard[index] === "border";
  const isMiss = isRival
    ? rivalsBoard[index] === "miss"
    : gameBoard[index] === "miss";
  const isHit = isRival
    ? rivalsBoard[index] === "hit"
    : gameBoard[index] === "hit";

  const handleClick = () =>
    dispatch({ type: GameActions.PLACE_BATTLESHIP_ON_BOARD });

  const handleHover = () => {
    dispatch({ type: GameActions.GET_HIGHLIGHTED_INDEXES, payload: index });
  };

  const handleLeave = () => dispatch({ type: GameActions.REMOVE_HIGHLIGHTED });

  useEffect(() => {
    if (isHit && !isRival)
      playAudio(explosionSound).catch((error) => console.log(error.message));
  }, [isHit, isRival]);

  useEffect(() => {
    if (winner && rivalsGameState) setRivalsBoard(rivalsGameState.gameBoard);
  }, [winner, rivalsGameState]);

  return (
    <SquareWrapper
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      key={index}
      sx={{
        cursor: isEditable && !isRival ? "pointer" : "cursor",
        backgroundColor: (theme) => {
          if (isOccupied && isHovered) return theme.palette.error.main;
          if (isBorder && isHovered) return theme.palette.error.light;
          if (isOccupied || isHit)
            return battleshipColor || theme.palette.grey.A400;
          if (isHovered && !isEditable) return "";
          if (isHovered) return theme.palette.grey["300"];
          return "";
        },
      }}
    >
      {index < 10 && <SquareCaption top>{index + 1}</SquareCaption>}
      {!(index % 10) && <SquareCaption>{ALPHABET[index / 10]}</SquareCaption>}
      {isMiss && (
        <Typography sx={{ fontSize: (theme) => theme.spacing(3) }}>
          •
        </Typography>
      )}
      {isHit && <ExplosionIcon />}
    </SquareWrapper>
  );
};
