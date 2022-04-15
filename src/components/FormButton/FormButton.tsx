import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const FormButton = styled(Button)(({ theme }) => ({
  height: theme.spacing(6),
  fontSize: theme.spacing(2),
  color: theme.palette.common.white,
}));
