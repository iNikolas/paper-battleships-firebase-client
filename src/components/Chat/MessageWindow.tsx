import React, { useEffect, useRef } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, query, orderBy, limit } from "firebase/firestore";
import useMeasure from "react-use-measure";
import { Box } from "@mui/material";
import { Message } from "./";
import { handleScroll } from "../../utils";

export const MessageWindow = () => {
  const firestore = useFirestore();
  const messagesCollection = collection(firestore, "messages");
  const messagesQuery = query(
    messagesCollection,
    orderBy("timestamp"),
    limit(50)
  );
  const viewStub = useRef<HTMLDivElement>(null);
  const [ref, { width, height }] = useMeasure();

  const { data: messages } = useFirestoreCollectionData(messagesQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (viewStub.current) handleScroll(viewStub.current);
  }, [messages]);
  return (
    <Box
      ref={ref}
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        ref={viewStub}
        sx={{
          position: "absolute",
          width,
          height: (theme) => height - parseInt(theme.spacing(1)),
          overflowY: "auto",
        }}
      >
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
    </Box>
  );
};
