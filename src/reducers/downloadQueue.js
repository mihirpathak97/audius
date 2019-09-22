import {
  ADD_TO_QUEUE,
  REMOVE_FROM_QUEUE,
  UPDATE_QUEUE_ITEM
} from '../actions/downloadQueue';
import { downloadAudio } from '@/modules/YTDownload';

const initialState = [];

export default function downloadQueue(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_QUEUE:
      if (state.length === 0) {
        downloadAudio(
          action.queueItem.youtubeMetadata,
          action.queueItem.spotifyMetadata
        );
      }
      return [...state, action.queueItem];
    case REMOVE_FROM_QUEUE:
      if (state[1]) {
        downloadAudio(state[1].youtubeMetadata, state[1].spotifyMetadata);
      }
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    case UPDATE_QUEUE_ITEM:
      return [
        {
          ...state[0],
          progress: action.payload
        },
        ...state.slice(1)
      ];
    default:
      return state;
  }
}
