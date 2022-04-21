import React from "react";
import { Box } from "@mui/material";
import { useStore } from "../../context";
import { BattleshipProps } from "./types";
import { renderUnit } from "../../utils";
import { GameActions } from "../../store/actions/game";
import { Counter, GamePanelTypography } from "../";

export const Battleship: React.FC<BattleshipProps> = ({
  shipSize,
  shipName,
  isRival,
}) => {
  const units = [];
  const {
    state: {
      game: {
        beforeGameState: { selectedBattleship },
      },
    },
    dispatch,
  } = useStore();

  const handleBattleshipSelect = () => {
    if (isRival) return;
    dispatch({ type: GameActions.SELECT_BATTLESHIP, payload: shipName });
  };

  const selected = shipName === selectedBattleship && !isRival;

  for (let i = 0; i < shipSize; i++) {
    const left = i === 0;
    const right = i === shipSize - 1;
    units.push(renderUnit(i, left, right, selected, isRival));
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <GamePanelTypography align="center" variant="caption" gutterBottom>
        {shipName}
      </GamePanelTypography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          onClick={handleBattleshipSelect}
          sx={{
            display: "flex",
            justifyContent: "center",
            border: (theme) => `1px solid ${theme.palette.grey.A400}`,
            maxWidth: "min-content",
            position: "relative",
          }}
        >
          {units}
          <Counter isRival={isRival} shipName={shipName} />
        </Box>
      </Box>
    </Box>
  );
};
