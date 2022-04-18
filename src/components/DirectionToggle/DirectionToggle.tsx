import React from "react";
import { Box } from "@mui/material";
import { GamePanelTypography } from "../";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useStore } from "../../context";
import { GameActions } from "../../store/actions/game";

export const DirectionToggle = () => {
  const {
    state: {
      game: {
        beforeGameState: { shipDirection },
      },
    },
    dispatch,
  } = useStore();

  const handleChangeDirection = () => {
    dispatch({
      type: GameActions.CHANGE_DIRECTION,
      payload: shipDirection === "right" ? "down" : "right",
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <GamePanelTypography align="center" variant="caption" gutterBottom>
        Direction
      </GamePanelTypography>
      <ArrowCircleRightOutlinedIcon
        onClick={handleChangeDirection}
        sx={{
          cursor: "pointer",
          fontSize: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 3)`,
          transform: shipDirection === "right" ? "" : "rotate(90deg)",
          "@media screen and (orientation: landscape)": {
            fontSize: (theme) => theme.spacing(4),
          },
        }}
      />
    </Box>
  );
};
