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
import { Navigation } from "../Navigation";
import { NAV_LINKS } from "../../app/router/routes";

export const AppHeader = () => {
  const { data: user } = useUser();
  const { dispatch } = useStore();
  const userAlias = getUserAlias(user?.displayName);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const { setAlert } = useContext(UIContext);

  const handleSetUserToken = useMemo(() => {
    const timer = timerRef.current;
    if (timer) clearTimeout(timer);
    user
      ?.getIdToken()
      .then((token) => {
        API.token = token;

        const { exp } = jwtDecode(token) as { exp: number };
        const validTimeMs = exp * 1000 - Date.now();

        timerRef.current = setTimeout(
          () => handleSetUserToken(),
          validTimeMs - 5 * 60 * 1000
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

  useEffect(handleSetUserToken, [user, handleSetUserToken]);

  useEffect(() => {
    user
      ?.getIdToken()
      .then((token) => {
        API.token = token;
        API.initialize(
          "paper-battleships-game-server.herokuapp.com",
          setAlert,
          dispatch
        );
      })
      .catch((error) =>
        setAlert({
          show: true,
          severity: "error",
          message: error.message,
        })
      );
  }, [setAlert, dispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorNavEl, setAnchorNavEl] = React.useState<null | HTMLElement>(
    null
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleNavbar = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorNavEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const handleCloseNavbar = () => setAnchorNavEl(null);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      window.location.assign("/");
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
        <Box>
          <IconButton
            onClick={handleNavbar}
            aria-label="navbar"
            aria-controls="menu"
            aria-haspopup="true"
            size="large"
            edge="start"
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorNavEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorNavEl)}
            onClose={handleCloseNavbar}
            onClick={handleCloseNavbar}
          >
            <Navigation links={NAV_LINKS} />
          </Menu>
        </Box>
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
