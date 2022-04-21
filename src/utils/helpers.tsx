import React, { Dispatch } from "react";
import { Square, Unit } from "../components";
import { Order } from "../components/GamesTable/types";
import API from "../api";
import { SetAlertType } from "../context";
import { ActionType } from "../store/actions";
import { AXIS_LENGTH, MONTHS } from "../constants";
import { GameRequestState, SquareState } from "../store/state";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { doc } from "firebase/firestore";
import { RivalSquare } from "../components/RivalSquare/RivalSquare";

export const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const renderSquare = (index: number, rival = false) => {
  return rival ? (
    <RivalSquare index={index} key={index} />
  ) : (
    <Square key={index} index={index} />
  );
};

export const renderUnit = (
  index: number,
  left: boolean,
  right: boolean,
  selected: boolean,
  isRival = false
) => {
  return (
    <Unit
      key={index}
      left={left}
      right={right}
      selected={selected}
      isRival={isRival}
    />
  );
};

export const getUserAlias = (
  displayName: string | null | undefined
): string => {
  const displayNameAsArr =
    displayName?.split(" ").filter((value) => !!value) || [];

  if (!displayNameAsArr.length) return "U";

  let userAlias = "";

  for (let i = 0; i < 2; i += 1) {
    if (displayNameAsArr[i]) userAlias += displayNameAsArr[i][0].toUpperCase();
  }

  return userAlias;
};

export const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T,>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) => {
  if (!array) return;
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const tryReconnect = (
  event: CloseEvent,
  host: string,
  setAlert: SetAlertType,
  dispatch: Dispatch<ActionType>
) => {
  if (event.code !== 1000) {
    setAlert({
      show: true,
      severity: "error",
      message: "Trying to reconnect, wait...",
    });
    if (!navigator.onLine)
      setAlert({
        show: true,
        severity: "error",
        message:
          "You are offline. Please connect to the Internet and try again.",
      });

    setTimeout(() => API.initialize(host, setAlert, dispatch), 4000);
  }
};

const always2Digits = (num: number) => {
  return num < 10 ? "0" + num : num + "";
};

const getDayAndMonth = (date: Date) => {
  return `${always2Digits(date.getDate())} ${MONTHS[date.getMonth()]}`;
};

export const convertDateToString = (date: any) => {
  const dateCreated = new Date(date);
  const now = new Date();
  const nextDay = new Date(dateCreated);
  nextDay.setDate(dateCreated.getDate() + 1);

  const dateDiff = +now - +dateCreated;

  const isSameDay =
    "" + now.getFullYear() + now.getDate() + now.getDay() ===
    "" +
      dateCreated.getFullYear() +
      dateCreated.getDate() +
      dateCreated.getDay();
  const isSameYear = now.getFullYear() === dateCreated.getFullYear();
  const isYesterday =
    "" + now.getFullYear() + now.getDate() + now.getDay() ===
    "" + nextDay.getFullYear() + nextDay.getDate() + nextDay.getDay();

  if (dateDiff < 30000) return "Just now";
  if (dateDiff < 300000) return "Recently";
  if (isSameDay)
    return `${always2Digits(dateCreated.getHours())}:${always2Digits(
      dateCreated.getMinutes()
    )}`;
  if (isYesterday) return "Yesterday";
  if (isSameYear) return getDayAndMonth(dateCreated);
  return `${getDayAndMonth(dateCreated)} ${dateCreated.getFullYear()}`;
};

export const checkIfSearchIsActive = (
  gameRequests: Array<GameRequestState>,
  user: any
) => {
  const activeUsersGameRequestUid = gameRequests.map(
    (gameRequest) => gameRequest.uid
  );
  return activeUsersGameRequestUid.includes(user!.uid);
};

export const useGameData = () => {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const ref = doc(firestore, "games", user?.uid!);
  return useFirestoreDocData(ref);
};

export const handleScroll = (element: HTMLDivElement) => {
  if (!element) return;
  element.scroll({
    top: element.scrollHeight,
    behavior: "smooth",
  });
};

export const getBoardCoordinates = (index: number) => {
  const x = index % 10;
  const y = Math.floor(index / 10);
  return [x, y];
};

export const getBoardIndex = ([x, y]: Array<number>) => {
  return y * 10 + x;
};

export const markAllSquaresAroundBattleshipOnBoard = ({
  battleshipIndexes,
  boundaryMark,
  battleshipMark,
  board,
}: {
  battleshipIndexes: Array<number>;
  boundaryMark: SquareState;
  board: Array<SquareState>;
  battleshipMark: SquareState;
}) => {
  battleshipIndexes.forEach((index) => {
    const [x, y] = getBoardCoordinates(index);
    const minBorderX = x - 1 >= 0 ? x - 1 : 0;
    const maxBorderX = x + 1 <= AXIS_LENGTH ? x + 1 : AXIS_LENGTH;
    const minBorderY = y - 1 >= 0 ? y - 1 : 0;
    const maxBorderY = y + 1 <= AXIS_LENGTH ? y + 1 : AXIS_LENGTH;

    for (let i = minBorderX; i <= maxBorderX; i++) {
      for (let j = minBorderY; j <= maxBorderY; j++) {
        const borderIndex = getBoardIndex([i, j]);
        board[borderIndex] = boundaryMark;
      }
    }
  });

  battleshipIndexes.forEach((index) => (board[index] = battleshipMark));
};

export const useRivalGameState = (uid: string) => {
  const firestore = useFirestore();
  const rivalRef = doc(firestore, `games/${uid}`);

  return useFirestoreDocData(rivalRef);
};

export const playAudio = async (audioLink: string) => {
  const audio = new Audio(audioLink);
  return await audio.play();
};
