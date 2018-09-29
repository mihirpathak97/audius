import { ADD_TO_QUEUE, REMOVE_FROM_QUEUE } from '../actions/downloadQueue';

const initialState = {
  queue: []
}

export default function downloadQueue(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_QUEUE:
      return {
        queue: [...state.queue, action.queueItem]
      }
    case REMOVE_FROM_QUEUE:
      return {
        queue: [
          ...state.queue.slice(0, action.index),
          ...state.queue.slice(action.index + 1)
        ]
      }
      break;
    default:
      return state;
  }
}
