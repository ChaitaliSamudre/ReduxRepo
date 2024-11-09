const redux = require('redux');
const createStore = redux.createStore
const CAKE_ORDERED = 'CAKE_ORDERED';

function orderCake(){
    return{
        type: CAKE_ORDERED,
        quantity: 2
    }
   
}


const initialState = {
    numOfCakes: 20
}

const reducer = (state= initialState, action) =>{
    switch(action.type){
        case CAKE_ORDERED:
            return {
                numOfCakes: state.numOfCakes - 1,
            }
            default:
                return state
    }
}

const store = createStore(reducer);
console.log('Initial State', store.getState());

const unsubsribe = store.subscribe(()=>
    console.log('Updated State',store.getState())
)

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

unsubsribe();


