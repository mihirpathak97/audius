import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import downloadQueueReducer from '../reducers/downloadQueue';

const initialState = {
  queue: []
}

const store = createStore(downloadQueueReducer, initialState, applyMiddleware(thunk))

export default store;
