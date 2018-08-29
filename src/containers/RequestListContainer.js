import React, { Component } from 'react';
import { connect } from 'react-redux'
import RequestListButton from '../components/RequestListButton';

class RequestListContainer extends Component {
  onRequestNewList = props => {
    this.props.addNewList( props )
  }
  render(){
    const {onRequestNewList} = this
    return (
      <RequestListButton onSubmit={onRequestNewList} />
    )
  }
}

const mapStateToProps = state =>{
  return {
    
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    addNewList:( name ) => dispatch({ type: 'REQUEST_NEW_LIST', payload: name, })
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(RequestListContainer)