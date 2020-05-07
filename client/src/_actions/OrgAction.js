import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current organisation
export const getCurrentOrganisation = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/organisation/${id}`);

    dispatch({
      type: types.GET_ORGANISATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.ORGANISATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get  organisation by handle
export const getOrgByHandle = (handle) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/organisation/getOrgByHandle/${handle}`);

    dispatch({
      type: types.GET_ORGANISATION,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.ORGANISATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get user Organisations
export const getOrganisations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/organisation");
    dispatch({
      type: types.GET_ORGANISATIONS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.ORGANISATION_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get all Organisations
export const getAllOrganisations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/organisation/");
    console.log(res);
    dispatch({
      type: types.GET_ALL_ORGANISATIONS,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.ORGANISATION_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

//Get user Organisations
export const getTotalOrganisations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/organisation/total");
    dispatch({
      type: types.GET_TOTAL_ORGANISATION,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: types.ORGANISATION_ERROR,
    //   payload: { msg: err.response.data, status: err.response.status }
    // });
  }
};

// Add organisation
export const addOrganisation = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/organisation", formData);
    dispatch({
      type: types.ADD_ORGANISATION,
      payload: res.data,
    });
    history.push("/admin/view-kit");

    dispatch(setAlert("Organisation Added!", "success"));
  } catch (err) {
    const errors = err.response.data.error;
    console.log(errors);

    if (errors.code === 11000) {
      dispatch(setAlert("Organisation already exists!", "danger"));
    }

    dispatch({
      type: types.ORGANISATION_ERROR,
      payload: { msg: errors, status: err.response.status },
    });
  }
};

// Edit organisation
export const editOrganisation = (formData, history, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/api/organisation/${id}`, formData);

    dispatch({
      type: types.GET_ORGANISATION,
      payload: res.data,
    });

    history.push("/dashboard");

    dispatch(setAlert("Organisation Updated", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.ORGANISATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete organisation
export const deleteOrganisation = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/organisation/${id}`);
      dispatch({
        type: types.DELETE_ORGANISATION,
        payload: id,
      });
      dispatch(setAlert("Organisation Deleted!", "danger"));
    } catch (err) {
      dispatch({
        type: types.ORGANISATION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current organisation
export const setCurrentOrganisation = (organisation) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_ORGANISATION,
    payload: organisation,
  });
};

// Clear organisation
export const clearOrganisation = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ORGANISATION });
};

//Filter organisation
export const filterOrg = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_ORGANISATION, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
