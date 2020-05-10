import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addDelivery, searchDelivery } from "../../_actions/deliveryAction";
import { getGrocerys } from "../../_actions/kitTypeAction";
import { getCauses } from "../../_actions/causeAction";
import { getCurrentKitReq, editKitReq } from "../../_actions/kitReqAction";

import {
  getCities,
  populateAreas,
  getStates,
  populateCities,
} from "../../_actions/cityAction";
import "../UI/Dashboard.css";

const AddDeliveredKit = ({
  history,
  addDelivery,
  searchDelivery,
  getGrocerys,
  kitReq,
  editKitReq,
  loading,
  getCurrentKitReq,
  getCauses,
  getCities,
  getStates,
  causes,
  states,
  newCities,
  areas,
  grocerys,
  deliveries,
  populateAreas,
  populateCities,
  match,
}) => {
  const [formData, setFormData] = useState({
    cause: "",
    kitType: "",
    kitQuantity: "",
    state: "",
    city: "",
    area: "",
    road: "",
    houseNo: "",
    landmark: "",
    description: "",
    date: new Date(),
  });

  const [updateBool, setUpdateBool] = useState({
    active: false,
  });

  const [searchStringData, setSearchStringData] = useState({
    searchString: "",
  });

  const {
    cause,
    kitType,
    kitQuantity,
    state,
    city,
    area,
    road,
    landmark,
    description,
    date,
    houseNo,
  } = formData;
  const { searchString } = searchStringData;

  useEffect(() => {
    console.log(kitReq);
    getGrocerys();
    getCities();
    getStates();
    getCauses();
    getCurrentKitReq(match.params.id);
    setFormData({
      kitQuantity: kitReq.kitQuantity && kitReq.kitQuantity,
      state: !kitReq.state ? "" : kitReq.state,
      city: !kitReq.city ? "" : kitReq.city,
      area: !kitReq.area ? "" : kitReq.area,
      road: !kitReq.road ? "" : kitReq.road,
      houseNo: !kitReq.houseNo ? "" : kitReq.houseNo,
      landmark: !kitReq.landmark ? "" : kitReq.landmark,
      description: !kitReq.description ? "" : kitReq.description,

      date: !kitReq.date ? "" : moment(kitReq.date).format("YYYY-MM-DD"),
    });
  }, [getGrocerys, getCities, getStates, getCauses, getCurrentKitReq]);

  // ON CHANGE HANDLERS....
  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeCity = (e) => {
    e.preventDefault();

    setFormData({ ...formData, city: e.target.value });
    populateAreas(e.target.value);
  };

  const onChangeState = (e) => {
    e.preventDefault();

    setFormData({ ...formData, state: e.target.value });
    populateCities(e.target.value);
  };

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchStringData({
      ...searchStringData,
      [e.target.name]: e.target.value,
    });
  };

  //SUBMIT HANDLERS....
  const onSubmitHandler = (e) => {
    e.preventDefault();
    editKitReq(kitReq._id && kitReq._id, updateBool);
    addDelivery(formData, history);
  };

  const onSearchHandler = (e) => {
    e.preventDefault();
    searchDelivery(searchStringData, history, state, city, area);
  };

  let groceryTypeOptn = grocerys.map((groce) => (
    <option key={groce._id} value={groce.kitType}>
      {groce.kitType}
    </option>
  ));

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

  let causeOptions = causes.map((cs) => (
    <option key={cs._id} value={cs._id}>
      {cs.cause}
    </option>
  ));

  return (
    <Fragment>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-sm-8">
            <form onSubmit={(e) => onSearchHandler(e)}>
              <div className="container">
                <div className="row justify-content-center animated fadeIn">
                  <div className="col-lg-12 col-md-12">
                    <div className="bg-light border border-warning">
                      <fieldset className="p-4">
                        <select
                          className="border p-2 w-25 my-2"
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
                          className="border p-2 w-25 my-2"
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
                          className="border p-2 w-25 my-2"
                          name="area"
                          value={area}
                          onChange={(e) => onChangeHandler(e)}
                          required
                          defaultValue={{
                            label: "Select Area",
                            value: 0,
                          }}
                        >
                          <option value="">-Select Area-</option>
                          {areaOptions}
                        </select>

                        <input
                          name="searchString"
                          placeholder="Search term..."
                          type="text"
                          value={searchString}
                          onChange={(e) => onChangeSearch(e)}
                          className="border p-2 w-25 my-2"
                          required
                        />

                        <button
                          type="submit"
                          className="d-block w-100 py-2 px-5 bg-warning border-0 rounded font-weight-bold mt-3"
                        >
                          Search
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <table className="table table-hover table-sm my-5">
              <thead className="thead-dark" align="center">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Org.Name</th>
                  <th scope="col">Kit type</th>
                  <th scope="col">Qty</th>
                  <th scope="col">State</th>
                  <th scope="col">City</th>
                  <th scope="col">Area</th>
                  <th scope="col">Road</th>
                  <th scope="col">Landmark</th>
                  <th scope="col">House No </th>
                </tr>
              </thead>
              <tbody>
                {deliveries
                  ? deliveries.map((del) => (
                      <tr key={del._id}>
                        <td>{moment(del.date).format("DD-MM-YYYY")}</td>
                        <td>{del.orgName}</td>
                        <td>{del.kitType}</td>
                        <td>{del.kitQuantity}</td>
                        <td>{del.state}</td>
                        <td>{del.city}</td>
                        <td>{del.area}</td>
                        <td className="text-danger">{del.road}</td>
                        <td>{del.landmark}</td>
                        <td className="text-danger">{del.houseNo}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>

          <div className="col-sm-4">
            <form onSubmit={(e) => onSubmitHandler(e)}>
              <div className="">
                <div className="row animated fadeIn">
                  <div className="col-lg-12 col-md-12 ">
                    <div className="bg-light border border-warning">
                      <div>
                        <h3 className="bg-warning text-center p-4">
                          <Link to="/dashboard" className="text-white">
                            <i className="fa fa-arrow-left mr-2 float-left"></i>
                          </Link>{" "}
                          Add Delivered Kit
                        </h3>
                      </div>
                      <fieldset className="p-4">
                        <div>
                          <small>Select Date</small>
                          <input
                            name="date"
                            placeholder={date}
                            type="date"
                            value={date}
                            onChange={(e) => onChangeHandler(e)}
                            className="border p-2 w-100 my-2"
                          />
                        </div>
                        <select
                          className="border p-2 w-100 my-2"
                          name="cause"
                          value={cause}
                          onChange={(e) => onChangeHandler(e)}
                          required
                        >
                          <option value="" disabled selected hidden>
                            -Select Cause-
                          </option>
                          {causeOptions}
                        </select>

                        <select
                          className="border p-2 w-100 my-2"
                          name="kitType"
                          value={kitType}
                          onChange={(e) => onChangeHandler(e)}
                          required
                        >
                          <option value="" disabled selected hidden>
                            -Select Kit Type-
                          </option>
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
                          name="description"
                          placeholder="Description"
                          type="text"
                          value={description}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-2 w-100 my-2"
                        />

                        <button
                          type="submit"
                          className="d-block btn-block py-3 px-5 bg-warning border-0 rounded font-weight-bold mt-3"
                        >
                          Add
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AddDeliveredKit.propTypes = {
  addDelivery: PropTypes.func.isRequired,
  searchDelivery: PropTypes.func.isRequired,
  getGrocerys: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
  populateAreas: PropTypes.func.isRequired,
  populateCities: PropTypes.func.isRequired,
  getCauses: PropTypes.func.isRequired,
  getCurrentKitReq: PropTypes.func.isRequired,
  editKitReq: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  grocerys: state.kitType.grocerys,
  deliveries: state.delivery.deliveries,
  areas: state.city.areas,
  cities: state.city.cities,
  states: state.city.states,
  newCities: state.city.newCities,
  causes: state.cause.causes,
  kitReq: state.kitreq.kitreq,
  loading: state.kitreq.loading,
});
export default connect(mapStateToProps, {
  addDelivery,
  searchDelivery,
  getGrocerys,
  getCities,
  getStates,
  populateAreas,
  populateCities,
  getCauses,
  editKitReq,
  getCurrentKitReq,
})(AddDeliveredKit);
