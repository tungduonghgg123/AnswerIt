
import React from 'react';
import {DialogContent, Dialog} from '@material-ui/core';


function Thread(props) {
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