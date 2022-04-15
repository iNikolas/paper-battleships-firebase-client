import { SetAlertType } from "../context";
import { tryReconnect } from "../utils";
import { SendType } from "./types";
import { Dispatch } from "react";
import { Actions, ActionType } from "../store/actions";

const API = {
  webSocket: null as null | WebSocket,

  initialize(
    host: string,
    setAlert: SetAlertType,
    dispatch: Dispatch<ActionType>
  ) {
    this.webSocket = new WebSocket(`ws://${host}`);

    const webSocket = this.webSocket;

    webSocket.onopen = () =>
      setAlert({
        show: true,
        severity: "info",
        message: "CONNECTED TO REDIS SERVER!",
      });

    webSocket.onerror = (event) =>
      setAlert({
        show: true,
        severity: "error",
        message: `WS connection failed: ${event.type}`,
      });

    webSocket.onclose = (event) => {
      setAlert({
        show: true,
        severity: "error",
        message: "DISCONNECTED FROM REDIS SERVER!",
      });

      tryReconnect(event, host, setAlert, dispatch);
    };

    webSocket.onmessage = ({ data: message }) => {
      const { errors, type, ...rest } = JSON.parse(message);

      if (errors)
        return setAlert({
          show: true,
          severity: "error",
          message: errors[0],
        });

      if (type === "game")
        return dispatch({
          type: Actions.SHOW_DITCH_GAME_REQUEST,
        });

      dispatch({ type: Actions.UPDATE_LOBBY_STATE, payload: rest });
    };
  },
  doSend(object: SendType) {
    this.webSocket?.send(JSON.stringify(object));
  },
};

export default API;
