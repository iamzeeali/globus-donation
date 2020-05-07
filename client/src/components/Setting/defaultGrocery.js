import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addSetting } from "../../_actions/settingAction";
import { getGrocerys } from "../../_actions/kitTypeAction";
import {
  getSettings,
  setCurrentSetting,
  deleteSetting,
} from "../../_actions/settingAction";

import "../UI/Dashboard.css";

const DefaultGrocery = ({
  getGrocerys,
  getSettings,
  deleteSetting,
  history,
  addSetting,
  grocerys,
}) => {
  const [formData, setFormData] = useState({
    default_grocery: "",
  });

  useEffect(() => {
    getGrocerys();
    getSettings();
  }, [getGrocerys, getSettings]);

  const { default_grocery } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addSetting(formData, history);
  };

  let groceryTypeOptn = grocerys.map((groce) => (
    <option key={groce._id} value={groce._id}>
      {groce.kitType}
    </option>
  ));

  return (
    <Fragment>
      <div className="container-fluid">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light ">
                    <div>
                      <h3 className="gray text-center p-4 text-white">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Set Active Kit
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <select
                        className="border p-3 w-100 my-2"
                        name="default_grocery"
                        value={default_grocery}
                        onChange={(e) => onChangeHandler(e)}
                        required
                      >
                        <option>Select Default Grocery</option>
                        {groceryTypeOptn}
                      </select>

                      <button
                        type="submit"
                        className="d-block py-3 px-5 gray border-0 rounded font-weight-bold mt-3 text-white"
                      >
                        Save
                      </button>
                    </fieldset>
                  </div>
                  <br />
                  <div></div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

DefaultGrocery.propTypes = {
  addSetting: PropTypes.func.isRequired,
  getGrocerys: PropTypes.func.isRequired,
  getSettings: PropTypes.func.isRequired,
  grocerys: PropTypes.array.isRequired,
  setCurrentSetting: PropTypes.func.isRequired,
  deleteSetting: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  grocerys: state.grocery.grocerys,
  settings: state.setting.settings,
});

export default connect(mapStateToProps, {
  addSetting,
  getGrocerys,
  getSettings,
  setCurrentSetting,
  deleteSetting,
})(DefaultGrocery);
