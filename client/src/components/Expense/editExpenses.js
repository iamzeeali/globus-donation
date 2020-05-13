import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { editExpense, getCurrentExpense } from "../../_actions/expenseAction";
import moment from "moment";
import "../UI/Dashboard.css";
import { getCauses } from "../../_actions/causeAction";

const EditExpense = ({
  expense: { expense, loading },
  history,
  editExpense,
  getCurrentExpense,
  getCauses,
  causes,
  match,
}) => {
  const [formData, setFormData] = useState({
    cause: "",
    expensor: "",
    amount: "",
    date: new Date(),
    purpose: "",
    image: "",
  });

  useEffect(() => {
    getCurrentExpense(match.params.id);
    setFormData({
      cause: loading || !expense.cause.cause ? "" : expense.cause.cause,

      amount: loading || !expense.amount ? "" : expense.amount,
      date:
        loading || !expense.date
          ? ""
          : moment(expense.date).format("YYYY-MM-DD"),
      expensor: loading || !expense.expensor ? "" : expense.expensor,
      purpose: loading || !expense.purpose ? "" : expense.purpose,
      image: loading || !expense.image ? "" : expense.image,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentExpense]);

  const { amount, date, purpose, expensor, image, cause } = formData;

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
    formData.append("purpose", purpose);
    formData.append("date", date);
    formData.append("expensor", expensor);

    editExpense(formData, history, match.params.id);
  };

  let causeOptions = causes.map((cs) => (
    <option key={cs._id} value={cs._id}>
      {cs.cause}
    </option>
  ));

  return (
    <Fragment>
      <div className="container-fluid  pb-4 mb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-info">
                    <div>
                      <h3 className="bg-info text-center text-white p-4">
                        <Link to="/admin/view-expense" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit Expense
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

                      <input
                        name="purpose"
                        placeholder="Purpose"
                        type="text"
                        value={purpose}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <div>
                        <small>
                          Upload Recipt{" "}
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
                        className="d-block py-3 px-5 bg-info text-white border-0 rounded font-weight-bold mt-3"
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

EditExpense.propTypes = {
  editExpense: PropTypes.func.isRequired,
  getCurrentExpense: PropTypes.func.isRequired,
  expense: PropTypes.object.isRequired,
  getCauses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  expense: state.expense,
  causes: state.cause.causes,
});
export default connect(mapStateToProps, {
  editExpense,
  getCurrentExpense,
  getCauses,
})(EditExpense);
