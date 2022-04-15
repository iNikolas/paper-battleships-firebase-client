import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import API from "../../api";
import { useStore } from "../../context";
import { GameActions } from "../../store/actions/game";
import { useGameData } from "../../utils";

export const DitchGameDialog = () => {
  const {
    state: {
      game: { isDitchGameRequest },
    },
    dispatch,
  } = useStore();
  const {
    data: { rivalName },
  } = useGameData();

  const handleClose:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    dispatch({ type: GameActions.DISCARD_DITCH_GAME_REQUEST });
  };

  const handleSend:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    API.doSend({ type: "ditch-game" });
    dispatch({ type: GameActions.DISCARD_DITCH_GAME_REQUEST });
  };

  return (
    <Dialog
      open={isDitchGameRequest}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Your Rival ${rivalName} wants to ditch the game.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Disagree
        </Button>
        <Button onClick={handleSend}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};
