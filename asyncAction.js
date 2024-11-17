const redux = require("redux");
const createStore = redux.createStore;
const axios = require("axios");
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;

console.log(typeof thunkMiddleware);

initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const REQUESTED_USER_SUCCEEDED = "REQUESTED_USER_SUCCEEDED";
const REQUESTED_USER_FAILED = "REQUESTED_USER_FAILED";

const fetchRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};

const fetchSucceededUser = (users) => {
  return {
    type: REQUESTED_USER_SUCCEEDED,
    payload: users,
  };
};

const fetchFailedUser = (error) => {
  return {
    type: REQUESTED_USER_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case REQUESTED_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case REQUESTED_USER_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users").then((response) => {
        //response.data is a user
        const users = response.data.map((user) => user.id);
        dispatch(fetchSucceededUser(users));
      })
      .catch((error) => {
        //error.message is the error message
        dispatch(fetchFailedUser(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUser());
