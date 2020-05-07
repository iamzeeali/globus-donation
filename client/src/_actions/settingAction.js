import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current setting
export const getCurrentSetting = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/setting/${id}`);

    dispatch({
      type: types.GET_SETTING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.SETTING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get user Settings
export const getSettings = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/setting");
    dispatch({
      type: types.GET_SETTINGS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.SETTING_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get user Settings
export const getTotalSettings = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/setting/total");
    dispatch({
      type: types.GET_TOTAL_SETTING,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.SETTING_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add setting
export const addSetting = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/setting", formData);
    dispatch({
      type: types.ADD_SETTING,
      payload: res.data,
    });
    history.push("/dashboard");

    dispatch(setAlert("Setting saved!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("Setting already exists!", "danger"));
    }

    dispatch({
      type: types.SETTING_ERROR,
      payload: { msg: errors, status: err.response.status },
    });
  }
};

// Edit setting
export const editSetting = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/setting/${id}`, formData);

    dispatch({
      type: types.GET_SETTING,
      payload: res.data,
    });

    history.push("/admin/defaultGrocery");

    dispatch(setAlert("Setting Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.SETTING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete setting
export const deleteSetting = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/setting/${id}`);
      dispatch({
        type: types.DELETE_SETTING,
        payload: id,
      });
      dispatch(setAlert("Setting Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.SETTING_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current setting
export const setCurrentSetting = (setting) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_SETTING,
    payload: setting,
  });
};

// Clear setting
export const clearSetting = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_SETTING });
};

//Filter setting
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_SETTING, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
