import { evolve } from "immutableql";

const initialState = {
  requests: {},
};

export default (state = initialState, action) => evolve(state, action.payload);
