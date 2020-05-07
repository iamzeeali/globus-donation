import React, { Fragment } from "react";

import { Link, withRouter } from "react-router-dom";
import Spinner from "../UI/Spinner";
import { connect } from "react-redux";
import "../Reports/reports.css";

const SettingLanding = ({ loading }) => {
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <div className="container-fluid mb-4 pb-4">
              <div className="row mb-1  animated fadeIn">
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to="/admin/defaultGrocery"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white gray h-100">
                      <div className="card-body gray">
                        <div className="rotate">
                          <i className="fa fa-cutlery fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          Set Default Grocery
                        </h3>
                        <small>Set Default Grocery Pack</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/addCity" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-info h-100">
                      <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fa fa-building fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">Add City</h3>
                        <small>Add new City in Location</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/cities" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-info h-100">
                      <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fa fa-building fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">View City</h3>
                        <small>View Added Cities</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/admin/add-kit" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-danger h-100">
                      <div className="card-body bg-danger">
                        <div className="rotate">
                          <i className="fa fa-cutlery fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          Add Grocery Kit
                        </h3>
                        <small> Add new Grocery Kit</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/admin/view-kit" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-danger h-100">
                      <div className="card-body bg-danger">
                        <div className="rotate">
                          <i className="fa fa-cutlery fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          View Grocery Kit
                        </h3>
                        <small>View Added Grocery Kit</small>
                      </div>
                    </div>
                  </Link>
                </div>{" "}
                <br />
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/admin/payment" style={{ textDecoration: "none" }}>
                    <div className="card text-white purple h-100">
                      <div className="card-body purple">
                        <div className="rotate">
                          <i className="fa fa-cc-paypal fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          Add Payment Modes
                        </h3>
                        <small> Add new Payment Mode</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to="/admin/allPayment"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white purple h-100">
                      <div className="card-body purple">
                        <div className="rotate">
                          <i className="fa fa-cc-paypal fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          View Payment Mode
                        </h3>
                        <small> View added Payment Modes</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/addCause" style={{ textDecoration: "none" }}>
                    <div className="card text-white bg-secondary h-100">
                      <div className="card-body bg-secondary">
                        <div className="rotate">
                          <i className="fa fa-question-circle fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">Add Cause</h3>
                        <small> Add a new cause </small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/causes" style={{ textDecoration: "none" }}>
                    <div className="card text-white  h-100">
                      <div className="card-body bg-secondary">
                        <div className="rotate">
                          <i className="fa fa-question-circle fa-4x"></i>
                        </div>
                        <h3 className="text-uppercase text-white">
                          View Cause
                        </h3>
                        <small> View and manage causes </small>
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
SettingLanding.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, null)(withRouter(SettingLanding));

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
