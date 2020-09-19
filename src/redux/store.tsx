import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  UI: uiReducer,
});

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));

export default store;
