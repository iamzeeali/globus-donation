import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current cause
export const getCurrentCause = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cause/${id}`);

    dispatch({
      type: types.GET_CAUSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CAUSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get causes
export const getCauses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cause");
    dispatch({
      type: types.GET_CAUSES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.EXPENSE_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add causr
export const addCause = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/cause", formData);
    dispatch({
      type: types.ADD_CAUSE,
      payload: res.data,
    });
    history.push("/causes");

    dispatch(setAlert("Cause Added", "success"));
  } catch (err) {
    const errors = err.response && err.response.data.error;

    dispatch({
      type: types.CAUSE_ERROR,
      payload: { msg: errors, status: err.response && err.response.status },
    });
  }
};

// Edit cause
export const editCause = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/cause/${id}`, formData);

    dispatch({
      type: types.GET_CAUSE,
      payload: res.data,
    });

    history.push("/causes");

    dispatch(setAlert("Cause Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: types.CAUSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete cause
export const deleteCause = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/cause/${id}`);
      dispatch({
        type: types.DELETE_CAUSE,
        payload: id,
      });
      dispatch(setAlert("Cause Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.CAUSE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current Cause
export const setCurrentCause = (cause) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_CAUSE,
    payload: cause,
  });
};

// Clear cause
export const clearCause = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CAUSE });
};

//Filter cause
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_CAUSE, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
