import axios from "axios";
import { ACTIONS } from "../types";

const BASE_URL = "https://bigb-puzzle-backend.herokuapp.com/";

export const login = () => {
  return async (dispatch, getState) => {
    window.open(`${BASE_URL}auth/google`, "_self");
    dispatch({ type: ACTIONS.LOGIN });
  };
};
export const logout = () => {
  return async (dispatch, getState) => {
    window.open(`${BASE_URL}auth/logout`, "_self");
    dispatch({ type: ACTIONS.LOGOUT });
  };
};

export const getUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ACTIONS.LOADING });
    try {
      const res = await axios.get(`${BASE_URL}auth/login/success`, {
        withCredentials: true,
      });
      dispatch({
        type: ACTIONS.GET_USER,
        payload: {
          authenticated: true,
          user: res.data.user,
          loading: false,
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
export const updateUser = (level, time, userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: ACTIONS.LOADING });
    try {
      const res = await axios.put(
        `${BASE_URL}updateUser/${userId}`,

        {
          level: level,
          time: time,
        }
      );
      dispatch({
        type: ACTIONS.GET_USER,
        payload: {
          authenticated: true,
          user: res.data.user,
          loading: false,
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
