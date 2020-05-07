import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editSetting, getCurrentSetting } from "../../_actions/settingAction";
import "../UI/Dashboard.css";
import { Link } from "react-router-dom";

const EditDefaultGrocery = ({
  setting: { setting, loading },
  history,
  editSetting,
  getCurrentSetting,
  match,
  grocerys,
}) => {
  const [formData, setFormData] = useState({
    default_grocery: "",
  });

  useEffect(() => {
    getCurrentSetting(match.params.id);
    setFormData({
      default_grocery:
        loading || !setting.default_grocery ? "" : setting.default_grocery._id,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentSetting]);

  const { default_grocery } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editSetting(formData, history, match.params.id);
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
                  <div className="bg-light">
                    <div>
                      <h3 className="gray text-center p-4 text-white">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit Default Grocery
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
                        <option>Select Grocery Type</option>
                        {groceryTypeOptn}
                      </select>

                      <button
                        type="submit"
                        className="d-block py-3 px-5 gray border-0 rounded font-weight-bold mt-3 text-white"
                      >
                        Edit
                      </button>
                    </fieldset>
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

EditDefaultGrocery.propTypes = {
  editSetting: PropTypes.func.isRequired,
  getCurrentSetting: PropTypes.func.isRequired,
  grocery: PropTypes.object.isRequired,
  grocerys: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  setting: state.setting,
  grocerys: state.grocery.grocerys,
});
export default connect(mapStateToProps, { editSetting, getCurrentSetting })(
  EditDefaultGrocery
);
