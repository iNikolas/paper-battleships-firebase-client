import React, { useContext } from "react";
import { useFirestore, useUser } from "reactfire";
import { doc, writeBatch } from "firebase/firestore";
import { Box, Button } from "@mui/material";
import API from "../../api";
import { useGameData, useRivalGameState } from "../../utils";
import { UIContext, useStore } from "../../context";
import { GameActions } from "../../store/actions/game";
import { InGameChat } from "../InGameChat";

export const GameControls = () => {
  const {
    data: { client, host, isEditable },
  } = useGameData();
  const { data: rivalGameData } = useRivalGameState(client || host);
  const { data: user } = useUser();
  const firestore = useFirestore();
  const playerRef = doc(firestore, `games/${user?.uid}`);
  const rivalRef = doc(firestore, `games/${client || host}`);
  const {
    state: {
      game: {
        serverTime,
        beforeGameState: {
          fleetPool,
          gameBoard,
          battleshipIndexes,
          destroyedBattleships,
        },
      },
    },
    dispatch,
  } = useStore();
  const { setAlert } = useContext(UIContext);

  const handleDitchGameClick = () => {
    if (rivalGameData?.isEditable || isEditable)
      return API.doSend({ type: "ditch-game" });
    API.doSend({ type: "ditch-game-request", rivalUid: client || host });
    setAlert({
      show: true,
      severity: "info",
      message: "We will ask your Rival for consent.",
    });
  };

  const handleResetGameClick = () => {
    dispatch({ type: GameActions.RESET_GAME_STATE });
  };

  const handleReadyClick = async () => {
    for (let count of Object.values(fleetPool)) {
      if (count)
        return setAlert({
          show: true,
          severity: "info",
          message: "Please, place all battleships on the board first.",
        });
    }
    try {
      const batch = writeBatch(firestore);
      batch.update(playerRef, {
        isEditable: false,
        gameBoard,
        battleshipIndexes,
        destroyedBattleships,
        lastMoveTime: serverTime,
      });
      batch.update(rivalRef, {
        lastMoveTime: serverTime,
      });
      await batch.commit();
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "left",
        width: "100%",
        pr: 1,
        pl: 1,
        "@media screen and (orientation: landscape)": {
          mt: 2,
        },
      }}
    >
      {isEditable && (
        <Button disabled={!isEditable} onClick={handleReadyClick} size="small">
          READY
        </Button>
      )}
      {isEditable && (
        <Button
          disabled={!isEditable}
          onClick={handleResetGameClick}
          size="small"
        >
          RESET
        </Button>
      )}
      {!isEditable && <InGameChat />}
      <Button onClick={handleDitchGameClick} size="small">
        DITCH GAME
      </Button>
    </Box>
  );
};
