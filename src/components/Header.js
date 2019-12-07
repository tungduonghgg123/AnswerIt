import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, MenuIcon, List } from '@material-ui/core';
import { Avatar, Dialog, ListItemAvatar, ListItem, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import images from '../assets/images'
import { color } from '../styles/index'
import { connect } from 'react-redux';
import * as actions from '../redux/actions'
import { getBalance } from '../web3/index'
import {account2Index} from '../redux/reducers/accountReducer'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false, 
      balance: 0
    }
  }
  async changeAccount(index) {
    await this.props.setAccount(index)
    this.fetchBalance()
  }
  async fetchBalance() {
    const balance = await getBalance(this.props.account)
    this.setState({balance})
  }
  renderAccount() {
    return images.map((image, i) => {
      return (
        <ListItemAvatar key={i}>
          <Avatar alt="Remy Sharp" src={image} onClick={() => this.changeAccount(i)} />
        </ListItemAvatar>
      )
    })
  }
  setShowDialog(bool) {
    this.setState({
      showDialog: bool
    })
  }
  componentDidMount() {
    this.fetchBalance()
    // subcrible when balance change
  }
  render() {
  
    return (
      <div >
        <AppBar position="static" style={{ background: color.secondary }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography style={{ color: "black" }}>
              Answerit
            </Typography>
            <Typography style={{ color: "black" }}>
              {this.state.balance} Tea
            </Typography>
            {/* <Button onClick={() => this.setShowDialog(true)}>Login</Button> */}
            <Avatar alt="Remy Sharp" src={images[account2Index(this.props.account)]} onClick={() => this.setShowDialog(true)} />
            <Dialog open={this.state.showDialog} maxWidth="sm" fullWidth onClose={() => this.setShowDialog(false)}>
              <DialogTitle id="form-dialog-title">Select Account</DialogTitle>
              <List style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around'}} onClick={() => {}}>
                {this.renderAccount()}
              </List>
            </Dialog>
          </Toolbar>
        </AppBar>
      </div>
    );

  }
}
const mapStateToProps = state => ({
  account: state.setAccountReducer,

});
export default connect(mapStateToProps, actions)(Header)

