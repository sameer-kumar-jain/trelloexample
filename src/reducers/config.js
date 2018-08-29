import RequestListContainer from "../containers/RequestListContainer";
import ListItemContainer from "../containers/ListItemContainer";

/* @flow */

const initialState = {
  readyStatus: 'REQUEST_NEW_LIST',
  lists: [{data:{id:0},component:RequestListContainer}],
  id:1
};

export default (state = initialState, action ) => {
  let list 
  switch (action.type) {
    case 'REQUEST_NEW_LIST':
      return {
        ...state,
        id:state.id+1,
        lists:[{data:{id:state.id,label:action.payload,cards:[]}, component:ListItemContainer}].concat(state.lists)
      };
    case 'REQUEST_NEW_CARD':
      list = state.lists.filter( list => list.data.id === action.payload.list.id)
      list[0].data.cards.push({card_title:action.payload.name,card_id:list[0].data.cards.length})
      return {
        ...state,
        readyStatus:'NEW_CARD_ADDED'
      };
    case 'CHANGE_CARD_POSITION':
    console.log(action)
      list = state.lists.filter( list => list.data.id === action.payload.list.id)
      let cards = list[0].data.cards
      const [removed] = cards.splice(action.payload.source.index, 1);
      cards.splice(action.payload.destination.index, 0, removed);
      list[0].data.cards = cards;
      
      return {
        ...state,
        readyStatus:'CARD_UPDATED'
      };
    default:
      return state;
  }
};
