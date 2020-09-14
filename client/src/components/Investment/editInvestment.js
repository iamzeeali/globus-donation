import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  editInvestment,
  getCurrentInvestment,
} from "../../_actions/investmentAction";
import { getCauses } from "../../_actions/causeAction";

import "../UI/Dashboard.css";
import { Link } from "react-router-dom";
import moment from "moment";

const EditInvestment = ({
  investment: { investment, loading },
  history,
  editInvestment,
  getCurrentInvestment,
  match,
  getCauses,
  causes,
}) => {
  const [formData, setFormData] = useState({
    cause: "",
    amount: "",
    investor: "",
    country: "",
    date: new Date(),
    image: "",
  });

  //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD');
  useEffect(() => {
    getCauses();
    getCurrentInvestment(match.params.id);
    setFormData({
      cause: loading || !investment.cause.cause ? "" : investment.cause.cause,

      amount: loading || !investment.amount ? "" : investment.amount,
      investor: loading || !investment.investor ? "" : investment.investor,
      country: loading || !investment.country ? "" : investment.country,
      date:
        loading || !investment.date
          ? ""
          : moment(investment.date).format("YYYY-MM-DD"),
      image: loading || !investment.image ? "" : investment.image,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentInvestment, getCauses]);

  const { amount, investor, country, date, image, cause } = formData;

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

    formData.append("cause", cause);

    formData.append("image", image);
    formData.append("amount", amount);
    formData.append("date", date);
    formData.append("investor", investor);
    formData.append("country", country);

    editInvestment(formData, history, match.params.id);
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
                        <Link
                          to="//admin/donation/viewAllDonations"
                          className="text-white"
                        >
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit Donation
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <select
                        className="border p-3 w-100 my-2"
                        name="cause"
                        value={cause}
                        onChange={(e) => onChangeHandler(e)}
                        required
                        selected={cause}
                      >
                        <option value={cause}>{cause}</option>
                        {causeOptions}
                      </select>

                      <input
                        name="investor"
                        placeholder="Donor"
                        type="text"
                        value={investor}
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
                      />

                      <input
                        name="country"
                        placeholder="Donor Country"
                        type="text"
                        value={country}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
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
                        className="d-block py-3 px-5 bg-success text-white border-0 rounded font-weight-bold mt-3"
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

EditInvestment.propTypes = {
  editInvestment: PropTypes.func.isRequired,
  getCurrentInvestment: PropTypes.func.isRequired,
  investment: PropTypes.object.isRequired,
  getCauses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  investment: state.investment,
  causes: state.cause.causes,
});
export default connect(mapStateToProps, {
  editInvestment,
  getCurrentInvestment,
  getCauses,
})(EditInvestment);
