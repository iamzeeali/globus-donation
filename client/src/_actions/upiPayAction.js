import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current upipay
export const getCurrentUpiPay = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/upi/${id}`);

    dispatch({
      type: types.GET_UPI_PAY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.UPI_PAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get User UpiPays
export const getUpiPays = (handle) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/upi?handle=${handle}`);
    dispatch({
      type: types.GET_UPI_PAYS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.UPI_PAY_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get All UpiPays
export const getAllUpiPays = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/upi/adminUpi");
    dispatch({
      type: types.GET_ALL_UPI_PAYS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.UPI_PAY_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add upipay
export const addUpiPay = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/upi", formData);
    dispatch({
      type: types.ADD_UPI_PAY,
      payload: res.data,
    });
    history.push("/admin/view-upipay");

    dispatch(setAlert("UpiPay Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (err.response.status === 400) {
      dispatch(setAlert(`${err.response.data.msg}`, "danger"));
    } else if (err.response.status === 500) {
      dispatch(setAlert(`File Too Large or Invalid File Type`, "danger"));
    } else {
      dispatch({
        type: types.INVESTMENT_ERROR,
        payload: { msg: errors, status: err.response.status },
      });
    }
  }
};

// Edit upipay
export const editUpiPay = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/upi/${id}`, formData);

    dispatch({
      type: types.GET_UPI_PAY,
      payload: res.data,
    });

    history.push("/admin/view-upipay");

    dispatch(setAlert("UpiPay Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    if (err.response.status === 400) {
      dispatch(setAlert(`${err.response.data.msg}`, "danger"));
    } else if (err.response.status === 500) {
      dispatch(setAlert(`File Too Large or Invalid File Type`, "danger"));
    }
    dispatch({
      type: types.UPI_PAY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete upipay
export const deleteUpiPay = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/upi/${id}`);
      dispatch({
        type: types.DELETE_UPI_PAY,
        payload: id,
      });
      dispatch(setAlert("UpiPay Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.UPI_PAY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current upipay
export const setCurrentUpiPay = (upipay) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_UPI_PAY,
    payload: upipay,
  });
};

// Clear upipay
export const clearUpiPay = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_UPI_PAY });
};

//Filter upipay
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_UPI_PAY, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
