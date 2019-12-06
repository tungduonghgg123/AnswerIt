import React from 'react';
import {AppBar, Toolbar, Typography, Button, IconButton, MenuIcon} from '@material-ui/core';
import { color } from '../styles/index'

 function Header() {

  return (
    <div >
      <AppBar position="static" style={{ background: color.secondary }}>
        <Toolbar style={{justifyContent: "space-between"}}>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography style={{color: "black"}}>
            Answerit
          </Typography>
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export {Header}
