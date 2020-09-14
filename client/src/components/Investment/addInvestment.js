import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addInvestment } from "../../_actions/investmentAction";
import { getAllUsers } from "../../_actions/authAction";
import { getCauses } from "../../_actions/causeAction";
import "../UI/Dashboard.css";

const AddInvestment = ({
  history,
  getAllUsers,
  addInvestment,
  getCauses,
  causes,
  users,
}) => {
  const [formData, setFormData] = useState({
    cause: "",
    investor: "",
    amount: "",
    country: "",
    date: new Date(),
    image: "",
  });

  const { investor, amount, country, date, image, cause } = formData;

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
    // for uploading images send file as blob multipart/form-data
    let formData = new FormData();

    formData.append("image", image);
    formData.append("amount", amount);
    formData.append("date", date);
    formData.append("country", country);
    formData.append("investor", investor);
    formData.append("cause", cause);
    addInvestment(formData, history);
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
                  <div className="bg-light border border-success">
                    <div>
                      <h3 className="bg-success text-center text-white p-4">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Add Donation
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
                        name="investor"
                        placeholder="Donor"
                        type="text"
                        value={investor}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
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

                      <input
                        name="country"
                        placeholder="Donor Country"
                        type="text"
                        value={country}
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
                          required
                        />
                      </div>

                      <div>
                        <small>
                          Upload Receipt{" "}
                          <b>
                            Max-File-Size-1MB <br />
                            Supported File jpg/png
                          </b>
                        </small>
                        <input
                          placeholder="Upload Receipt"
                          type="file"
                          tdata-button="Upload Recipt"
                          name="image"
                          onChange={onChangeImage}
                          className="border p-3 w-100 my-2"
                        />{" "}
                        <br />
                      </div>

                      <button
                        type="submit"
                        className="d-block btn-block py-3 px-5 bg-success text-white border-0 rounded font-weight-bold mt-3"
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

AddInvestment.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  addInvestment: PropTypes.func.isRequired,
  getCauses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  users: state.auth.users,
  causes: state.cause.causes,
});
export default connect(mapStateToProps, {
  addInvestment,
  getAllUsers,
  getCauses,
})(AddInvestment);

// <DatePicker
// name="date"
// className="border p-3 w-100 my-2"
// value={date}
// selected={date} onChange={e => onChangeHandler(e)} />

//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&format=1
//http://data.fixer.io/api/latest?access_key=e1fa4d7e2b5bad4ea01a717111e7824d&symbols=INR,USD,SAR,OMR,KWD,AED,BHD,QAR,GBP&format=1
// import axios from 'axios'

// <input name="date"
// placeholder="Date"
// selected={Date.now()}
// type="date"
// value={date}
// onChange={e => onChangeHandler(e)} className="border p-3 w-100 my-2" required />
