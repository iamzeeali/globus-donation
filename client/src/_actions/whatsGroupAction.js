import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current whatgroup
export const getCurrentWhatGroup = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/whatsgroup/${id}`);

    dispatch({
      type: types.GET_WHAT_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.WHAT_GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get user WhatGroups
export const getWhatGroups = (handle) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/whatsgroup?handle=${handle}`);
    dispatch({
      type: types.GET_WHAT_GROUPS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.WHAT_GROUP_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get org WhatGroups
export const getallWhatGroups = (handle) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/whatsgroup/getAll`);
    dispatch({
      type: types.GET_WHAT_GROUPS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.WHAT_GROUP_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add whatgroup
export const addWhatGroup = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/whatsgroup", formData);
    dispatch({
      type: types.ADD_WHAT_GROUP,
      payload: res.data,
    });
    history.push("/admin/view-whatgroup");

    dispatch(setAlert("WhatGroup Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("WhatGroup already exists!", "danger"));
    }

    dispatch({
      type: types.WHAT_GROUP_ERROR,
      payload: { msg: errors, status: err.response.status },
    });
  }
};

// Edit whatgroup
export const editWhatGroup = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/whatsgroup/${id}`, formData);

    dispatch({
      type: types.GET_WHAT_GROUP,
      payload: res.data,
    });

    history.push("/admin/view-whatgroup");

    dispatch(setAlert("WhatGroup Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.WHAT_GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete whatgroup
export const deleteWhatGroup = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/whatsgroup/${id}`);
      dispatch({
        type: types.DELETE_WHAT_GROUP,
        payload: id,
      });
      dispatch(setAlert("WhatGroup Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.WHAT_GROUP_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current whatgroup
export const setCurrentWhatGroup = (whatgroup) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_WHAT_GROUP,
    payload: whatgroup,
  });
};

// Clear whatgroup
export const clearWhatGroup = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_WHAT_GROUP });
};

//Filter whatgroup
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_WHAT_GROUP, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
