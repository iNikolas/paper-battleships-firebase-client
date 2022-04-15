import React from "react";
import { Box } from "@mui/material";
import { SquareCaption } from "../";
import { SquareProps } from "./SquareProps";
import { ALPHABET, useGameData } from "../../utils";
import { useStore } from "../../context";
import { GameActions } from "../../store/actions/game";

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

  const handleClick = () =>
    dispatch({ type: GameActions.PLACE_BATTLESHIP_ON_BOARD });

  const handleHover = () => {
    dispatch({ type: GameActions.GET_HIGHLIGHTED_INDEXES, payload: index });
  };

  const handleLeave = () => dispatch({ type: GameActions.REMOVE_HIGHLIGHTED });

  return (
    <Box
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      key={index}
      sx={{
        cursor: isEditable ? "pointer" : "cursor",
        width: "10%",
        height: "10%",
        border: "1px solid #aaa",
        position: "relative",
        backgroundColor: (theme) => {
          if (isOccupied && isHovered) return theme.palette.error.main;
          if (isBorder && isHovered) return theme.palette.error.light;
          if (isOccupied) return theme.palette.grey.A400;
          if (isHovered && !isEditable) return "";
          if (isHovered) return theme.palette.grey["300"];
          return "";
        },
      }}
    >
      {index < 10 && <SquareCaption top>{index + 1}</SquareCaption>}
      {!(index % 10) && <SquareCaption>{ALPHABET[index / 10]}</SquareCaption>}
    </Box>
  );
};
