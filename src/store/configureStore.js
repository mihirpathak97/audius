import { createStore, compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers/'

const history = createBrowserHistory()

const store = createStore(connectRouter(history)(rootReducer), undefined, compose(applyMiddleware(routerMiddleware(history))))
export { store, history }
