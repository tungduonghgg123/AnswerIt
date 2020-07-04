import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

export function UserInfo(props) {
    const {username, firstname, lastname, balance, address, showDialog, setShowDialog} = props


    return (
        <Dialog open={showDialog} maxWidth="sm" fullWidth onClose={() => setShowDialog(false)}>
              <DialogTitle id="form-dialog-title">Your Account</DialogTitle>
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