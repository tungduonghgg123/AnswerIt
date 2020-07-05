
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import {MyButton} from './Button'
function FormDialog(props) {
  return (
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Question Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We only support text-based question at the moment. 
          </DialogContentText>
          <DialogContentText>
          Reward is an incentive, however, it is optional!
          You can choose your desired deadline for answers.
          </DialogContentText>
            
          {props.children}
        </DialogContent>
        <DialogActions>
          <MyButton onClick={props.handleClose} color="primary">
            Cancel
          </MyButton>
          <MyButton onClick={props.handlePost} color="primary">
            Post
          </MyButton>
        </DialogActions>
      </Dialog>
  );
}
export {FormDialog}