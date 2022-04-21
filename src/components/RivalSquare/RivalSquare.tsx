import React, { useContext } from "react";
import { useFirestore, useUser, useFirestoreDocData } from "reactfire";
import { doc, writeBatch, runTransaction } from "firebase/firestore";
import { ExplosionIcon, SquareCaption, SquareWrapper } from "../";
import { RivalSquareProps } from "./RivalSquareProps";
import {
  ALPHABET,
  markAllSquaresAroundBattleshipOnBoard,
  useGameData,
} from "../../utils";
import { UIContext, useStore } from "../../context";
import { Typography } from "@mui/material";
import { SquareState } from "../../store/state";
import { playAudio } from "../../utils";

const audio = require("../../sounds/explosion.wav");

export const RivalSquare: React.FC<RivalSquareProps> = ({ index }) => {
  const firestore = useFirestore();
  const { setAlert } = useContext(UIContext);
  const {
    data: { client, host, isMoving, isEditable, rivalName },
  } = useGameData();
  const { data: player } = useUser()!;
  const {
    state: {
      game: { serverTime },
    },
  } = useStore();

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
  const destroyedBattleships =
    rivalGameState?.destroyedBattleships as Array<number>;

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
          lastMoveTime: serverTime,
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

              const battleshipIndex = rivalBattleshipState.length - 1;
              const sameDestroyedBattleshipsCount =
                destroyedBattleships[battleshipIndex] || 0;

              destroyedBattleships[battleshipIndex] =
                sameDestroyedBattleshipsCount + 1;

              setAlert({
                show: true,
                severity: "success",
                message: "Rival's battleship was destroyed!",
              });
            }
          }
        });

        playAudio(audio).catch((error) =>
          setAlert({
            show: true,
            severity: "error",
            message: error.message,
          })
        );

        const isWinner = !rivalBoard.includes("occupied");
        if (!isWinner) {
          const batch = writeBatch(firestore);

          batch.update(rivalRef, {
            gameBoard: rivalBoard,
            destroyedBattleships,
          });
          batch.update(playerRef, { lastMoveTime: serverTime });

          await batch.commit();
          return;
        }

        await runTransaction(firestore, async (transaction) => {
          const rivalStatisticRef = doc(firestore, `statistic/${rivalUid}`);
          const playerStatisticRef = doc(firestore, `statistic/${playerUid}`);

          const rivalStatistic = await transaction.get(rivalStatisticRef);
          const playerStatistic = await transaction.get(playerStatisticRef);
          const rivalStatisticData = rivalStatistic.data();
          const playerStatisticData = playerStatistic.data();

          transaction.update(rivalStatisticRef, {
            gamesPlayed: (rivalStatisticData?.gamesPlayed || 0) + 1,
            name: rivalName,
          });

          transaction.update(playerStatisticRef, {
            gamesPlayed: (playerStatisticData?.gamesPlayed || 0) + 1,
            wins: (playerStatisticData?.wins || 0) + 1,
            name: player?.displayName,
          });

          transaction.update(rivalRef, {
            gameBoard: rivalBoard,
            winner: playerUid,
          });
          transaction.update(playerRef, { winner: playerUid });
        });
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
        <Typography sx={{ fontSize: (theme) => theme.spacing(3) }}>
          •
        </Typography>
      )}
      {isHit && <ExplosionIcon />}
    </SquareWrapper>
  );
};
