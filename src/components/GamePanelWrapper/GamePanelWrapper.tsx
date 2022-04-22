import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const GamePanelWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isRival",
})<{ isRival?: boolean }>(({ theme, isRival }) => ({
  position: "relative",
  "@media screen and (orientation: landscape)": {
    marginLeft: isRival ? 0 : theme.spacing(13),
  },
}));
