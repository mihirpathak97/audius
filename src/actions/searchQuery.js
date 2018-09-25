
/**
 * Action Types
 */
export const QUERY = 'QUERY';

/**
 * Action Creators
 */
export function searchQuery(query) {
  return {
    type: QUERY,
    query
  }
};
