import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import TrelloLists from './containers/TrelloLists';
import { connect } from 'react-redux';
import PrimarySearchAppBar from './components/PrimarySearchAppBar';
import SimpleDialogWrapped  from './components/SimpleDialog';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    position:'absolute',
    flexDirection: 'column',
    overflowX:'auto',
    width:'100%',
    height:'100%'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});
class App extends Component {
  state={open: false}
  handleClickOpen = () => this.setState({open: true,});
  handleSubmit = value => this.props.createNewList(value);
  handleClose = value => this.setState({open: false });
  render() {
    const {classes, theme} = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
    return (
      <div className={classes.root}>
        <PrimarySearchAppBar />
        <TrelloLists />
        <Zoom  in={true} timeout={transitionDuration} style={{transitionDelay: `${transitionDuration.exit}ms`,}} unmountOnExit>
          <Fab onClick={this.handleClickOpen} className={classes.fab} color={'primary'}><AddIcon /></Fab>
        </Zoom>
        <SimpleDialogWrapped open={this.state.open} onSubmit={this.handleSubmit} onClose={this.handleClose} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    createNewList:( name ) => dispatch({ type: 'REQUEST_NEW_LIST', payload: name })
  }
}

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(App));
