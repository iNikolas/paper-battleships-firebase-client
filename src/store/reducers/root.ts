import produce from "immer";
import { combineReducers } from "redux-immer";
import { lobby } from "./lobby";
import { game } from "./game";

export const rootReducer = combineReducers(produce, { lobby, game });
