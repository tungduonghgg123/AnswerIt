import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'

function UserInfo(props) {
    const {username, firstname, lastname, balance, address, showDialog, setShowDialog, currentUserAddress} = props
    console.log(address, currentUserAddress)

    return (
        <Dialog open={showDialog} maxWidth="sm" fullWidth onClose={() => setShowDialog(false)}>
              <DialogTitle id="form-dialog-title">
              {address === currentUserAddress ?'Your account' : `${username}'s account`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Username: {username}
                </DialogContentText>
                <DialogContentText>
                  First name: {firstname}
                </DialogContentText>
                <DialogContentText>
                  Last name: {lastname}
                </DialogContentText>
                <DialogContentText>
                  Balance: {balance} TEA
                </DialogContentText>
                <DialogContentText>
                  Address: {address}
                </DialogContentText>
              </DialogContent>
            </Dialog>
    )
}
const mapStateToProps = state => ({
    currentUserAddress: state.account.address
});
export default connect(mapStateToProps, actions)(UserInfo)