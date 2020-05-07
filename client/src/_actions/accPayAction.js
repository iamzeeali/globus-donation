import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current accpay
export const getCurrentAccPay = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/account/${id}`);

    dispatch({
      type: types.GET_ACC_PAY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.ACC_PAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get user AccPays
export const getAccPays = (handle) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/account?handle=${handle}`);
    dispatch({
      type: types.GET_ACC_PAYS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.ACC_PAY_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get all AccPays
export const getAllAccPays = (handle) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/account/getAll`);
    dispatch({
      type: types.GET_ALL_ACC_PAYS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.ACC_PAY_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add accpay
export const addAccPay = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/account", formData);
    dispatch({
      type: types.ADD_ACC_PAY,
      payload: res.data,
    });
    history.push("/admin/view-accpay");

    dispatch(setAlert("AccPay Added!", "success"));
  } catch (err) {
    const errors = err.response.data && err.response.data.error;

    dispatch({
      type: types.ACC_PAY_ERROR,
      payload: { msg: errors, status: err.response.status },
    });
  }
};

// Edit accpay
export const editAccPay = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/account/${id}`, formData);

    dispatch({
      type: types.GET_ACC_PAY,
      payload: res.data,
    });

    history.push("/admin/view-accpay");

    dispatch(setAlert("AccPay Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.ACC_PAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete accpay
export const deleteAccPay = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/account/${id}`);
      dispatch({
        type: types.DELETE_ACC_PAY,
        payload: id,
      });
      dispatch(setAlert("AccPay Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.ACC_PAY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current accpay
export const setCurrentAccPay = (accpay) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_ACC_PAY,
    payload: accpay,
  });
};

// Clear accpay
export const clearAccPay = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ACC_PAY });
};

//Filter accpay
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_ACC_PAY, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
