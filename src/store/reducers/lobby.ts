import { GameRequestStateMeta, LobbyState } from "../state";
import { ActionType, Actions } from "../actions";

export const lobby = (
  draft = {} as LobbyState,
  action: ActionType
): LobbyState => {
  switch (action.type) {
    case Actions.UPDATE_LOBBY_STATE:
      try {
        const newState = action.payload;
        for (let key in newState) {
          if (key === "online") draft.online = newState[key];
          if (key === "gameRequests") {
            draft.gameRequests = [];
            let gameRequest = {};

            (newState[key] as Array<unknown>).forEach((entry, index) => {
              const isUid = !(index % 2);
              if (isUid) {
                gameRequest = { uid: entry };
                return;
              }
              draft.gameRequests.push({
                ...(gameRequest as { uid: string }),
                ...(entry as GameRequestStateMeta),
              });
            });
          }
        }
      } catch (e) {
        console.log(e.message);
      }
      return draft;
    default:
      return draft;
  }
};
