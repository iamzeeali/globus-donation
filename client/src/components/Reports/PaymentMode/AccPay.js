import React, { Fragment, useEffect } from "react";
import { getAccPays } from "../../../_actions/accPayAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const AccPay = ({ getAccPays, accpays, match }) => {
  useEffect(() => {
    getAccPays(match.params.handle);
    //eslint-disable-next-line
  }, [getAccPays]);

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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

AccPay.propTypes = {
  getAccPays: PropTypes.func.isRequired,
  accpays: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  accpays: state.accPay.accPays,
});
export default connect(mapStateToProps, { getAccPays })(withRouter(AccPay));
