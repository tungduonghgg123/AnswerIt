import React from 'react';
import { AppBar, Toolbar, Typography, List } from '@material-ui/core';
import { Avatar, Dialog, DialogTitle } from '@material-ui/core';
// import images from '../../assets/images'
import { color } from '../../styles/index'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import { getBalance, balanceChangeEvent, sendRewardEvent } from '../../web3/index'
import PasswordPrompt from './PasswordPrompt'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false, 
      balance: 0
    }
  }
  async changeAccount(index) {
    await this.props.setAccount123(index)
    this.fetchBalance()
  }
  async fetchBalance() {
    const balance = await getBalance(this.props.address)
    this.setState({balance})
  }
  renderAccount() {
    // return images.map((image, i) => {
    //   return (
    //     <ListItemAvatar key={i}>
    //       <Avatar alt="Remy Sharp" src={image} onClick={() => {
    //         this.changeAccount(i)
    //         this.setShowDialog(false)
    //         }} />
    //     </ListItemAvatar>
    //   )
    // })
  }
  setShowDialog(bool) {
    this.setState({
      showDialog: bool
    })
  }
  componentDidMount() {
    this.fetchBalance()
    // subcribe when balance change
    balanceChangeEvent(this.props.address, () => this.fetchBalance()) 
    sendRewardEvent(() => {
      this.fetchBalance() 
      this.props.sendRewardEventHandler()
    })
  }
  render() {
    const {needAuth} = this.props
    return (
      <div >
        <AppBar position="static" style={{ background: color.secondary }}>
          <Toolbar style={{ justifyContent: "space-between" }}>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography style={styles.text}>
              ANSWERIT
            </Typography>
            <Typography style={styles.text}>
              {this.state.balance} Tea
            </Typography>
            {/* <Button onClick={() => this.setShowDialog(true)}>Login</Button> */}
            <Avatar alt="Remy Sharp"  onClick={() => this.setShowDialog(true)} />
            <Dialog open={this.state.showDialog} maxWidth="sm" fullWidth onClose={() => this.setShowDialog(false)}>
              <DialogTitle id="form-dialog-title">Your Account</DialogTitle>
              <List style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-around'}} onClick={() => {}}>
                {this.renderAccount()}
              </List>
            </Dialog>
          </Toolbar>
        </AppBar>
        {needAuth && <PasswordPrompt />}
      </div>
    );

  }
}
const mapStateToProps = state => ({
  address: state.account.address,
  needAuth: state.account.needAuth,
});
const styles = {
  text: {
    color: color.primary
  }
}
export default connect(mapStateToProps, actions)(Header)

