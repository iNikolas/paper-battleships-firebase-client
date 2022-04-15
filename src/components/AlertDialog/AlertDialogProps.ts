import React from "react";
import { GameRequestState } from "../../store/state";

export interface AlertDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  row: GameRequestState;
}
