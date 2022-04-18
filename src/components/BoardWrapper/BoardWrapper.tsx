import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const BoardWrapper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(4),
  width: "65vw",
  height: "65vw",
  display: "flex",
  flexWrap: "wrap",
  "@media screen and (orientation: landscape)": {
    width: "35vw",
    height: "35vw",
  },
}));
