import { LobbyActions } from "./lobby";
import { GameActions } from "./game";
import { Battleships, Direction } from "../state";

export const Actions = { ...LobbyActions, ...GameActions };

export interface UpdateLobbyStateAction {
  type: LobbyActions.UPDATE_LOBBY_STATE;
  payload: { [index: string]: any };
}

export interface RefuseDitchGameRequestAction {
  type: GameActions.DISCARD_DITCH_GAME_REQUEST;
}

export interface ShowDitchGameRequestAction {
  type: GameActions.SHOW_DITCH_GAME_REQUEST;
}

export interface SelectBattleship {
  type: GameActions.SELECT_BATTLESHIP;
  payload: Battleships;
}

export interface ChangeDirection {
  type: GameActions.CHANGE_DIRECTION;
  payload: Direction;
}

export interface GetHighlightedIndexes {
  type: GameActions.GET_HIGHLIGHTED_INDEXES;
  payload: number;
}

export interface RemoveHighlighted {
  type: GameActions.REMOVE_HIGHLIGHTED;
}

export interface PlaceBattleshipOnBoard {
  type: GameActions.PLACE_BATTLESHIP_ON_BOARD;
}

export interface ResetGameState {
  type: GameActions.RESET_GAME_STATE;
}

export type ActionType =
  | UpdateLobbyStateAction
  | RefuseDitchGameRequestAction
  | ShowDitchGameRequestAction
  | SelectBattleship
  | ChangeDirection
  | GetHighlightedIndexes
  | RemoveHighlighted
  | PlaceBattleshipOnBoard
  | ResetGameState;
