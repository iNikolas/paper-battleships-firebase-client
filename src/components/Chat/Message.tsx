import React, { useEffect } from "react";
import { useUser } from "reactfire";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { MessageProps } from "./types";
import { convertDateToString } from "../../utils";
import API from "../../api";
import { useStore } from "../../context";

export const Message: React.FC<MessageProps> = ({
  message: { text, name, timestamp, imageUrl, uid },
}) => {
  const { data: user } = useUser();
  const {
    state: {
      lobby: { avatars },
    },
  } = useStore();

  const userAvatar = avatars[uid];

  useEffect(() => {
    if (userAvatar === undefined && uid)
      API.doSend({ type: "get-user-photo-url", authorUid: uid });
  }, [userAvatar, uid]);
  return (
    <Box
      sx={{
        p: 1,
        borderBottom: (theme) => `1px solid ${theme.palette.grey.A100}`,
      }}
    >
      {imageUrl && (
        <Paper
          variant="outlined"
          component="img"
          sx={{
            maxWidth: "75%",
            maxHeight: (theme) => theme.spacing(100),
            overflow: "hidden",
          }}
          alt={`${name}'s media content`}
          src={imageUrl}
        />
      )}
      <Box>
        <Box sx={{ display: "flex" }}>
          {!imageUrl && <Avatar sx={{ m: 1 }} src={userAvatar || ""} />}
          <Typography
            sx={{
              overflowWrap: "break-word",
              overflow: "hidden",
            }}
            gutterBottom
            variant="body1"
          >
            {text}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ fontStyle: "italic" }}
            variant="caption"
            color="text.secondary"
          >
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {convertDateToString(
              timestamp
                ? new Date(timestamp.seconds * 1000).toString()
                : new Date().toString()
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
