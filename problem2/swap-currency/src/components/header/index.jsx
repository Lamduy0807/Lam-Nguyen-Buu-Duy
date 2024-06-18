import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Tittle from "../Title";

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Tittle main="swap" highlight="currency" behind="99 TECH" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
