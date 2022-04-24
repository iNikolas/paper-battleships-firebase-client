import React from "react";

export interface AvatarContainerProps {
  img: string;
}

export interface DefaultAvatarsPaneProps {
  setDefaultAvatar: React.Dispatch<React.SetStateAction<string>>;
}
