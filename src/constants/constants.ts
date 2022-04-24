import { StatisticHeadCell } from "../components/RankingTable/types";
import { GamesHeadCell } from "../components/GamesTable/types";

import sailorMan1Img from "../images/sailor-man-mascot-design_26838-130.webp";
import sailorMan2Img from "../images/captain-sailorman.webp";
import pirate1Img from "../images/pirate1.png";
import pirate2Img from "../images/pirate 2.png";

const isDevelopment = process.env.NODE_ENV === "development";

export const HOST = isDevelopment
  ? "localhost:4000"
  : "paper-battleships-game-server.herokuapp.com";

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

export const DEFAULT_AVATARS = [
  sailorMan1Img,
  sailorMan2Img,
  pirate1Img,
  pirate2Img,
];
