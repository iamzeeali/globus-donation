import React, { Fragment } from "react";

import { Link, withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { connect } from "react-redux";
import "../Reports/reports.css";

const PaymentLanding = ({ loading }) => {
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <div className="container mb-4 pb-4">
              <div className="row mb-1  animated fadeIn">
                <div className="col-xl-3 col-sm-6 py-2">
                  <Link
                    to="/admin/accountpayment"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white purple h-100">
                      <div className="card-body purple">
                        <div className="rotate">
                          <i className="fa fa-university fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          Account No. Mode
                        </h3>
                        <small>Add Account Based Transcation Option</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                  <Link
                    to="/admin/upipayment"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white purple h-100">
                      <div className="card-body purple">
                        <div className="rotate">
                          <i className="fa fa-qrcode fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">UPI Mode</h3>
                        <small>Add UPI Based Transaction Option</small>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-3 col-sm-6 py-2">
                  <Link
                    to="/admin/whatsgroup"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white purple h-100">
                      <div className="card-body purple">
                        <div className="rotate">
                          <i className="fa fa-whatsapp fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          Whatsapp Group
                        </h3>
                        <small>Invite on Whatsapp Group</small>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
PaymentLanding.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, null)(withRouter(PaymentLanding));

// <div className="col-xl-3 col-sm-6 py-2">
// <Link to="/admin/investment/projectwiseinvestment" style={{ textDecoration: "none" }}>
//     <div className="card text-white bg-success h-100">
//         <div className="card-body bg-success">
//             <div className="rotate">
//                 <i className="fa fa-money fa-4x"></i>
//             </div>
//             <h3 className="text-uppercase">Prject Wise Investment</h3>
//             <small>View Total investment on Each Projects</small>
//         </div>
//     </div>
// </Link>
// </div>
