import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { InGameMessageProps } from "./InGameMessageProps";

export const InGameMessage: React.FC<InGameMessageProps> = ({ message }) => {
  return (
    <Paper
      sx={{
        p: 1,
        borderBottom: (theme) => `1px solid ${theme.palette.grey.A100}`,
        backgroundColor: (theme) => theme.palette.common.white,
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
          color="text.secondary"
        >
          {message?.name}
        </Typography>
      </Box>
    </Paper>
  );
};
