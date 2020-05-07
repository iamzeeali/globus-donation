import React, { Fragment, useEffect } from "react";
import { getAllAccPays } from "../../../_actions/accPayAction";
import { getAllUpiPays } from "../../../_actions/upiPayAction";
import { getallWhatGroups } from "../../../_actions/whatsGroupAction";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const style = {
  maxHeight: 90,
  maxWidth: 90,
};

const style2 = {
  maxHeight: 100,
  maxWidth: 140,
  paddingBottom: 10,
};

const AdminPaymentLanding = ({
  getAllAccPays,
  getAllUpiPays,
  getallWhatGroups,
  accpays,
  allUPIPays,
  whatgroups,
}) => {
  useEffect(() => {
    getAllAccPays();
    getAllUpiPays();
    getallWhatGroups();
    //eslint-disable-next-line
  }, [getAllAccPays, getAllUpiPays, getallWhatGroups]);

  return (
    <Fragment>
      <div className="container ml-2 mb-4 pb-4">
        <h6>Account Based Mode</h6>
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

        <h6>UPI Based Mode</h6>
        <div className="container">
          <div class="row">
            {allUPIPays.map((upipay) => (
              <div class="col-sm-4 mb-2">
                <div class="card border border-primary">
                  <div class="card-body ">
                    <img
                      src={upipay.UPIName}
                      alt={upipay.UPIName}
                      style={style2}
                    />
                    <p class="card-text">
                      {" "}
                      <i className="fa fa-university"></i>
                      <strong> UPI ID-</strong>
                      {!upipay.UPIid ? "NA" : upipay.UPIid}
                    </p>
                    <p class="card-text">
                      <strong>PHONE NO- </strong>
                      {upipay.phoneNo}
                    </p>

                    <div className="row">
                      <div className="col-sm-4">
                        <a
                          href={`${process.env.PUBLIC_URL}/uploads/${upipay.image}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`${process.env.PUBLIC_URL}/uploads/${upipay.image}`}
                            alt={upipay.image}
                            style={style}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr />
        <h6>Whatsapp Group</h6>
        <div className="container">
          <div class="row">
            {whatgroups.map((acc) => (
              <div class="col-sm-4 mb-2">
                <div class="card border border-success">
                  <div class="card-body ">
                    <h5 class="card-title">Join our Whatsapp Group</h5>
                    <p class="card-text">
                      {" "}
                      <i className="fa fa-whatsapp mr-2"></i>
                      <strong>Group Link- </strong>{" "}
                      <a
                        href={acc.groupLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {acc.groupLink}
                      </a>
                    </p>
                    <p class="card-text">
                      <strong>Description- </strong>
                      {acc.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AdminPaymentLanding.propTypes = {
  getAllAccPays: PropTypes.func.isRequired,
  getAllUpiPays: PropTypes.func.isRequired,
  getallWhatGroups: PropTypes.func.isRequired,
  accpays: PropTypes.array.isRequired,
  allUPIPays: PropTypes.array.isRequired,
  whatgroups: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  accpays: state.accPay.allAccPays,
  allUPIPays: state.upiPay.allUPIPays,
  whatgroups: state.whatgroup.whatgroups,
});
export default connect(mapStateToProps, {
  getAllAccPays,
  getAllUpiPays,
  getallWhatGroups,
})(withRouter(AdminPaymentLanding));
