import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { signOut, getAuth } from "firebase/auth";
import { useUser } from "reactfire";
import jwtDecode from "jwt-decode";
import {
  AppBar,
  Avatar,
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
import { HOST } from "../../constants";
import { Profile } from "../Profile";
import { ThemeToggle } from "../ThemeToggle";

export const AppHeader = () => {
  const { data: user } = useUser();
  const { dispatch } = useStore();
  const userAlias = getUserAlias(user?.displayName);
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const { setAlert } = useContext(UIContext);
  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => setShowProfile(true);

  const handleSetUserToken = useCallback(() => {
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
        API.initialize(HOST, setAlert, dispatch);
      })
      .catch((error) =>
        setAlert({
          show: true,
          severity: "error",
          message: error.message,
        })
      );
  }, [setAlert, dispatch, user]);

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
      window.location.assign(window.location.pathname);
    } catch (error) {
      setAlert({
        show: true,
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Profile show={showProfile} setShow={setShowProfile} />
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
          <ThemeToggle />
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar src={user?.photoURL || ""}>
                {userAlias.toUpperCase()}
              </Avatar>
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
              <MenuItem onClick={handleShowProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
