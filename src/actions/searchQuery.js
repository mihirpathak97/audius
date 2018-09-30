
/**
 * Action Types
 */
export const SET_QUERY = 'SET_QUERY';

/**
 * Action Creators
 */
export function setSearchQuery(query) {
  return {
    type: SET_QUERY,
    query
  }
};
