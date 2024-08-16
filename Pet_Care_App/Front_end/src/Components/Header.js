import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from './AuthContext';
import '../styles/Header.css';
import UserMenu from './UserMenu'; // Import UserMenu component

const Header = () => {
  const { isAuthenticated, user = {}, logout } = useContext(AuthContext); // Add default value for user
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, my: 3 }}>
        PetHaven
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <a href="#about">About Us</a>
        </li>
        <li>
          <NavLink to="/service">Our service</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        {isAuthenticated ? (
          <li>
            <UserMenu user={user} logout={logout} />
          </li>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" sx={{ bgcolor: "purple", color: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0, color: "white" }}
          >
            PetHaven
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block", flexGrow: 1 } }}>
            <ul className="navigation-menu">
              <li>
                <NavLink to="/" activeClassName="active">
                  Home
                </NavLink>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <NavLink to="/service">Our service</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {isAuthenticated ? (
                <li>
                  <UserMenu user={user} logout={logout} />
                </li>
              ) : (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box>
        <Toolbar />
      </Box>
    </>
  );
};

export default Header;
