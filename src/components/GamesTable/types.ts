import React from "react";
import { GameRequestState } from "../../store/state";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof GameRequestState;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof GameRequestState
  ) => void;
  order: Order;
  orderBy: string;
}

export type Order = "asc" | "desc";

export interface TableRowClickableProps {
  row: GameRequestState;
  isActiveSearch: boolean;
}
