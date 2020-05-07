import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addExpense } from "../../_actions/expenseAction";
import { getAllUsers } from "../../_actions/authAction";
import { getCauses } from "../../_actions/causeAction";
import "../UI/Dashboard.css";

const AddExpense = ({
  history,
  getAllUsers,
  addExpense,
  getCauses,
  causes,
}) => {
  const [formData, setFormData] = useState({
    cause: "",
    amount: "",
    expensor: "",
    date: new Date(),
    image: "",
    purpose: "",
  });

  const { expensor, amount, date, image, purpose, cause } = formData;

  useEffect(() => {
    getAllUsers();
    getCauses();
    //eslint-disable-next-line
  }, [getAllUsers, getCauses]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    e.preventDefault();
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("image", image);
    formData.append("amount", amount);
    formData.append("date", date);
    formData.append("purpose", purpose);
    formData.append("expensor", expensor);
    formData.append("cause", cause);

    addExpense(formData, history);
  };

  let causeOptions = causes.map((cs) => (
    <option key={cs._id} value={cs._id}>
      {cs.cause}
    </option>
  ));

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
                        Add Expense
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <select
                        className="border p-3 w-100 my-2"
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
                      <input
                        name="expensor"
                        placeholder="Expensed by"
                        type="text"
                        value={expensor}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="amount"
                        placeholder="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <div>
                        <small>Select Date</small>
                        <input
                          name="date"
                          placeholder="Date"
                          type="date"
                          value={date}
                          onChange={(e) => onChangeHandler(e)}
                          className="border p-3 w-100 my-2"
                        />
                      </div>
                      <textarea
                        name="purpose"
                        placeholder="Purpose"
                        type="text"
                        value={purpose}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <div>
                        <small>
                          Upload Recipt{" "}
                          <b>
                            Max-File-Size-1MB <br />
                            Supported File types: jpg/png
                          </b>
                        </small>
                        <input
                          placeholder="Upload Receipt"
                          type="file"
                          tdata-button="Upload Recipt"
                          onChange={onChangeImage}
                          className="border p-3 w-100 my-2"
                        />
                      </div>

                      <button
                        type="submit"
                        className="d-block btn-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3"
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

AddExpense.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  getCauses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.auth.users,
  causes: state.cause.causes,
});
export default connect(mapStateToProps, { addExpense, getAllUsers, getCauses })(
  AddExpense
);
