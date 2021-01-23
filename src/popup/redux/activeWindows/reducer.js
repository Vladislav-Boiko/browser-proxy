import { WINDOW_LOAD } from './actions';

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    // We register all web-site windows with their domain name: { [domain_name]: [ ...listOfWindowIds ]}
    case WINDOW_LOAD:
      return {
        ...state,
        [payload.domain]: [
          ...(state[payload.domain] ? state[payload.domain] : []),
          payload.windowId,
        ],
      };
    default:
      return state;
  }
};
