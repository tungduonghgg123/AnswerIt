
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Thread(props) {
    // check props.children is array
    return (
        <Dialog open={props.open} onClose={props.handleClose} maxWidth="sm" fullWidth aria-labelledby="form-dialog-title">
            <DialogContent>
                {props.children[0]}
            </DialogContent>
            <DialogContent>
                Answers
                {props.children[1]}
                {props.children[2]}
                {props.children[3]}
            </DialogContent>
        </Dialog>
    );
}
export { Thread }