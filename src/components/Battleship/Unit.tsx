import React from "react";
import { Box } from "@mui/material";
import { UnitProps } from "./types";

export const Unit: React.FC<UnitProps> = ({
  right,
  left,
  selected,
  isRival,
}) => {
  return (
    <Box
      sx={{
        width: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 4.5)`,
        height: (theme) => `calc((35vw - ${theme.spacing(10)} - 1px) / 4.5)`,
        backgroundColor: selected ? "primary.main" : "grey.300",
        borderBottom: (theme) => `1px solid ${theme.palette.grey["900"]}`,
        borderTop: (theme) => `1px solid ${theme.palette.grey["900"]}`,
        borderLeft: (theme) =>
          left ? `1px solid ${theme.palette.grey["900"]}` : "",
        borderRight: (theme) =>
          right
            ? `1px solid ${theme.palette.grey["900"]}`
            : `1px solid ${theme.palette.grey.A400}`,
        borderBottomLeftRadius: left ? "40%" : 0,
        borderTopLeftRadius: left ? "40%" : 0,
        borderBottomRightRadius: right ? "40%" : 0,
        borderTopRightRadius: right ? "40%" : 0,
        boxShadow: selected ? (theme) => theme.shadows[2] : "",
        cursor: isRival ? "cursor" : "pointer",
        "@media screen and (orientation: landscape)": {
          width: (theme) => theme.spacing(3),
          height: (theme) => theme.spacing(3),
        },
      }}
    />
  );
};
