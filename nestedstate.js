const { produce } = require("immer");
const redux = require("redux");

const initialState = {
    name : 'Chaitali',
    address: {
        street: 'Mahatma phule society',
        city: 'Yavtamal',
        state: 'Maharastra' 
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updatedStreet = (street) => {
    return {
        type: 'STREET_UPDATED',
        payload: street, 
    }
}

const reducer = (state =  initialState, action) => {
switch (action.type){
    case STREET_UPDATED: 
    //     return{
    //   ...state,
    //   address: {
    //     ...state.address,
    //     street: action.payload,
    //   },
    // }
    return produce(state, (draft) => {
        draft.address.street = action.payload
    })
    default:{
        return state
}
}
}

const store = redux.createStore(reducer);
console.log("Initial State", store.getState());
console.log("Updated State", store.getState())

const unsubsribe = store.subscribe(() =>
    console.log("Updated State", store.getState())
  );

store.dispatch(updatedStreet('Banglore'))
unsubsribe()