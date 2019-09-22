import {
  QueueItem
} from '../types'

/**
 * Action Types
 */
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';
export const UPDATE_QUEUE_ITEM = 'UPDATE_QUEUE_ITEM';

/**
 * Action Creators
 */
export function addToQueue(queuePayload: QueueItem) {
  return {
    type: ADD_TO_QUEUE,
    queuePayload
  };
}

export function removeFromQueue(index: number) {
  return {
    type: REMOVE_FROM_QUEUE,
    index
  };
}

export function updateQueueItem(progressPayload: Object) {
  return {
    type: UPDATE_QUEUE_ITEM,
    progressPayload
  };
}
