import { Battleships, GameState, initialState } from "../state";
import { ActionType, Actions } from "../actions";
import {
  getBoardCoordinates,
  getBoardIndex,
  markAllSquaresAroundBattleshipOnBoard,
} from "../../utils";
import { AXIS_LENGTH, BATTLESHIPS } from "../../constants";

export const game = (
  draft = {} as GameState,
  action: ActionType
): GameState => {
  switch (action.type) {
    case Actions.DISCARD_DITCH_GAME_REQUEST:
      draft.isDitchGameRequest = false;
      return draft;
    case Actions.SHOW_DITCH_GAME_REQUEST:
      draft.isDitchGameRequest = true;
      return draft;
    case Actions.SELECT_BATTLESHIP:
      if (draft.beforeGameState.fleetPool[action.payload])
        draft.beforeGameState.selectedBattleship = action.payload;
      return draft;
    case Actions.CHANGE_DIRECTION:
      draft.beforeGameState.shipDirection = action.payload;
      return draft;
    case Actions.GET_HIGHLIGHTED_INDEXES:
      const shipName = draft.beforeGameState.selectedBattleship;
      if (!shipName) return draft;

      const indexes = [action.payload];
      const [anchorX, anchorY] = getBoardCoordinates(action.payload);
      const direction = draft.beforeGameState.shipDirection;
      const shipSize = BATTLESHIPS.lastIndexOf(shipName);
      const isRight = direction === "right";

      for (let i = 1; i <= shipSize; i++) {
        const increment = isRight ? anchorX + i : anchorY + i;
        const newCoordinatePoint =
          increment <= AXIS_LENGTH
            ? increment
            : increment - i - (increment - AXIS_LENGTH);
        indexes.push(
          getBoardIndex([
            isRight ? newCoordinatePoint : anchorX,
            isRight ? anchorY : newCoordinatePoint,
          ])
        );
      }

      draft.beforeGameState.highlightedIndexes = indexes;
      return draft;
    case Actions.REMOVE_HIGHLIGHTED:
      draft.beforeGameState.highlightedIndexes = [];
      return draft;
    case Actions.PLACE_BATTLESHIP_ON_BOARD:
      const battleshipUnitsIndexesList =
        draft.beforeGameState.highlightedIndexes;
      const battleShipName = draft.beforeGameState.selectedBattleship;
      const battleshipsPool = battleShipName
        ? draft.beforeGameState.fleetPool[battleShipName]
        : 0;

      if (!battleshipsPool) return draft;

      for (let hoverIndex of battleshipUnitsIndexesList) {
        if (draft.beforeGameState.gameBoard[hoverIndex]) return draft;
      }

      markAllSquaresAroundBattleshipOnBoard({
        battleshipIndexes: battleshipUnitsIndexesList,
        boundaryMark: "border",
        battleshipMark: "occupied",
        board: draft.beforeGameState.gameBoard,
      });

      draft.beforeGameState.battleshipIndexes.push(
        battleshipUnitsIndexesList.join(",")
      );

      draft.beforeGameState.fleetPool[battleShipName!] -= 1;

      if (!draft.beforeGameState.fleetPool[battleShipName!]) {
        for (let battleship in draft.beforeGameState.fleetPool) {
          const battleshipName = battleship as Battleships;
          if (draft.beforeGameState.fleetPool[battleshipName]) {
            draft.beforeGameState.selectedBattleship = battleshipName;
            return draft;
          }
        }
        draft.beforeGameState.selectedBattleship = null;
      }
      return draft;
    case Actions.RESET_GAME_STATE:
      draft = initialState.game;
      return draft;
    case Actions.SYNCHRONIZE_GAME_STATE_WITH_SERVER:
      const { gameBoard, battleshipIndexes } = action.payload;
      draft.beforeGameState.gameBoard = gameBoard;
      draft.beforeGameState.battleshipIndexes = battleshipIndexes;
      for (let key in draft.beforeGameState.fleetPool) {
        const battleship = key as Battleships;
        draft.beforeGameState.fleetPool[battleship] = 0;
      }
      draft.beforeGameState.selectedBattleship = null;
      return draft;
    case Actions.SYNCHRONIZE_GAME_TIME_WITH_SERVER:
      draft.serverTime = action.payload;
      return draft;
    default:
      return draft;
  }
};
