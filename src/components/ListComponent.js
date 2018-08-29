import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Button, Paper, Grid, Input} from 'material-ui'
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
const styles = (theme) => ({
  root: {
    width: '100%',
  },
  cardContentRoot:{
    padding: 4
  }
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
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  width: '100%',
});
class ListComponent extends Component {
  state={
    requesting:false, card_title:''
  }
  toggelRequest = event =>{
    this.setState({requesting:!this.state.requesting,list_name:''})
  }
  onChange = event => {
    this.setState({ card_title:event.target.value })
  }
  onSubmit = event => {
    this.props.onSubmit && this.props.onSubmit( this.state.card_title)
    this.toggelRequest(event);
  }
  onDragEnd = result => {
    // the only one that is required
    this.props.onUpdateCardPosition(result)
  };
  render(){
    const {requesting, card_title} = this.state
    const {onChange, onSubmit, onCancel, toggelRequest} = this
    const {label, classes,cards} = this.props
    return(
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader  
            action={ <IconButton><MoreVertIcon /></IconButton> }
            title={label}
          />
          <CardContent classes={{root:classes.cardContentRoot}}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                {
                  cards && cards.map((card,index) => 
                    <Draggable key={card.card_id} draggableId={card.card_id} index={index}>
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
                          <Typography component="p">{card.card_title}</Typography>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                    </Draggable>
                )}
                {provided.placeholder}
                </div>
              )}
              </Droppable>
            </DragDropContext>
            {
              requesting &&  <Input multiline={true} rows={5} onChange={onChange} value={card_title} autoFocus className={classes.root} />
            }
          </CardContent>
          {
            requesting && 
            <CardActions>
              <Button onClick={onSubmit} size="small" color="primary">
                Save
              </Button>
              <Button onClick={toggelRequest} size="small" color="primary">
                Cancel
              </Button>
            </CardActions>
          }
          {
            !requesting && <CardActions>
              <Button onClick={toggelRequest} size="small" color="primary">
                Add a Card
              </Button>
            </CardActions>
          }
        </Card>
      </div>
    )

  }
}

export default withStyles(styles)(ListComponent)