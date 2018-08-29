import React, { Component } from 'react';
import { connect } from 'react-redux'
import ListComponent from '../components/ListComponent';

class ListItemContainer extends Component {
  onRequestNewCard = props => {
    this.props.addNewCard( this.props.data, props )
  }
  onUpdateCardPosition = props =>{
    if (!props.destination) {
      return;
    }
    this.props.updateCardPosition( this.props.data, props.source, props.destination )
  }
  render(){
    const { data } = this.props
    const {onRequestNewCard,onUpdateCardPosition} = this
    return (
      <ListComponent onSubmit={onRequestNewCard} onUpdateCardPosition={onUpdateCardPosition}  {...data} />
    )
  }
}

const mapStateToProps = state =>{
  return {
    
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    addNewCard:( list, name ) => dispatch({ type: 'REQUEST_NEW_CARD', payload: {name,list} }),
    updateCardPosition:( list, source, destination ) => dispatch({ type: 'CHANGE_CARD_POSITION', payload: {list, source, destination} }),
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(ListItemContainer)