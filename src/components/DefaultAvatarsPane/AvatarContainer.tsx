import React from "react";
import { Paper } from "@mui/material";
import { AvatarContainerProps, DefaultAvatarsPaneProps } from "./types";

export const AvatarContainer: React.FC<
  AvatarContainerProps & DefaultAvatarsPaneProps
> = ({ img, setDefaultAvatar }) => {
  const handleDefaultAvatarSet = () => setDefaultAvatar(img);

  return (
    <Paper
      onClick={handleDefaultAvatarSet}
      sx={{
        width: "40%",
        cursor: "pointer",
        boxShadow: (theme) => theme.shadows[6],
        "&:hover": {
          boxShadow: (theme) => theme.shadows[2],
        },
      }}
      component="img"
      alt="default avatar"
      src={img}
    />
  );
};
