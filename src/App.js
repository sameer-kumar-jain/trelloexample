import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import { connect } from 'react-redux'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import RequestListContainer from './containers/RequestListContainer';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    position:'absolute',
    overflowX:'auto',
    width:'100%',
    height:'100%'
  },
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile:{
    height:'100%'
  }
});

class App extends Component {
  state={
    lists:[
      {component:<RequestListContainer />},
    ]
  }
  render() {
    const {classes, lists} = this.props;
    return (
      <div className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList} spacing={24} cols={6}>
          {
            lists.map((list, index) => ( <GridListTile classes={{root:classes.gridListTile}} key={index}><list.component data={list.data} /> </GridListTile>  ))
          }
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    lists:state.config.lists
  }
}

export default withStyles(styles)(connect(mapStateToProps)(App));
