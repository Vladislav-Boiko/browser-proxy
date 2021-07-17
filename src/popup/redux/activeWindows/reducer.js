import { WINDOW_LOAD, WINDOW_UNLOAD } from './actions';

const unique = (array) =>
  array.filter((item, index) => array.indexOf(item) === index);

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    // We register all web-site windows with their domain name: { [domain_name]: [ ...listOfWindowIds ]}
    case WINDOW_LOAD:
      const result = {
        ...state,
        [payload.domain]: unique([
          ...(state[payload.domain] ? state[payload.domain] : []),
          payload.windowId,
        ]),
      };
      return result;
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
