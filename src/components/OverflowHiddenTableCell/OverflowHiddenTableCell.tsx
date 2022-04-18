import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";

export const OverflowHiddenTableCell = styled(TableCell)(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: theme.spacing(1),
}));
