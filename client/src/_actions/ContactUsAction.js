import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current contactus
export const getCurrentContactUs = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/contactus/${id}`);

    dispatch({
      type: types.GET_CONTACTUS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CONTACTUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get User ContactUss
export const getContactUss = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contactus");
    dispatch({
      type: types.GET_CONTACTUSS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.CONTACTUS_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get All ContactUss
export const getAllContactUss = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contactus/getAll");
    dispatch({
      type: types.GET_ALL_CONTACTUS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.CONTACTUS_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add contactus
export const addContactUs = (formData, history) => async (dispatch) => {
  try {
    dispatch({
      type: types.ADD_CONTACTUS,
      sendingPayload: true,
    });
    const res = await axios.post("/api/contactus", formData);
    dispatch({
      type: types.ADD_CONTACTUS,
      payload: res.data,
      sendingPayload: false,
    });
    history.push("/");

    dispatch(setAlert("ContactUs Added!", "success"));
  } catch (err) {
    // const errors = err.response.data.errors;

    if (err) {
      dispatch(setAlert("Something went wrong, try again", "danger"));
    }

    dispatch({
      type: types.CONTACTUS_ERROR,
    });
  }
};

// Edit contactus
export const editContactUs = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/contactus/${id}`, formData);

    dispatch({
      type: types.GET_CONTACTUS,
      payload: res.data,
    });

    history.push("/");

    dispatch(setAlert("ContactUs Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CONTACTUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete contactus
export const deleteContactUs = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/contactus/${id}`);
      dispatch({
        type: types.DELETE_CONTACTUS,
        payload: id,
      });
      dispatch(setAlert("ContactUs Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.CONTACTUS_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current contactus
export const setCurrentContactUs = (contactus) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_CONTACTUS,
    payload: contactus,
  });
};

// Clear contactus
export const clearContactUs = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CONTACTUS });
};

//Filter contactus
export const filterstate = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_CONTACTUS, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
