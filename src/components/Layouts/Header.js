import React from 'react';
import { Avatar, AppBar, Toolbar, Typography } from '@material-ui/core';
import { color } from '../../styles/index'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import PasswordPrompt from './PasswordPrompt'
import { getTagsInfo, getAlias, logout } from '../../helper/account'
import UserInfo from '../Elements/UserInfo'
import { MyButton } from '../Elements/Button'
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false,
      balance: 0,
      username: '',
      displayName: '',
      firstName: '',
      lastName: ''
    }
  }
  renderAccount() {
    {/* <List style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }} onClick={() => { }}>
                {this.renderAccount()}
              </List> */}

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
    getTagsInfo(this.props.address).then((tag) => {
      this.setState({
        displayName: tag['display-name'] ? tag['display-name'] : 'null',
        firstName: tag.firstname,
        lastName: tag.lastname
      })
      this.props.setAccount({
        ...this.props.account,
        displayName: this.state.displayName
      })


    })
    getAlias(this.props.address).then((alias) => {
      this.setState({
        username: alias
      })
    })

  }
  render() {
    const { needAuth } = this.props
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
            <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
              <Typography style={{ ...styles.text, marginRight: '10px' }}>
                {this.state.displayName}
              </Typography>
              <Avatar alt="Remy Sharp" onClick={() => this.setShowDialog(true)} />
            </div>
            <MyButton onClick={() => {
              logout()
              this.props.logout()
            }}>
              Logout
            </MyButton>
            <UserInfo
              username={this.state.username}
              firstname={this.state.firstName}
              lastname={this.state.lastName}
              balance={this.state.balance}
              address={this.props.address}
              showDialog={this.state.showDialog}
              setShowDialog={this.setShowDialog.bind(this)}
            />
          </Toolbar>
        </AppBar>
        {needAuth && <PasswordPrompt />}
      </div>
    );

  }
}
const mapStateToProps = state => ({
  address: state.account.address,
  account: state.account,
  needAuth: state.account.needAuth,
});
const styles = {
  text: {
    color: color.primary
  }
}
export default connect(mapStateToProps, actions)(Header)

