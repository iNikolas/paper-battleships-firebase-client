import React, { useContext } from "react";
import { useFirestore, useUser } from "reactfire";
import { deleteDoc, doc } from "firebase/firestore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useGameData } from "../../utils";
import { UIContext } from "../../context";
import { Board } from "../Board";

export const GameOverAlert = () => {
  const firestore = useFirestore();
  const {
    data: { winner },
  } = useGameData();
  const { data: user } = useUser();
  const { setAlert } = useContext(UIContext);

  const isOver = !!winner;
  const isWinner = winner === user?.uid;

  const handleGameOver = async () => {
    const docRef = doc(firestore, `games/${user?.uid}`);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <Dialog
      maxWidth={false}
      open={isOver}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Game is over. ${
            isWinner
              ? "You Won it! Congratulations!"
              : "You loose it. Good luck next time."
          }`}
        </DialogContentText>
        <Board isRival />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleGameOver} autoFocus>
          Understood
        </Button>
      </DialogActions>
    </Dialog>
  );
};
