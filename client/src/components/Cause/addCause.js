import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addCause } from "../../_actions/causeAction";
import "../UI/Dashboard.css";

const AddCause = ({ history, addCause }) => {
  const [formData, setFormData] = useState({
    cause: "",
    startDate: "",
  });

  const { cause, startDate, endDate } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addCause(formData, history);
  };

  return (
    <Fragment>
      <div className="container-fluid  pb-4 mb-4">
        <form
          encType="multipart/form-data"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-info">
                    <div>
                      <h3 className="bg-info text-center text-white p-4">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Add a Cause
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <div className="my-3">
                        <input
                          name="cause"
                          placeholder="Enter a Cause"
                          type="text"
                          value={cause}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-3 w-100 my-2"
                        />
                        <small>
                          Example: covid pandemic, flood, riots etc.
                        </small>
                      </div>
                      <div>
                        <small>Start Date</small>
                        <input
                          name="startDate"
                          placeholder="Start Date"
                          type="date"
                          value={startDate}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-3 w-100 my-2"
                        />
                      </div>

                      <button
                        type="submit"
                        className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3"
                      >
                        Add
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

AddCause.propTypes = {
  addCause: PropTypes.func.isRequired,
};

export default connect(null, { addCause })(AddCause);
