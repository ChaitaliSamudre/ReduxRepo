const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//action
function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty=1) {
  return {
    type: ICECREAM_ORDERED,
    payload : qty,
  }
}

function restockIcecream(qty=1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload : qty,
  }
}

//this will defined initial State
const cakeInitialState = {
  numOfCakes: 10,
};

const icecreamInitialState = {
  numOfIceCream: 20,
};

//reducer
const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
      case CAKE_RESTOCKED:
        return {
            ...state,
            numOfCakes: state.numOfCakes + action.payload,
        }
    default:
      return state;
  }
};

const icecreamReducer = (state = icecreamInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
      case ICECREAM_RESTOCKED:
        return {
            ...state,
            numOfIceCream: state.numOfIceCream + action.payload,
        }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
})

//created store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial State", store.getState());

const unsubsribe = store.subscribe(() =>
  console.log("Updated State", store.getState())
);

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restockCake(5));
store.dispatch(orderIcecream());
store.dispatch(orderIcecream());
store.dispatch(orderIcecream());
store.dispatch(restockIcecream(6));

unsubsribe();
