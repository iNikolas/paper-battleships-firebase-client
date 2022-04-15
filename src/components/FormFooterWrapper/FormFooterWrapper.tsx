import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FormFooterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
}));
