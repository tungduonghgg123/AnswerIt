import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from '@material-ui/core';

export function InformDialog (props) {
    const {children, open, onClose } = props
    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogContent>
              <DialogContentText>
                {children}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
    )
}