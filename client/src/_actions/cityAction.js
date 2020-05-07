import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current city
export const getCurrentCity = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/city/${id}`);

    dispatch({
      type: types.GET_CITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all cities
export const getCities = () => async (dispatch) => {
  try {
    const res = await axios.get("api/city");
    dispatch({
      type: types.GET_CITIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.RATION_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add City
export const addCity = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("api/city", formData);
    dispatch({
      type: types.ADD_CITY,
      payload: res.data,
    });
    history.push("/cities");

    dispatch(setAlert("City Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("City already exists!", "danger"));
    }

    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: errors, status: err.response.status },
    });
  }
};

// Edit city
export const editCity = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/city/${id}`, formData);

    dispatch({
      type: types.GET_CITY,
      payload: res.data,
    });

    dispatch(setAlert("City Updated", "success"));
    history.push("/cities");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete City
export const deleteCity = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`api/city/${id}`);
      dispatch({
        type: types.DELETE_CITY,
        payload: id,
      });
      dispatch(setAlert("City Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.CITY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current City
export const setCurrentCity = (city) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_CITY,
    payload: city,
  });
};

// Clear city
export const clearCity = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CITY });
};

//Filter city
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_CITY, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};

//  Populate areas
export const populateAreas = (city) => async (dispatch) => {
  try {
    dispatch({
      type: types.POPULATE_AREAS,
      payload: city,
    });
  } catch (err) {
    dispatch({
      type: types.AREA_ERROR,
      payload: { status: err.response },
    });
  }
};

//  Populate cities
export const populateCities = (state) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/city?state=${state}`);
    dispatch({
      type: types.POPULATE_CITIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.RATION_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get all states
export const getStates = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/state");
    dispatch({
      type: types.GET_STATES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.RATION_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};
