import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAccPays,
  deleteAccPay,
  setCurrentAccPay,
} from "../../_actions/accPayAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewPayAcc = ({
  getAccPays,
  deleteAccPay,
  setCurrentAccPay,
  accpays,
}) => {
  useEffect(() => {
    getAccPays();
    //eslint-disable-next-line
  }, [getAccPays]);

  const onDeleteHandler = (id) => {
    deleteAccPay(id);
  };

  return (
    <Fragment>
      <div className="container">
        <div class="row">
          {accpays.map((acc) => (
            <div class="col-sm-4 mb-2">
              <div class="card border border-danger">
                <div class="card-body">
                  <h5 class="card-title">{acc.accountName}</h5>
                  <p class="card-text">
                    {" "}
                    <i className="fa fa-university"></i> Account No-{" "}
                    {acc.accountNo}
                  </p>
                  <p class="card-text">
                    <strong>IFSC- </strong>
                    {acc.ifsc}
                  </p>
                  <p class="card-text">
                    <strong>BANK NAME- </strong>
                    {acc.bankName}
                  </p>
                  <p class="card-text">
                    <strong>BANK BRANCH- </strong>
                    {acc.bankBranch}
                  </p>

                  <Link
                    to={`/admin/editAccPay/${acc._id}`}
                    onClick={() => setCurrentAccPay(acc)}
                  >
                    <i className="fa fa-edit fa-lg mr-4"></i>
                  </Link>
                  <Link
                    title="Delete"
                    to="#!"
                    onClick={() => onDeleteHandler(acc._id)}
                  >
                    <i className="fa fa-trash text-danger fa-lg"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ViewPayAcc.propTypes = {
  getAccPays: PropTypes.func.isRequired,
  deleteAccPay: PropTypes.func.isRequired,
  setCurrentAccPay: PropTypes.func.isRequired,
  accpays: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  accpays: state.accPay.accPays,
});
export default connect(mapStateToProps, {
  getAccPays,
  deleteAccPay,
  setCurrentAccPay,
})(ViewPayAcc);

//
