import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addContactUs } from "../../_actions/ContactUsAction";
import "../UI/Dashboard.css";
import Spinner from "../UI/Spinner";
import {
  getCities,
  populateAreas,
  getStates,
  populateCities,
} from "../../_actions/cityAction";

const AddContactUs = ({
  history,
  addContactUs,
  sendingLoader,
  getCities,
  getStates,
  states,
  newCities,
  areas,
  populateAreas,
  populateCities,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    ngo: "",
    email: "",
    state: "",
    stateName: "",
    city: "",
    area: "",
    road: "",
    landmark: "",
    houseNo: "",
    phone: "",
    pincode: "",
    website: "",
  });

  const {
    name,
    ngo,
    email,
    state,
    stateName,
    city,
    area,
    road,
    landmark,
    houseNo,
    phone,
    pincode,
    website,
  } = formData;

  useEffect(() => {
    getCities();
    getStates();
  }, [getCities, getStates]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      stateName: stname[0],
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addContactUs(formData, history);
  };

  const onChangeCity = (e) => {
    e.preventDefault();

    setFormData({ ...formData, city: e.target.value, stateName: stname[0] });
    populateAreas(e.target.value);
  };

  let cityOptions = newCities.map((cit) => (
    <option key={cit._id} value={cit.city}>
      {cit.city}
    </option>
  ));

  let stateOptions = states.map((st) => (
    <option key={st._id} value={st._id}>
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
                  <div className="bg-light border border-dark">
                    <div>
                      <h3 className="gray text-center p-4 ">
                        <Link to="/" className="">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Contact Us
                      </h3>
                    </div>

                    {sendingLoader ? (
                      <Spinner />
                    ) : (
                      <fieldset className="p-4">
                        <input
                          name="name"
                          placeholder="Name"
                          type="text"
                          value={name}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
                        />

                        <input
                          name="ngo"
                          placeholder="Organisation Name"
                          type="text"
                          value={ngo}
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

                        <select
                          className="border p-2 w-100 my-2"
                          name="state"
                          value={state}
                          onChange={(e) => onChangeState(e)}
                          required
                        >
                          <option value="" disabled selected hidden>
                            -Select State-
                          </option>
                          {stateOptions}
                        </select>

                        <input
                          name="stateName"
                          type="hidden"
                          value={stateName}
                        />

                        <select
                          className="border p-2 w-100 my-2"
                          name="city"
                          value={city}
                          onChange={(e) => onChangeCity(e)}
                          required
                        >
                          <option value="" disabled selected hidden>
                            -Select City-
                          </option>
                          {cityOptions}
                        </select>

                        <select
                          className="border p-2 w-100 my-2"
                          name="area"
                          value={area}
                          onChange={(e) => onChangeCity(e)}
                          required
                        >
                          <option value="" disabled selected hidden>
                            -Select Area-
                          </option>
                          {areaOptions}
                        </select>

                        <input
                          name="road"
                          placeholder="Road No"
                          type="text"
                          value={road}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
                        />

                        <input
                          name="houseNo"
                          placeholder="House No"
                          type="text"
                          value={houseNo}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
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
                          name="pincode"
                          placeholder="Pincode"
                          type="text"
                          value={pincode}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                          required
                        />

                        <input
                          name="phone"
                          placeholder="Phone"
                          type="text"
                          value={phone}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />
                        <input
                          name="website"
                          placeholder="Website "
                          type="text"
                          value={website}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />

                        <button
                          type="submit"
                          className="d-block py-3 px-5 btn-block gray border-0 rounded font-weight-bold mt-3 "
                        >
                          Add
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

AddContactUs.propTypes = {
  addContactUs: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  populateCities: PropTypes.func.isRequired,
  populateAreas: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sendingLoader: state.contactus.sendingLoader,
  newCities: state.city.newCities,
  states: state.city.states,
  areas: state.city.areas,
});

export default connect(mapStateToProps, {
  addContactUs,
  getCities,
  getStates,
  populateCities,
  populateAreas,
})(AddContactUs);
