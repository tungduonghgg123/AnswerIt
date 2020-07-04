import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions'
import { getBalance } from '../../web3/API'

function UserInfo(props) {
    const { username, firstname, lastname, address, showDialog, setShowDialog, currentUserAddress } = props
    const [balance, setBalance] = useState(0)

    const fetchBalance = async () => {
        console.log('called')
        const balance = await getBalance(address)
        setBalance(balance)
    }
    useEffect(() => {
        fetchBalance()
    }, [])

    return (
        <Dialog open={showDialog} maxWidth="sm" fullWidth onClose={() => setShowDialog(false)}>
            <DialogTitle id="form-dialog-title">
                {address === currentUserAddress ? 'Your account' : `${username}'s account`}
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
                    Balance: {balance} Tea
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