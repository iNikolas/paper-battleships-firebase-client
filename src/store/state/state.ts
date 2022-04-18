import { BATTLESHIPS } from "../../constants";

export interface GlobalState {
  lobby: LobbyState;
  game: GameState;
}

export interface GameRequestStateMeta {
  name: string;
  description?: string;
  time?: string;
}

export type GameRequestState = { uid?: string } & GameRequestStateMeta;

export interface LobbyState {
  online: Array<string>;
  gameRequests: Array<GameRequestState>;
}

export type Battleships = typeof BATTLESHIPS[number];

export type Direction = "right" | "down";

export type FleetPool = {
  [key in Battleships]: number;
};

export interface BeforeGameState {
  selectedBattleship: Battleships | null;
  shipDirection: Direction;
  highlightedIndexes: Array<number>;
  gameBoard: Array<SquareState>;
  fleetPool: FleetPool;
  battleshipIndexes: Array<string>;
}

export interface GameState {
  isDitchGameRequest: boolean;
  beforeGameState: BeforeGameState;
}

export type SquareState = "occupied" | "border" | "hit" | "miss" | null;

export const initialState = {
  lobby: {
    online: [],
    gameRequests: [],
  },
  game: {
    isDitchGameRequest: false,
    beforeGameState: {
      selectedBattleship: "Battleship",
      shipDirection: "right",
      highlightedIndexes: [],
      battleshipIndexes: [],
      gameBoard: Array(100).fill(null),
      fleetPool: {
        Battleship: 1,
        Cruiser: 2,
        Submarine: 3,
        Destroyer: 4,
      },
    },
  },
} as GlobalState;
