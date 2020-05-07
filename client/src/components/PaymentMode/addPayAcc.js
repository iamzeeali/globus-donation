import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addAccPay } from "../../_actions/accPayAction";
import "../UI/Dashboard.css";

const AddAccountPay = ({ history, addAccPay }) => {
  const [formData, setFormData] = useState({
    accountName: "",
    accountNo: "",
    ifsc: "",
    bankName: "",
    bankBranch: "",
  });

  const { accountName, accountNo, bankName, ifsc, bankBranch } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addAccPay(formData, history);
  };

  return (
    <Fragment>
      <div className="container-fluid  pb-4 mb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-purple">
                    <div>
                      <h3 className="purple text-center p-4 text-white">
                        <Link to="/admin/payment" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Add Bank Detail
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <input
                        name="accountName"
                        placeholder="Acount Holder Name"
                        type="text"
                        value={accountName}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="accountNo"
                        placeholder="Account No."
                        type="number"
                        value={accountNo}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="ifsc"
                        placeholder="IFSC Code"
                        type="text"
                        value={ifsc}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="bankName"
                        placeholder="Bank Name"
                        type="text"
                        value={bankName}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="bankBranch"
                        placeholder="Bank Branch"
                        type="text"
                        value={bankBranch}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <button
                        type="submit"
                        className="d-block py-3 px-5 purple border-0 rounded font-weight-bold mt-3 text-white"
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

AddAccountPay.propTypes = {
  addAccPay: PropTypes.func.isRequired,
};

export default connect(null, { addAccPay })(AddAccountPay);
