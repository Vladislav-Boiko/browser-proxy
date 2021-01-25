import { WINDOW_LOAD, WINDOW_UNLOAD } from './actions';

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
    case WINDOW_UNLOAD:
      return Object.keys(state)
        .map((key) => ({
          domain: key,
          ids: state[key].filter((id) => id !== action.payload),
        }))
        .reduce(
          (acc, { domain, ids }) => ({
            ...acc,
            [domain]: [...ids],
          }),
          {},
        );
    default:
      return state;
  }
};
