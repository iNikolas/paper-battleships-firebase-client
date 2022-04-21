import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const GamePanelWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  "@media screen and (orientation: landscape)": {
    marginLeft: theme.spacing(13),
  },
}));
