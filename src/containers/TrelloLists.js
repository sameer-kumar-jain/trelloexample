import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {GridList, GridListTile } from '@material-ui/core';
import ListItemContainer from "./ListItemContainer";

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
  gridList: {
    flexWrap: 'nowrap',
    width: '100%',
    height: '100%',
  },
  gridListTile:{
    height:'100%'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});
const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',
  
  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
  background: '#CCCCCC',
  width: '100%',
  flex: 1,
});
class TrelloLists extends Component {
  onDragEnd = props => {
    props.source && props.destination && (
    props.type === 'list' ?
      this.props.onUpdateListPosition(this.props.lists, props.source, props.destination)
    :
    this.props.onUpdateCardPosition(this.props.lists, props.source, props.destination)
    )
  };
  render() {
    const {classes, theme, lists} = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppableList" direction="horizontal" type='list'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
            <GridList cellHeight={'auto'} className={classes.gridList} spacing={0} cols={6}>
            {
              lists && lists.map((list, index) => ( 
              <Draggable key={index} draggableId={list.data.draggableId} index={index}>
                {(provided, snapshot) => (
                <div>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <GridListTile classes={{root:classes.gridListTile}}><ListItemContainer data={list.data} /> </GridListTile> 
                  </div>
                  {provided.placeholder}
                </div>
                )}
              </Draggable> 
              ))
            }
            </GridList>
          </div>
        )}
        </Droppable>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state =>{
  return {
    lists:state.config.lists
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onUpdateListPosition:( lists, source, destination ) => dispatch({ type: 'CHANGE_LIST_POSITION', payload: {lists, source, destination} }),
    onUpdateCardPosition:( list, source, destination ) => dispatch({ type: 'CHANGE_CARD_POSITION', payload: {list, source, destination} }),
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(TrelloLists));
