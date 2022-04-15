import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { AppHeader } from "../";
import { MainScreenWrapper } from "../MainScreenWrapper";

export const AuthenticatedLayout = () => {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <AppHeader />
      <MainScreenWrapper>
        <Outlet />
      </MainScreenWrapper>
    </Box>
  );
};
