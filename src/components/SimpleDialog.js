import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, 
  TextField, 
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
class SimpleDialog extends React.Component {
  state={
    list_name:''
  }
  onChange = event => {
    this.setState({ list_name:event.target.value })
  }
  onSubmit = event => {
    this.props.onSubmit && this.props.onSubmit( this.state.list_name)
    this.props.onClose();
  }
  render() {
    const { open, onClose } = this.props;
    const { list_name} = this.state
    const { onChange, onSubmit } = this
    return (
      <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name of the list.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="List Name"
              type="text"
              fullWidth
              onChange={onChange}
              value={list_name}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
export default SimpleDialog;