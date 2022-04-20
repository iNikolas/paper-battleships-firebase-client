import { Dispatch } from "react";
import { SetAlertType } from "../context";
import { tryReconnect } from "../utils";
import { SendType } from "./types";
import { Actions, ActionType } from "../store/actions";

const isDevelopment = process.env.NODE_ENV === "development";

const API = {
  webSocket: null as null | WebSocket,

  token: null as null | string,

  initialize(
    host: string,
    setAlert: SetAlertType,
    dispatch: Dispatch<ActionType>
  ) {
    if (!this.token)
      throw new Error("API can not be initialized without auth token");

    this.webSocket = new WebSocket(
      `ws${isDevelopment ? "" : "s"}://${host}`,
      this.token
    );

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
      const { errors, type, serverTime, ...rest } = JSON.parse(message);

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

      if (type === "update-time" && serverTime)
        return dispatch({
          type: Actions.SYNCHRONIZE_GAME_TIME_WITH_SERVER,
          payload: serverTime,
        });

      dispatch({ type: Actions.UPDATE_LOBBY_STATE, payload: rest });
    };
  },
  doSend(object: SendType) {
    this.webSocket?.send(JSON.stringify({ ...object, token: this.token }));
  },
};

export default API;
