import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import downloadQueueReducer from '../reducers/downloadQueue';

const initialState = {
  queue: []
}

const persistedReducer = persistReducer({ key: 'root', storage }, downloadQueueReducer)

const store = createStore(persistedReducer, initialState, applyMiddleware(thunk))
const persistor = persistStore(store)

export { store, persistor };
