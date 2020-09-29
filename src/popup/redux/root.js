import { evolve } from "immutableql";

const initialState = {};

export default (state = initialState, action) => evolve(state, action.payload);
