import { combineReducers } from 'redux'
import downloadQueue from './downloadQueue'
import searchQuery from './searchQuery'

export default combineReducers({
  downloadQueue,
  searchQuery
})
