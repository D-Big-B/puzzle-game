import { ACTIONS } from "../types";

const initialState = {
  rankings: [],
  loading: true,
  play: false,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_RANKING:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return { state };
  }
};
