import React, { useContext, useEffect, useRef, useState } from "react";
import { writeBatch, doc } from "firebase/firestore";
import { useFirestore, useUser } from "reactfire";
import { Typography } from "@mui/material";
import { useGameData, useRivalGameState } from "../../utils";
import { MOVE_TIME_SEC } from "../../constants";
import { UIContext } from "../../context";

export const Timer = () => {
  const firestore = useFirestore();
  const { setAlert } = useContext(UIContext);
  const [countdownSec, setCountdownSec] = useState(0);
  const { data: player } = useUser();
  const { data: gameData } = useGameData();
  const { data: rivalGameState } = useRivalGameState(
    gameData.client || gameData.host
  );
  const timer = useRef<NodeJS.Timeout | null>(null);

  const isPlayerMove = gameData.isMoving;
  const timestampMs = isPlayerMove
    ? gameData?.lastMoveTime
    : rivalGameState?.lastMoveTime || Date.now();

  const swapQue = () => {
    const batch = writeBatch(firestore);

    const playerRef = doc(firestore, `games/${player?.uid}`);
    const rivalRef = doc(
      firestore,
      `games/${gameData?.client || gameData?.host}`
    );

    batch.update(playerRef, {
      isMoving: !isPlayerMove,
      lastMoveTime: Date.now(),
    });
    batch.update(rivalRef, {
      isMoving: isPlayerMove,
      lastMoveTime: Date.now(),
    });

    batch
      .commit()
      .catch((error) =>
        setAlert({ show: true, severity: "error", message: error.message })
      );
  };

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);

    const remainedTime = MOVE_TIME_SEC - (Date.now() - timestampMs) / 1000;
    setCountdownSec(remainedTime);

    timer.current = setInterval(
      () => setCountdownSec(MOVE_TIME_SEC - (Date.now() - timestampMs) / 1000),
      1000
    );

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [timestampMs]);

  useEffect(() => {
    if (countdownSec < 0) swapQue();
  }, [countdownSec]);

  if (gameData?.isEditable || rivalGameState?.isEditable || gameData?.winner)
    return null;
  return (
    <Typography
      component="span"
      variant="subtitle2"
      color="common.white"
      bgcolor={() => {
        if (isPlayerMove && countdownSec > 30) return "success.light";
        if (isPlayerMove && countdownSec > 10) return "warning.light";
        if (isPlayerMove) return "error.light";
        return "secondary.light";
      }}
      sx={{
        mt: 1,
        p: 1,
        borderRadius: 2,
        fontSize: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 6)`,
        "@media screen and (orientation: landscape)": {
          fontSize: (theme) => theme.spacing(2),
        },
      }}
    >
      {Math.floor(countdownSec)}
    </Typography>
  );
};
