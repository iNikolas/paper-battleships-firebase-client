import React, { useContext } from "react";
import { useFirestore, useUser, useFirestoreDocData } from "reactfire";
import { doc, writeBatch } from "firebase/firestore";
import { ExplosionIcon, SquareCaption, SquareWrapper } from "../";
import { RivalSquareProps } from "./RivalSquareProps";
import {
  ALPHABET,
  markAllSquaresAroundBattleshipOnBoard,
  useGameData,
} from "../../utils";
import { UIContext } from "../../context";
import { Typography } from "@mui/material";
import { SquareState } from "../../store/state";

export const RivalSquare: React.FC<RivalSquareProps> = ({ index }) => {
  const firestore = useFirestore();
  const { setAlert } = useContext(UIContext);
  const {
    data: { client, host, isMoving, isEditable },
  } = useGameData();
  const { data: player } = useUser()!;

  const rivalUid = client || host;
  const playerUid = player?.uid;
  const rivalRef = doc(firestore, `games/${rivalUid}`);
  const playerRef = doc(firestore, `games/${playerUid}`);

  const { data: rivalGameState } = useFirestoreDocData(rivalRef);
  const squareState = rivalGameState?.gameBoard?.[index];
  const isRivalReady = !rivalGameState?.isEditable;
  const isPlayerReady = !isEditable;
  const rivalBattleshipsIndexes =
    rivalGameState?.battleshipIndexes as Array<string>;

  const isMiss = squareState === "miss";
  const isHit = squareState === "hit";

  const handleClick = async () => {
    if (!isRivalReady || !isPlayerReady || !isMoving) return;
    if (squareState === "hit" || squareState === "miss") return;
    const rivalBoard = rivalGameState.gameBoard as Array<SquareState>;
    if (squareState == null || squareState === "border") {
      rivalBoard[index] = "miss";

      try {
        const batch = writeBatch(firestore);

        batch.update(playerRef, { isMoving: false });
        batch.update(rivalRef, {
          gameBoard: rivalBoard,
          isMoving: true,
          lastMoveTime: Date.now(),
        });

        await batch.commit();
      } catch (error) {
        setAlert({
          show: true,
          severity: "error",
          message: error.message,
        });
      }
    }
    if (squareState === "occupied") {
      rivalBoard[index] = "hit";
      try {
        rivalBattleshipsIndexes.forEach((battleshipIndexes) => {
          const currentIndexes = battleshipIndexes
            .split(",")
            .map((index) => +index);

          if (currentIndexes.includes(index)) {
            const rivalBattleshipState = currentIndexes.map(
              (index) => rivalGameState.gameBoard[index] as SquareState
            );
            if (
              rivalBattleshipState.every((unitState) => unitState === "hit")
            ) {
              markAllSquaresAroundBattleshipOnBoard({
                battleshipIndexes: currentIndexes,
                boundaryMark: "miss",
                battleshipMark: "hit",
                board: rivalBoard,
              });

              setAlert({
                show: true,
                severity: "success",
                message: "Rival's battleship was destroyed!",
              });
            }
          }
        });

        const isWinner = !rivalBoard.includes("occupied");
        if (!isWinner) {
          const batch = writeBatch(firestore);

          batch.update(rivalRef, { gameBoard: rivalBoard });
          batch.update(playerRef, { lastMoveTime: Date.now() });

          await batch.commit();
          return;
        }

        const batch = writeBatch(firestore);
        batch.update(rivalRef, {
          gameBoard: rivalBoard,
          winner: playerUid,
        });
        batch.update(playerRef, { winner: playerUid });
        await batch.commit();
      } catch (error) {
        setAlert({
          show: true,
          severity: "error",
          message: error.message,
        });
      }
    }
  };

  return (
    <SquareWrapper
      onClick={handleClick}
      key={index}
      sx={{
        cursor: isHit || isMiss ? "cursor" : "pointer",
        backgroundColor: (theme) => {
          if (isHit) return theme.palette.grey.A400;
          return "";
        },
      }}
    >
      {index < 10 && <SquareCaption top>{index + 1}</SquareCaption>}
      {!(index % 10) && <SquareCaption>{ALPHABET[index / 10]}</SquareCaption>}
      {isMiss && (
        <Typography sx={{ fontSize: (theme) => theme.spacing(2) }}>
          •
        </Typography>
      )}
      {isHit && <ExplosionIcon />}
    </SquareWrapper>
  );
};
