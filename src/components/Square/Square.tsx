import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { ExplosionIcon, SquareCaption, SquareWrapper } from "../";
import { SquareProps } from "./SquareProps";
import { ALPHABET, playAudio, useGameData } from "../../utils";
import { useStore } from "../../context";
import { GameActions } from "../../store/actions/game";

const explosionSound = require("../../sounds/explosion.wav");

export const Square: React.FC<SquareProps> = ({ index }) => {
  const {
    data: { isEditable },
  } = useGameData();
  const {
    state: {
      game: {
        beforeGameState: { highlightedIndexes, gameBoard },
      },
    },
    dispatch,
  } = useStore();

  const isHovered = highlightedIndexes.includes(index);
  const isOccupied = gameBoard[index] === "occupied";
  const isBorder = gameBoard[index] === "border";
  const isMiss = gameBoard[index] === "miss";
  const isHit = gameBoard[index] === "hit";

  const handleClick = () =>
    dispatch({ type: GameActions.PLACE_BATTLESHIP_ON_BOARD });

  const handleHover = () => {
    dispatch({ type: GameActions.GET_HIGHLIGHTED_INDEXES, payload: index });
  };

  const handleLeave = () => dispatch({ type: GameActions.REMOVE_HIGHLIGHTED });

  useEffect(() => {
    if (isHit)
      playAudio(explosionSound).catch((error) => console.log(error.message));
  }, [isHit]);

  return (
    <SquareWrapper
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      key={index}
      sx={{
        cursor: isEditable ? "pointer" : "cursor",
        backgroundColor: (theme) => {
          if (isOccupied && isHovered) return theme.palette.error.main;
          if (isBorder && isHovered) return theme.palette.error.light;
          if (isOccupied || isHit) return theme.palette.grey.A400;
          if (isHovered && !isEditable) return "";
          if (isHovered) return theme.palette.grey["300"];
          return "";
        },
      }}
    >
      {index < 10 && <SquareCaption top>{index + 1}</SquareCaption>}
      {!(index % 10) && <SquareCaption>{ALPHABET[index / 10]}</SquareCaption>}
      {isMiss && (
        <Typography sx={{ fontSize: (theme) => theme.spacing(2) }}>
          •
        </Typography>
      )}
      {isHit && <ExplosionIcon />}
    </SquareWrapper>
  );
};
