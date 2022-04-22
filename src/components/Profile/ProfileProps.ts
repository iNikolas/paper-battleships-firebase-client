import React from "react";

export interface ProfileProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
