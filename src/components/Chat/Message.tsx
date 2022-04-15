import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { MessageProps } from "./types";
import { convertDateToString } from "../../utils";

export const Message: React.FC<MessageProps> = ({
  message: { text, name, timestamp, imageUrl },
}) => {
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
      <Typography
        sx={{ overflowWrap: "break-word" }}
        gutterBottom
        variant="body1"
      >
        {text}
      </Typography>
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
  );
};
