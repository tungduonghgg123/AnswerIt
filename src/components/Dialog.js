
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function FormDialog(props) {
  return (
    <div>
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
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handlePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export {FormDialog}