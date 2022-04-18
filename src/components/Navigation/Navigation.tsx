import React from "react";
import { NavigationProps } from "./";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export const Navigation: React.FC<NavigationProps> = ({ links }) => {
  return (
    <>
      {links.map(({ to, text }, index) => (
        <MenuItem key={index} component={Link} to={to}>
          {text}
        </MenuItem>
      ))}
    </>
  );
};
