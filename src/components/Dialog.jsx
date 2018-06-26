/**
 * Tiny component to display in-app dialogs
 * Props: 
 *  - dialogTitle
 *  - dialogMessage
 */
import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

class DialogBox extends React.Component {

  state = {
    dialogOpen: true
  }

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    })
  }

  render() {
    return(
      <Dialog
        open={this.state.dialogOpen}
        onClose={this.handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{this.props.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
    )
  }

}

export default DialogBox;
