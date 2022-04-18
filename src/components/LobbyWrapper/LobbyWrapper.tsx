import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const LobbyWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: theme.spacing(1),
  width: "100%",
  "@media screen and (orientation: landscape)": {
    width: "60%",
  },
}));
