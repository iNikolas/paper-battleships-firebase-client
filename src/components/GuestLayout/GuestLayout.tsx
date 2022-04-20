import React from "react";
import { Grid } from "@mui/material";
import posterImg from "../../images/uk_post-1.webp";
import { Outlet } from "react-router-dom";

export const GuestLayout = () => {
  return (
    <Grid sx={{ width: "100vw", height: "100vh" }} container>
      <Grid
        sx={{
          height: "100%",
          backgroundImage: `url(${posterImg})`,
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          "@media screen and (orientation: portrait)": {
            display: "none",
          },
        }}
        item
        xs={6}
      />
      <Grid
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        item
        xs
      >
        <Outlet />
      </Grid>
    </Grid>
  );
};
