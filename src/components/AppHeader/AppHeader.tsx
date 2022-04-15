import React, { useContext, useEffect, useMemo, useRef } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useUser } from "reactfire";
import jwtDecode from "jwt-decode";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UIContext, useStore } from "../../context";
import { getUserAlias } from "../../utils";
import API from "../../api";

export const AppHeader = () => {
  const { data: user } = useUser();
  const { dispatch } = useStore();
  const userAlias = getUserAlias(user?.displayName);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const { setAlert } = useContext(UIContext);

  const handleSetUserCookie = useMemo(() => {
    const timer = timerRef.current;
    if (timer) clearTimeout(timer);
    user
      ?.getIdToken()
      .then((token) => {
        document.cookie = `token=${token}`;

        const { exp } = jwtDecode(token) as { exp: number };
        const validTimeMs = exp * 1000 - Date.now();

        timerRef.current = setTimeout(
          () => handleSetUserCookie(),
          validTimeMs
        );
      })
      .catch((error) =>
        setAlert({
          show: true,
          severity: "error",
          message: error.message,
        })
      );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [user, setAlert]);

  useEffect(handleSetUserCookie, [user, handleSetUserCookie]);

  useEffect(() => {
    API.initialize("localhost:4000", setAlert, dispatch);
  }, [setAlert, dispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1 }} variant="h6" component="div">
          Paper Battleships
        </Typography>
        <Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Box
              sx={{
                borderRadius: "50%",
                width: (theme) => theme.spacing(4),
                height: (theme) => theme.spacing(4),
                backgroundColor: (theme) => theme.palette.grey["400"],
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: (theme) => theme.spacing(2),
              }}
            >
              {userAlias.toUpperCase()}
            </Box>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
