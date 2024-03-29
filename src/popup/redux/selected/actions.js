export const SELECT_NODE = 'SELECT_NODE';
export const selectNode = (payload) => ({
  type: SELECT_NODE,
  payload,
});

export const SELECT_CURRENT_DOMAIN = 'SELECT_CURRENT_DOMAIN';
export const selectCurrentDomain = (payload) => ({
  type: SELECT_CURRENT_DOMAIN,
  payload,
});

export const ANALYSE_NODE = 'ANALYSE_NODE';
export const analyseNode = (payload) => ({
  type: ANALYSE_NODE,
  payload,
});
