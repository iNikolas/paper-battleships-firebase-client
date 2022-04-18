import { Box, styled } from "@mui/material";

export const MainScreenWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  height: `calc(100vh - ${theme.spacing(7)})`,
  position: "relative",
  "@media screen and (orientation: landscape)": {
    height: `calc(100vh - ${theme.spacing(8)})`,
  },
}));
