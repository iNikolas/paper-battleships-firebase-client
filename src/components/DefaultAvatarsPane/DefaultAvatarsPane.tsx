import React from "react";
import { Box } from "@mui/material";
import { DEFAULT_AVATARS } from "../../constants";
import { AvatarContainer } from "./AvatarContainer";
import { DefaultAvatarsPaneProps } from "./types";

export const DefaultAvatarsPane: React.FC<DefaultAvatarsPaneProps> = ({
  setDefaultAvatar,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "right",
        gap: 1,
        maxWidth: (theme) => theme.spacing(22),
      }}
    >
      {DEFAULT_AVATARS.map((avatar, index) => (
        <AvatarContainer
          setDefaultAvatar={setDefaultAvatar}
          key={index}
          img={avatar}
        />
      ))}
    </Box>
  );
};
