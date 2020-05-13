import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { editKitReq, getCurrentKitReq } from "../../_actions/kitReqAction";
import "../UI/Dashboard.css";
import Spinner from "../UI/Spinner";
import {
  getCities,
  populateAreas,
  getStates,
  populateCities,
} from "../../_actions/cityAction";
import moment from "moment";

const EditKitReq = ({
  history,
  editKitReq,
  sendingLoader,
  getCities,
  getStates,
  states,
  areas,
  newCities,
  populateAreas,
  populateCities,
  match,
  kitReq,
  getCurrentKitReq,
  loading,
  org,
}) => {
  const [formData, setFormData] = useState({
    date: "",

    name: "",
    kitQuantity: "",
    state: "",
    stateName: "",
    city: "",
    area: "",
    road: "",
    landmark: "",
    houseNo: "",
    phone: "",
    email: "",
    handle: org && org.handle,
  });

  const {
    date,
    name,
    kitQuantity,
    state,
    city,
    area,
    road,
    landmark,
    houseNo,
    stateName,
    phone,
    email,
  } = formData;

  useEffect(() => {
    getCities();
    getStates();
    getCurrentKitReq(match.params.id);
    setFormData({
      date:
        loading || !kitReq.date ? "" : moment(kitReq.date).format("YYYY-MM-DD"),
      name: loading || !kitReq.name ? "" : kitReq.name,

      kitQuantity: loading || !kitReq.kitQuantity ? "" : kitReq.kitQuantity,
      state: loading || !kitReq.state ? "" : kitReq.state,
      city: loading || !kitReq.city ? "" : kitReq.city,
      area: loading || !kitReq.area ? "" : kitReq.area,
      road: loading || !kitReq.road ? "" : kitReq.road,
      city: loading || !kitReq.city ? "" : kitReq.city,
      landmark: loading || !kitReq.landmark ? "" : kitReq.landmark,
      houseNo: loading || !kitReq.houseNo ? "" : kitReq.houseNo,
      phone: loading || !kitReq.phone ? "" : kitReq.phone,
      email: loading || !kitReq.email ? "" : kitReq.email,
    });
  }, [getCities, getStates]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      stateName: stname[0],
    });
  };

  const onChangeCity = (e) => {
    e.preventDefault();

    setFormData({ ...formData, city: e.target.value, stateName: stname[0] });
    populateAreas(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editKitReq(formData, history);
  };

  let cityOptions = newCities.map((cit) => (
    <option key={cit._id} value={cit.city}>
      {cit.city}
    </option>
  ));

  let stateOptions = states.map((st) => (
    <option key={st._id} value={st.state}>
      {st.state}
    </option>
  ));

  let areaOptions = areas.map((ar) => (
    <Fragment>
      <option value={ar}>{ar}</option>
    </Fragment>
  ));

  let stateNameOpt = [];
  stateNameOpt = states.filter((x) => x._id === state);

  let stname = stateNameOpt.map((nd) => nd.state);

  const onChangeState = (e) => {
    e.preventDefault();
    setFormData({ ...formData, state: e.target.value, stateName: stname[0] });
    populateCities(e.target.value);
  };

  return (
    <Fragment>
      <div className="container-fluid mb-4 pb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-warning">
                    <div>
                      <h3 className="bg-warning text-center p-4 ">
                        <Link to="/" className="">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>
                        Edit Kit Request
                      </h3>
                    </div>

                    {sendingLoader ? (
                      <Spinner />
                    ) : (
                      <fieldset className="p-4">
                        <input
                          name="date"
                          placeholder="Date"
                          type="date"
                          value={date}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
                        />
                        <input
                          name="name"
                          placeholder="Name or Organisation Name"
                          type="text"
                          value={name}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
                        />

                        <input
                          name="email"
                          placeholder="Email"
                          type="text"
                          value={email}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
                        />

                        <input
                          name="kitQuantity"
                          placeholder="Number of Kit"
                          type="number"
                          value={kitQuantity}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
                        />

                        <input
                          name="stateName"
                          type="hidden"
                          value={stateName}
                        />

                        <select
                          className="border p-2 w-100 my-2"
                          name="state"
                          value={state}
                          onChange={(e) => onChangeState(e)}
                          required
                        >
                          <option value={state}>{state}</option>
                          {stateOptions}
                        </select>

                        <select
                          className="border p-2 w-100 my-2"
                          name="city"
                          value={city}
                          onChange={(e) => onChangeCity(e)}
                          required
                        >
                          <option value={city}>{city}</option>
                          {cityOptions}
                        </select>

                        <select
                          className="border p-2 w-100 my-2"
                          name="area"
                          value={area}
                          onChange={(e) => onChangeHandler(e)}
                          required
                        >
                          <option value={area}>{area}</option>
                          {areaOptions}
                        </select>

                        <input
                          name="road"
                          placeholder="Road No"
                          type="text"
                          value={road}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />

                        <input
                          name="houseNo"
                          placeholder="House No"
                          type="text"
                          value={houseNo}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />

                        <input
                          name="landmark"
                          placeholder="Landmark"
                          type="text"
                          value={landmark}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />
                        <input
                          name="phone"
                          placeholder="Phone"
                          type="text"
                          value={phone}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />

                        <button
                          type="submit"
                          className="d-block py-2 px-5 btn-block bg-warning border-0 rounded font-weight-bold mt-3 "
                        >
                          Save
                        </button>
                      </fieldset>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

EditKitReq.propTypes = {
  editKitReq: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  populateCities: PropTypes.func.isRequired,
  populateAreas: PropTypes.func.isRequired,
  getCurrentKitReq: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sendingLoader: state.kitreq.sendingLoader,
  newCities: state.city.newCities,
  states: state.city.states,
  areas: state.city.areas,
  kitReq: state.kitreq.kitreq,
  loading: state.kitreq.loading,
  org: state.auth.org,
});
export default connect(mapStateToProps, {
  editKitReq,
  getCities,
  getStates,
  populateCities,
  populateAreas,
  getCurrentKitReq,
})(EditKitReq);
