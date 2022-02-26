import axios from "axios";
import { ACTIONS } from "../types";

const BASE_URL = "https://bigb-puzzle-backend.herokuapp.com/";

export const getRanking = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ACTIONS.LOADING });
    try {
      const res = await axios.get(`${BASE_URL}leaderBoard`, {
        withCredentials: true,
      });

      dispatch({
        type: ACTIONS.GET_RANKING,
        payload: {
          loading: false,
          ranking: res.data,
        },
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.ERROR,
        payload: { error: error, loading: false },
      });
    }
  };
};
