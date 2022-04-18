import { StatisticHeadCell } from "../components/RankingTable/types";
import { GamesHeadCell } from "../components/GamesTable/types";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const BATTLESHIPS = [
  "Destroyer",
  "Submarine",
  "Cruiser",
  "Battleship",
] as const;

export const LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";

export const AXIS_LENGTH = 9;

export const MOVE_TIME_SEC = 60;

export const STATISTIC_HEAD_CELLS: readonly StatisticHeadCell[] = [
  {
    id: "position",
    numeric: false,
    disablePadding: true,
    label: "#",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Player",
  },
  {
    id: "gamesPlayed",
    numeric: true,
    disablePadding: true,
    label: "Games",
  },
  {
    id: "winRate",
    numeric: true,
    disablePadding: true,
    label: "Wins, %",
  },
];

export const GAMES_HEAD_CELLS: readonly GamesHeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Player",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Desc.",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
];
