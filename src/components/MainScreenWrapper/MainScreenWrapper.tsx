import { Box, styled } from "@mui/material";

export const MainScreenWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "left",
  height: `calc(100vh - ${theme.spacing(7)})`,
  position: "relative",
}));
