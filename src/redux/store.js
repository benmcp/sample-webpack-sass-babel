import {applyMiddleware, createStore, compose} from 'redux';
import * as reduxLoop from 'redux-loop';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const enhancer = compose(
  reduxLoop.install()
);

// create the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    ),
  ),
  enhancer,

);

export default store;
