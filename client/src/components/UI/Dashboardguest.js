import React, { Fragment, useEffect } from "react";
import "./Dashboard.css";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import "moment-timezone";
import { connect } from "react-redux";
import "./Dashboard.css";
import { getGuestDonationsSum } from "../../_actions/investmentAction";
import { getGuestExpenseSum } from "../../_actions/expenseAction";
import { getGuestsTotalRations } from "../../_actions/deliveryAction";
import { getOrgByHandle } from "../../_actions/OrgAction";
import { getTotalKitReq } from "../../_actions/kitReqAction";
import { loadUser } from "../../_actions/authAction";

const Dashboard = ({
  loading,
  overAllInvestment,
  overAllExpenses,
  totalRation,
  organisation,
  getOrgByHandle,
  getGuestDonationsSum,
  getGuestExpenseSum,
  getGuestsTotalRations,
  getTotalKitReq,
  totalKitReq,
  match,
}) => {
  useEffect(() => {
    loadUser();
    getOrgByHandle(match.params.handle);
    getGuestDonationsSum(match.params.handle);
    getGuestExpenseSum(match.params.handle);
    getGuestsTotalRations(match.params.handle);
    getTotalKitReq(match.params.handle);
  }, [
    getGuestDonationsSum,
    getGuestExpenseSum,
    getGuestsTotalRations,
    getOrgByHandle,
    loadUser,
  ]);

  const totalInvest = overAllInvestment.map((p) => p.totalInvest);
  const totalRationKit = totalRation.map((p) => p.totalRation);
  const totalExpense = overAllExpenses.map((p) => p.totalExpense);

  const balence = totalInvest[0] ? totalInvest[0] : 0;

  const balanceRemaining =
    Math.round((balence - (totalExpense ? totalExpense : 0)) * 100) / 100;

  let TotalNo = totalKitReq.map((tn) => tn.totalKitReq);
  // console.log(totalKitReq);
  // console.log(TotalNo);

  //filter karne ka zaurat nai h mere khyal se

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
            <div className="container">
              <div className="col-sm-12 col-md-8 col-lg-8">
                <div className="row">
                  <div className="col-lg-3 col-md-5 col-sm-6">
                    <div className="circle-tile ">
                      <div className="circle-tile-heading red">
                        <i className="fa fa-inr fa-fw fa-2x"></i>
                      </div>
                      <div className="circle-tile-content red">
                        <div className="circle-tile-description text-faded">
                          Available Donation (INR)
                        </div>
                        <div className="circle-tile-number text-faded ">
                          {balanceRemaining} ={" "}
                          <small className="text-white">{`(${
                            Math.round((balanceRemaining / 785) * 10) / 10
                          } Kit)`}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-sm-6">
                    <div className="circle-tile ">
                      <Link to={`/guestDeliveries/${match.params.handle}`}>
                        <div className="circle-tile-heading orange">
                          <i className="fa fa-medkit fa-fw fa-2x"></i>
                        </div>
                      </Link>
                      <div className="circle-tile-content orange">
                        <div className="circle-tile-description text-faded">
                          Kit Delivered
                        </div>
                        <div className="circle-tile-number text-faded ">
                          {!totalRationKit[0] ? 0 : totalRationKit[0]}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-sm-6">
                    <div className="circle-tile ">
                      <Link to={`/guestExpenses/${match.params.handle}`}>
                        <div className="circle-tile-heading cyan">
                          <i className="fa fa-cart-arrow-down fa-fw fa-2x"></i>
                        </div>
                      </Link>
                      <div className="circle-tile-content cyan">
                        <div className="circle-tile-description text-faded">
                          Total Expense (INR)
                        </div>
                        <div className="circle-tile-number text-faded ">
                          {" "}
                          {!totalExpense[0]
                            ? 0
                            : parseFloat(totalExpense).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-5 col-sm-6">
                    <div className="circle-tile ">
                      <Link to={`/guestDonations/${match.params.handle}`}>
                        <div className="circle-tile-heading green">
                          <i className="fa fa-money fa-fw fa-2x"></i>
                        </div>
                      </Link>
                      <div className="circle-tile-content green">
                        <div className="circle-tile-description text-faded">
                          {" "}
                          Total Donated Amount (INR)
                        </div>
                        <div className="circle-tile-number text-faded ">
                          {!totalInvest[0]
                            ? 0
                            : parseFloat(totalInvest).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="container mb-4 pb-4">
              <div className="row mb-1  animated fadeIn">
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to={`/guest/myreport/${match.params.handle}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white bg-dark h-100 w-100">
                      <div className="card-body bg-dark">
                        <div className="rotate">
                          <i className="fa fa-bar-chart fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase text-white">Reports</h4>
                        <small>View All Reports</small>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to={`/guest/donate-now/${match.params.handle}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white purple h-100 w-100">
                      <div className="card-body purple">
                        <div className="rotate">
                          <i className="fa fa-money fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase text-white">
                          Donate Now
                        </h4>
                        <small>Donating Options</small>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to={`/kitrequest/${match.params.handle}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white bg-warning h-100 w-100">
                      <div className="card-body bg-warning">
                        <div className="rotate">
                          <i className="fa fa-medkit fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase text-dark">
                          Kit Requests
                        </h4>

                        <div className="circle-tile-number text-center text-faded ">
                          {!TotalNo ? 0 : TotalNo}
                        </div>

                        <small>Request Kit for Needy People</small>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/contactus" style={{ textDecoration: "none" }}>
                    <div className="card text-white gray h-100 w-100">
                      <div className="card-body gray">
                        <div className="rotate">
                          <i className="fa fa-phone-square fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase text-white">
                          Get this app
                        </h4>
                        <small>
                          Contact developers to get this app for free.
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Thought */}
          <div className="container  mt-2 pt-2 mb-4 pb-4">
            <div className="card thought col-sm-6 mx-auto text-center bg-light pt-3 animated pulse">
              <p className="text-secondary">
                {organisation
                  ? organisation.dashMsg
                  : "Every act of kindness is a charity."}
              </p>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getGuestDonationsSum: PropTypes.func.isRequired,
  getGuestExpenseSum: PropTypes.func.isRequired,
  getGuestsTotalRations: PropTypes.func.isRequired,
  getOrgByHandle: PropTypes.func.isRequired,
  totalKitReq: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  overAllInvestment: state.investment.overAllInvestment,
  overAllExpenses: state.expense.overAllExpenses,
  totalRation: state.delivery.totalRation,
  organisation: state.organisation && state.organisation.organisation,
  totalKitReq: state.kitreq.totalKitReq,
});
export default connect(mapStateToProps, {
  loadUser,
  getGuestDonationsSum,
  getGuestExpenseSum,
  getGuestsTotalRations,
  getOrgByHandle,
  getTotalKitReq,
})(withRouter(Dashboard));
