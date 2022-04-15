import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const FormFooterTypography = styled(Typography)(({ theme }) => ({
  letterSpacing: -1.5,
  fontSize: theme.spacing(2),
}));
