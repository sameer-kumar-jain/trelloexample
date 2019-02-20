import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Typography,
  IconButton,
  Button,
  Input,
  Card, CardActions, CardContent, CardHeader
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/core/styles';
const styles = (theme) => ({
  root: {
    width: '100%',
    maxWidth:250
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
    const {card_title} = this.state;
    this.props.onSubmit && this.setState({ card_title:'' },()=>this.props.onSubmit(card_title))
    this.toggelRequest(event);
  }
  onDragEnd = result => {
    this.props.onUpdateCardPosition(result)
  };
  render(){
    const {requesting, card_title} = this.state
    const {onChange, onSubmit, onCancel, toggelRequest} = this
    const {id, label, classes,cards, droppableId} = this.props;
    return(
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader  
            action={ <IconButton><MoreVertIcon /></IconButton> }
            title={label}
          />
          <CardContent classes={{root:classes.cardContentRoot}}>

              <Droppable droppableId={droppableId} type='card'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                {
                  cards && cards.map((card,index) => 
                    <Draggable key={index} draggableId={card.card_id} index={index}>
                    {(provided, snapshot) => (
                      <div style={{width:200}}>
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
            {
              requesting &&  <input onChange={onChange} value={card_title} autoFocus className={classes.root} />
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