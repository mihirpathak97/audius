import { ADD_TO_QUEUE, REMOVE_FROM_QUEUE } from '../actions/downloadQueue';

const initialState = [];

export default function downloadQueue(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_QUEUE:
      return [...state, action.queueItem];
    case REMOVE_FROM_QUEUE:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}
