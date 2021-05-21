import React from "react";
import { AppBar, IconButton, Box, Button, makeStyles } from "@material-ui/core";
import { NavLink as RouterLink } from "react-router-dom";
import { ReactComponent as LogoGDC } from "../../assets/icon/gdc-logo.svg";

const menus = [
  {
    menu: "Help",
    to: "/help",
  },
  {
    menu: "Login",
    to: "/login",
  },
];
const useStyles = makeStyles({
  button: {
    fontSize: 16,
    textTransform: "none",
  },
});
export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px={8}
      >
        <IconButton
          width="40%"
          height="40%"
          edge="start"
          color="inherit"
          aria-label="menu"
          component={RouterLink}
          to="/"
        >
          <LogoGDC />
        </IconButton>
        <Box display="flex" flexDirection="row">
          {menus.map((menu, index) => (
            <Box key={index}>
              <Button
                component={RouterLink}
                color="inherit"
                className={classes.button}
                to={menu.to}
              >
                {menu.menu}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
}
