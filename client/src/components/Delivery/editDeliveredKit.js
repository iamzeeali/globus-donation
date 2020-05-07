import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editRation, getCurrentRation } from "../../_actions/deliveryAction";
import { getGrocerys } from "../../_actions/kitTypeAction";
import {
  getCities,
  populateAreas,
  getStates,
  populateCities,
} from "../../_actions/cityAction";

import "../UI/Dashboard.css";
import { Link } from "react-router-dom";
import moment from "moment";

const EditRation = ({
  ration: { ration, loading },
  match,
  history,
  editRation,
  getGrocerys,
  getStates,
  getCities,
  states,
  cities,
  areas,
  grocerys,
  populateCities,
  populateAreas,
}) => {
  const [formData, setFormData] = useState({
    orgId: "",
    orgName: "",
    kitType: "",
    kitQuantity: "",
    state: "",
    city: "",
    area: "",
    road: "",
    landmark: "",
    description: "",
    date: new Date(),
  });

  //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD');
  useEffect(() => {
    getGrocerys();
    getStates();
    getCities();

    getCurrentRation(match.params.id);
    setFormData({
      kitType: loading || !ration.kitType ? "" : ration.kitType,
      kitQuantity: loading || !ration.kitQuantity ? "" : ration.kitQuantity,
      state: loading || !ration.state ? "" : ration.state,
      city: loading || !ration.city ? "" : ration.city,
      area: loading || !ration.area ? "" : ration.area,
      road: loading || !ration.road ? "" : ration.road,
      landmark: loading || !ration.landmark ? "" : ration.landmark,
      description: loading || !ration.description ? "" : ration.description,

      date:
        loading || !ration.date ? "" : moment(ration.date).format("YYYY-MM-DD"),
    });
    //eslint-disable-next-line
  }, [loading, getCurrentRation, getGrocerys]);

  const {
    kitType,
    kitQuantity,
    state,
    city,
    area,
    road,
    landmark,
    description,
    date,
  } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeState = (e) => {
    e.preventDefault();

    setFormData({ ...formData, state: e.target.value });
    populateCities(e.target.value);
  };

  const onChangeCity = (e) => {
    e.preventDefault();

    setFormData({ ...formData, city: e.target.value });
    populateAreas(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editRation(formData, history, match.params.id);
  };

  let groceryTypeOptn = grocerys.map((groce) => (
    <option key={groce._id} value={groce._id}>
      {groce.kitType}
    </option>
  ));

  let stateOptions = states.map((st) => (
    <option key={st._id} value={st.state}>
      {st.state}
    </option>
  ));

  let cityOptions = cities.map((cit) => (
    <option key={cit._id} value={cit.city}>
      {cit.city}
    </option>
  ));

  let areaOptions = areas.map((ar) => (
    <Fragment>
      <option value={ar}>{ar}</option>
    </Fragment>
  ));

  return (
    <Fragment>
      <div className="container-fluid pb-4 mb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <div className="">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-7 col-md-10 align-item-center">
                <div className="bg-light border border-warning">
                  <div>
                    <h3 className="bg-warning text-center p-4">
                      <Link to="/dashboard" className="text-white">
                        <i className="fa fa-arrow-left mr-2 float-left"></i>
                      </Link>{" "}
                      Edit Delivered Kit
                    </h3>
                  </div>
                  <fieldset className="p-4">
                    <select
                      className="border p-2 w-100 my-2"
                      name="kitType"
                      value={kitType}
                      onChange={(e) => onChangeHandler(e)}
                      required
                      selected={kitType}
                    >
                      <option value={kitType}>{kitType}</option>
                      {groceryTypeOptn}
                    </select>

                    <input
                      name="kitQuantity"
                      placeholder="No. of Ration Kit"
                      type="number"
                      value={kitQuantity}
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
                      selected={state}
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
                      selected={city}
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
                      selected={area}
                    >
                      <option value={area}>{area}</option>
                      {areaOptions}
                    </select>
                    <input
                      name="road"
                      placeholder="Road"
                      type="text"
                      value={road}
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
                      name="description"
                      placeholder="Description"
                      type="text"
                      value={description}
                      onChange={(e) => onChangeHandler(e)}
                      className="border p-2 w-100 my-2"
                    />

                    <div>
                      <small>Select Date</small>
                      <input
                        name="date"
                        placeholder="Date"
                        type="date"
                        value={date}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-2 w-100 my-2"
                      />
                    </div>

                    <button
                      type="submit"
                      className="d-block btn-block py-3 px-5 bg-warning border-0 rounded font-weight-bold mt-3"
                    >
                      Save
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditRation.propTypes = {
  editRation: PropTypes.func.isRequired,
  getCurrentRation: PropTypes.func.isRequired,
  ration: PropTypes.object.isRequired,
  getGrocerys: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  populateAreas: PropTypes.func.isRequired,
  populateCities: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  ration: state.delivery,
  grocerys: state.kitType.grocerys,
  areas: state.city.areas,
  cities: state.city.newCities,
  states: state.city.states,
});
export default connect(mapStateToProps, {
  editRation,
  getCurrentRation,
  getGrocerys,
  getStates,
  getCities,
  populateAreas,
  populateCities,
})(EditRation);
