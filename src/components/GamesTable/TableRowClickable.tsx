import React, { useState } from "react";
import { TableRow } from "@mui/material";
import { TableRowClickableProps } from "./types";
import { AlertDialog } from "../AlertDialog";

export const TableRowClickable: React.FC<TableRowClickableProps> = ({
  children,
  row,
  isActiveSearch,
}) => {
  const [open, setOpen] = useState(false);
  const handleRowClick = () => {
    if (isActiveSearch) return;
    setOpen(true);
  };

  return (
    <TableRow onClick={handleRowClick} sx={{ whiteSpace: "nowrap" }} hover>
      <AlertDialog open={open} setOpen={setOpen} row={row} />
      {children}
    </TableRow>
  );
};
