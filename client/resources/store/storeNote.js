import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducersNote from '../reducers/reducersNote';

const storeNote = createStore(
  combineReducers({
    reducersNote 
  }), applyMiddleware(thunk)
)

export default storeNote;

