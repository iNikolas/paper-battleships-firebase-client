import { GameRequestState } from "../../store/state";

export interface GamesHeadCell {
  disablePadding: boolean;
  id: keyof GameRequestState;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export interface TableRowClickableProps {
  row: any;
  isActiveSearch: boolean;
}
