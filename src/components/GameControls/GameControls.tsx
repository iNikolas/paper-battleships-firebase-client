import React, { useContext } from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { updateDoc, doc } from "firebase/firestore";
import { Box, Button } from "@mui/material";
import API from "../../api";
import { useGameData } from "../../utils";
import { UIContext, useStore } from "../../context";
import { GameActions } from "../../store/actions/game";

export const GameControls = () => {
  const {
    data: { client, host, isEditable },
  } = useGameData();
  const { data: user } = useUser();
  const firestore = useFirestore();
  const gameDoc = doc(firestore, `games/${user?.uid}`);
  const {
    state: {
      game: {
        beforeGameState: { fleetPool },
      },
    },
    dispatch,
  } = useStore();
  const { setAlert } = useContext(UIContext);

  const handleDitchGameClick = () => {
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
      await updateDoc(gameDoc, {
        isEditable: false,
      });
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
        paddingRight: (theme) => theme.spacing(1),
      }}
    >
      <Button disabled={!isEditable} onClick={handleReadyClick} size="small">
        READY
      </Button>
      <Button
        disabled={!isEditable}
        onClick={handleResetGameClick}
        size="small"
      >
        RESET
      </Button>
      <Button onClick={handleDitchGameClick} size="small">
        DITCH GAME
      </Button>
    </Box>
  );
};
