import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useUser } from "reactfire";
import App from "../App";
import { LoginScreen, RegisterScreen, Game, Ranking } from "../pages";
import { Lobby } from "../pages/Lobby";

export const AppRouter = () => {
  const { data: user, firstValuePromise } = useUser();
  const isLogged = !!user;

  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  if (!isUserLoaded) {
    return null;
  }

  if (isLogged) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Lobby />} />
            <Route path="game" element={<Game />} />
            <Route path="login" element={<Navigate replace to="/" />} />
            <Route path="register" element={<Navigate replace to="/" />} />
            <Route path="ranking" element={<Ranking />} />
            <Route
              path="*"
              element={<Navigate replace to="game" />}
            />
          </Route>
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate replace to="login" />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="*" element={<Navigate replace to="login" />} />
        </Route>
      </Routes>
    </Router>
  );
};
