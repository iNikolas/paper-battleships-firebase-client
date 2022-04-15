import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const GamePanelTypography = styled(Typography)(({ theme }) => ({
  fontSize: `calc((35vw - ${theme.spacing(10)} - 1px) / 6)`,
  width: "100%",
}));
