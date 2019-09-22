/**
 * Action Types
 */
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
export const UPDATE_QUEUE_ITEM = 'UPDATE_QUEUE_ITEM';

/**
 * Action Creators
 */
export function addToQueue(queueItem) {
  return {
    type: ADD_TO_QUEUE,
    queueItem
  };
}

export function removeFromQueue(index) {
  return {
    type: REMOVE_FROM_QUEUE,
    index
  };
}

export function updateQueueItem(payload) {
  return {
    type: UPDATE_QUEUE_ITEM,
    payload
  };
}
