import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import boardSkinImage from "../../images/boardSkin.jpg";

export const BoardWrapper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(4),
  width: "65vw",
  height: "65vw",
  display: "flex",
  flexWrap: "wrap",
  "&::before": {
    content: '" "',
    display: "block",
    position: "absolute",
    left: theme.spacing(4),
    top: 0,
    width: "65vw",
    height: "65vw",
    opacity: 0.08,
    backgroundImage: `url(${boardSkinImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  "@media screen and (orientation: landscape)": {
    width: "30vw",
    height: "30vw",
    "&::before": {
      top: theme.spacing(4),
      width: "30vw",
      height: "30vw",
    },
  },
}));
