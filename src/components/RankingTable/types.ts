export type RankingData = {
  gamesPlayed: number;
  name: string;
  winRate: number;
  position: number;
};

export interface StatisticHeadCell {
  disablePadding: boolean;
  id: keyof RankingData;
  label: string;
  numeric: boolean;
}

export interface OnlineIndicatorProps {
  uid: string;
}

export type Order = "asc" | "desc";
