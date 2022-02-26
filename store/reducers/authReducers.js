import { ACTIONS } from "./../types";

const initialState = {
  authenticated: false,
  user: {},
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, authenticated: true, loading: false };

    case ACTIONS.LOGOUT:
      return { ...state, authenticated: false, loading: false };

    case ACTIONS.GET_USER:
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
