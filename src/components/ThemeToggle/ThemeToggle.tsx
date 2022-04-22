import React from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext, UIContext } from "../../context";

export const ThemeToggle = () => {
  const portrait = useMediaQuery("(orientation: portrait)");

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        p: 0,
        "@media screen and (orientation: landscape)": {
          pl: 3,
          pr: 3,
        },
      }}
    >
      {!portrait && `${theme.palette.mode} mode`}
      <IconButton
        sx={{
          "@media screen and (orientation: landscape)": {
            ml: 1,
          },
        }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
};
