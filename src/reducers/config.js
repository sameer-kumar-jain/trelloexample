
const uuidv4 = require('uuid/v4');

const initialState = {
  readyStatus: 'REQUEST_NEW_LIST',
  lists: [{data:{
      droppableId:uuidv4(),
      draggableId:uuidv4(),
      label:'LIST B',
      cards:[
        {card_title: "CARD B 1", card_id: uuidv4()},
        {card_title: "CARD B 2", card_id: uuidv4()},
        {card_title: "CARD B 3", card_id: uuidv4()}
      ]
    }},
    {data:{droppableId:uuidv4(),
      draggableId:uuidv4(),label:'LIST A',id:2,
      cards:[
        {card_title: "CARD A 1", card_id: uuidv4()},
        {card_title: "CARD A 2", card_id: uuidv4()},
        {card_title: "CARD A 3", card_id: uuidv4()}
      ]
    }}
  ]
};

export default (state = initialState, action ) => {
  let lists 
  switch (action.type) {
    case 'REQUEST_NEW_LIST':
      lists = state.lists;
      lists.push({data:{droppableId:uuidv4(),draggableId:uuidv4(),label:action.payload,cards:[]}});
      return {
        ...state,
        lists:JSON.parse(JSON.stringify(lists)),
      };
    case 'REQUEST_NEW_CARD':
      console.log(action.payload)
      lists = state.lists;
      let cardlists = lists.filter( list => list.data.droppableId === action.payload.list.droppableId);
      cardlists[0].data.cards.push({card_title:action.payload.name,card_id:uuidv4()})
      return {
        ...state,
        readyStatus:'NEW_CARD_ADDED',
        lists:JSON.parse(JSON.stringify(lists)),
      };
    case 'CHANGE_CARD_POSITION':
      //source list
      lists = state.lists;
      let sourceLists = lists.filter( list => list.data.droppableId === action.payload.source.droppableId);
      let destLists = lists.filter( list => list.data.droppableId === action.payload.destination.droppableId);
      /** */
      const sourceList = sourceLists[0];
      const destList = destLists[0];
      /** */
      //remove card from source list
      const [removed] = sourceList.data.cards.splice(action.payload.source.index, 1);
      //add card to destination list
      destList.data.cards.splice(action.payload.destination.index, 0, removed);  
      return {
        ...state,
        lists:JSON.parse(JSON.stringify(lists)),
        readyStatus:'CARD_UPDATED'
      };
    case "CHANGE_LIST_POSITION":
      lists = state.lists;
      const [removedList] = lists.splice(action.payload.source.index, 1);
      lists.splice(action.payload.destination.index, 0, removedList);
      return {
        ...state,
        lists:JSON.parse(JSON.stringify(lists)),
        readyStatus:'LIST_UPDATED'
      };
    default:
      return state;
  }
};
