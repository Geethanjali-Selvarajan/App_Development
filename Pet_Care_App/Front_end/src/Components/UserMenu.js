import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, IconButton, Popover, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const UserMenu = () => { 
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton
        color="inherit"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 9 }}>
          <Typography variant="subtitle1">{user.name }</Typography>
          <Typography variant="body2">{user.email }</Typography>
          <Button onClick={logout} sx={{ mt: 1 }} color="secondary" variant="contained">
            Logout
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default UserMenu;
