import React, { Component } from 'react';
import {
  Button, 
  TextField,
  Card,  
  CardActions, 
  CardContent
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  root: {
    width: '100%',
  },
  cardContentRoot:{
    padding: 4
  }
});

class RequestListButton extends Component {
  state={
    requesting:false, list_name:''
  }
  toggelRequest = event =>{
    this.setState({requesting:!this.state.requesting,list_name:''})
  }
  onChange = event => {
    this.setState({ list_name:event.target.value })
  }
  onSubmit = event => {
    this.props.onSubmit && this.props.onSubmit( this.state.list_name)
    this.toggelRequest(event);
  }
  render(){
    const {requesting, list_name} = this.state
    const {onRequestList, onChange, onSubmit, onCancel, toggelRequest} = this
    const {classes} = this.props
    return(
      <div className={classes.root}>
      {requesting ?
          <Card className={classes.card}>
            <CardContent classes={{root:classes.cardContentRoot}}>
            <form noValidate autoComplete="off">
              <input onChange={onChange} value={list_name} autoFocus className={classes.root} />
            </form>
            </CardContent>
            <CardActions>
              <Button onClick={onSubmit} size="small" color="primary">
                Save
              </Button>
              <Button onClick={toggelRequest} size="small" color="primary">
                Cancel
              </Button>
            </CardActions>
          </Card>
        :
        <Button className={classes.root} onClick={this.toggelRequest}> Add a list...</Button>
      }
      </div>
    )

  }
}

export default withStyles(styles)(RequestListButton)