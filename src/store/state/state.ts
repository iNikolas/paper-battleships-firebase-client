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
  avatars: {
    [key: string]: string | null;
  };
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
  destroyedBattleships: Array<number>;
}

export interface GameState {
  isDitchGameRequest: boolean;
  serverTime: number;
  beforeGameState: BeforeGameState;
}

export type SquareState = "occupied" | "border" | "hit" | "miss" | null;

export const initialState = {
  lobby: {
    online: [],
    gameRequests: [],
    avatars: {},
  },
  game: {
    serverTime: Date.now(),
    isDitchGameRequest: false,
    beforeGameState: {
      selectedBattleship: "Battleship",
      shipDirection: "right",
      highlightedIndexes: [],
      battleshipIndexes: [],
      destroyedBattleships: Array(BATTLESHIPS.length).fill(0),
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
