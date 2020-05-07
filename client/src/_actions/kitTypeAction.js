import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current grocery
export const getCurrentGrocery = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/kitType/${id}`);

    dispatch({
      type: types.GET_GROCERY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.GROCERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get user Grocerys
export const getGrocerys = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/kitType");
    dispatch({
      type: types.GET_GROCERYS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.GROCERY_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get all Grocerys
export const getAllGrocerys = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/kitType/getAll");
    dispatch({
      type: types.GET_ALL_GROCERYS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.GROCERY_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get user Grocerys
export const getTotalGrocerys = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/kitType/total");
    dispatch({
      type: types.GET_TOTAL_GROCERY,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.GROCERY_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add grocery
export const addGrocery = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/kitType", formData);
    dispatch({
      type: types.ADD_GROCERY,
      payload: res.data,
    });
    history.push("/admin/view-kit");

    dispatch(setAlert("Grocery Added!", "success"));
  } catch (err) {
    const errors = err.response.data && err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("Grocery already exists!", "danger"));
    }

    dispatch({
      type: types.GROCERY_ERROR,
      payload: { msg: errors, status: err.response.status },
    });
  }
};

// Edit grocery
export const editGrocery = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/kitType/${id}`, formData);

    dispatch({
      type: types.GET_GROCERY,
      payload: res.data,
    });

    history.push("/admin/view-kit");

    dispatch(setAlert("Grocery Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.GROCERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete grocery
export const deleteGrocery = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/kitType/${id}`);
      dispatch({
        type: types.DELETE_GROCERY,
        payload: id,
      });
      dispatch(setAlert("Grocery Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.GROCERY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current grocery
export const setCurrentGrocery = (grocery) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_GROCERY,
    payload: grocery,
  });
};

// Clear grocery
export const clearGrocery = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_GROCERY });
};

//Filter grocery
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_GROCERY, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
