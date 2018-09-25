import { QUERY } from '../actions/searchQuery';

const initialState = {
  query: ''
}

export default function searchQuery(state = initialState, action) {
  switch (action.type) {
    case QUERY:
      return {
        query: action.query
      }
    default:
      return state;
  }
}
