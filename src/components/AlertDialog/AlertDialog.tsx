import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { AlertDialogProps } from "./AlertDialogProps";
import API from "../../api";

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  setOpen,
  row,
}) => {
  const handleClose: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    event
  ) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleSend: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    event
  ) => {
    event.stopPropagation();
    API.doSend({ type: "join-game", host: row.uid, rivalName: row.name });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Start battle "${row.description}" with ${row.name}?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleSend} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
