import React, { useContext, useEffect, useRef, useState } from "react";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { doc } from "firebase/firestore";
import { playAudio, useGameData } from "../../utils";
import { InGameMessage } from "./";
import { Box } from "@mui/material";
import { UIContext } from "../../context";

const notification = require("../../sounds/notification.mp3");

export const InGameMessageWindow = () => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [opacity, setOpacity] = useState(1);
  const { setAlert } = useContext(UIContext);
  const firestore = useFirestore();
  const { data: user } = useUser();
  const { data: playerGameState } = useGameData();
  const docRef = doc(firestore, `games/${playerGameState.host || user?.uid}`);
  const timer = useRef<NodeJS.Timeout>();
  const auxTimer = useRef<NodeJS.Timeout>();

  const { data } = useFirestoreDocData(docRef);
  const message = data?.message?.text;
  const author = data?.message?.name;

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (auxTimer.current) clearTimeout(auxTimer.current);

    const updatedMessages = [...messages, data?.message];
    if (updatedMessages.length)
      playAudio(notification).catch((error) => console.log(error.message));

    if (message)
      if (updatedMessages.length > 4) {
        updatedMessages.splice(0, updatedMessages.length - 4);
      }

    setMessages(updatedMessages);

    timer.current = setTimeout(() => setMessages([]), 7000);
    auxTimer.current = setTimeout(() => setOpacity(0), 5000);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (auxTimer.current) clearTimeout(auxTimer.current);
    };
  }, [message, author]);

  useEffect(() => {
    setOpacity(1);
  }, [messages]);

  return (
    <Box
      sx={{
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
        left: (theme) => theme.spacing(4),
        transition: (theme) => theme.transitions.create("opacity"),
      }}
    >
      {messages.map((message, index) => (
        <InGameMessage key={index} message={message} />
      ))}
    </Box>
  );
};
