import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { InGameMessageProps } from "./InGameMessageProps";

export const InGameMessage: React.FC<InGameMessageProps> = ({ message }) => {
  return (
    <Paper
      sx={{
        p: 1,
      }}
    >
      <Typography
        sx={{
          overflowWrap: "break-word",
          maxWidth: (theme) => theme.spacing(30),
        }}
        gutterBottom
        variant="body1"
      >
        {message?.text}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Typography
          sx={{ fontStyle: "italic" }}
          variant="caption"
        >
          {message?.name}
        </Typography>
      </Box>
    </Paper>
  );
};
