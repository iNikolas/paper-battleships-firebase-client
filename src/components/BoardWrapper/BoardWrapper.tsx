import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import boardSkinImage from "../../images/boardSkin.jpg";

export const BoardWrapper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isRival",
})<{ isRival?: boolean }>(({ theme, isRival }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(4),
  width: isRival ? "60vw" : "65vw",
  height: isRival ? "60vw" : "65vw",
  display: "flex",
  position: "relative",
  flexWrap: "wrap",
  "&::before": {
    content: '" "',
    display: "block",
    position: "absolute",
    left: 0,
    top: 0,
    width: isRival ? "60vw" : "65vw",
    height: isRival ? "60vw" : "65vw",
    opacity: 0.08,
    backgroundImage: `url(${boardSkinImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  "@media screen and (orientation: landscape)": {
    width: isRival ? "25vw" : "30vw",
    height: isRival ? "25vw" : "30vw",
    "&::before": {
      width: isRival ? "25vw" : "30vw",
      height: isRival ? "25vw" : "30vw",
    },
  },
}));
