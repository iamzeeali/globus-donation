import React, { Fragment, useEffect } from "react";
import "./Dashboard.css";

import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import "moment-timezone";
import { connect } from "react-redux";
import "./Dashboard.css";
import { loadUser } from "../../_actions/authAction";
import { getOverAllSumInv } from "../../_actions/investmentAction";
import { getOverAllSumExp } from "../../_actions/expenseAction";
import { getTotalRations } from "../../_actions/deliveryAction";
import { getGrocerys } from "../../_actions/kitTypeAction";

import { logout } from "../../_actions/authAction";

const Dashboard = ({
  loading,
  overAllInvestment,
  overAllExpenses,
  getGrocerys,
  totalRation,
  grocerys,
  auth: {
    firstName,
    lastName,
    user: { username, email, role, organisation },
  },
  loadUser,
  getOverAllSumInv,
  getOverAllSumExp,
  getTotalRations,
}) => {
  useEffect(() => {
    loadUser();
    getOverAllSumInv();
    getOverAllSumExp();
    getGrocerys();
    getTotalRations();
  }, [
    loadUser,
    getOverAllSumInv,
    getOverAllSumExp,
    getTotalRations,
    getGrocerys,
  ]);

  const totalInvest = overAllInvestment.map((p) => p.totalInvest);
  const totalRationKit = totalRation.map((p) => p.totalRation);

  const totalExpense = overAllExpenses.map((p) => p.totalExpense);

  let activeKit = [];
  activeKit = grocerys.filter((p) => p.active === true);

  let Kitprice = activeKit.map((kp) => kp.price);

  const balence = totalInvest[0] ? totalInvest[0] : 0;
  const balanceRemaining =
    Math.round((balence - (totalExpense ? totalExpense : 0)) * 100) / 100;
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="ml-3 row mr-4 pb-4">
            <div className="col-lg-4 col-md-6 col-sm-6 ">
              <div className="card mb-2" style={{ width: "20rem" }}>
                <div className="card-body">
                  <Link to="/admin/your_profile">
                    <h5 className="card-title">
                      Welcome, <strong>{`${firstName} ${lastName}`}</strong>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                  </Link>
                  <em className="card-text">
                    {username} , <strong>{role}</strong>
                  </em>{" "}
                  <hr />
                  <Link to={`/admin/org_profile`} className="card-link">
                    Organisation:-{" "}
                    <strong>
                      {organisation.orgName && organisation.orgName}
                    </strong>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-8 col-lg-8">
              <div className="row">
                <div className="col-lg-3 col-md-5 col-sm-6">
                  <div className="circle-tile ">
                    <Link to="/admin/donation/viewAllDonations">
                      <div className="circle-tile-heading green">
                        <i className="fa fa-money fa-fw fa-2x"></i>
                      </div>
                    </Link>
                    <div className="circle-tile-content green">
                      <div className="circle-tile-description text-faded">
                        {" "}
                        Total Donation (INR)
                      </div>
                      <div className="circle-tile-number text-faded ">
                        {!totalInvest[0]
                          ? 0
                          : parseFloat(totalInvest).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-5 col-sm-6">
                  <div className="circle-tile ">
                    <Link to="/admin/expenses/viewAllexpenses">
                      <div className="circle-tile-heading cyan">
                        <i className="fa fa-cart-arrow-down fa-fw fa-2x"></i>
                      </div>
                    </Link>
                    <div className="circle-tile-content cyan">
                      <div className="circle-tile-description text-faded">
                        Total Expense (INR)
                      </div>
                      <div className="circle-tile-number text-faded ">
                        {!totalExpense[0]
                          ? 0
                          : parseFloat(totalExpense).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-5 col-sm-6">
                  <div className="circle-tile ">
                    <Link to="/admin/ration/allRation">
                      <div className="circle-tile-heading orange">
                        <i className="fa fa fa-medkit fa-fw fa-2x"></i>
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
                    <div className="circle-tile-heading red">
                      <i className="fa fa-inr fa-fw fa-2x"></i>
                    </div>
                    <div className="circle-tile-content red">
                      <div className="circle-tile-description text-faded">
                        Balance (INR)
                      </div>
                      <div className="circle-tile-number text-faded ">
                        {balanceRemaining} ={" "}
                        <small className="text-white">{`(${
                          Math.round((balanceRemaining / Kitprice[0]) * 10) / 10
                        } Kit)`}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="container pb-4 mb-4">
              <div className="row mb-1  animated fadeIn">
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to="/admin/addinvestment"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white bg-success h-100 w-100">
                      <div className="card-body bg-success">
                        <div className="rotate">
                          <i className="fa fa-money fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase">Add Donation</h4>
                        <small>Add new Donation</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to="/admin/addexpenses"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white bg-info h-100 w-100">
                      <div className="card-body bg-info">
                        <div className="rotate">
                          <i className="fa fa-shopping-cart fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase">Add Expenses</h4>
                        <small>New Expense</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link
                    to="/admin/add-ration"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card text-white bg-warning h-100 w-100">
                      <div className="card-body bg-warning">
                        <div className="rotate">
                          <i className="fa fa-medkit fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase">Add Delivered Kit</h4>
                        <small>Add New Delivered Kit</small>
                      </div>
                    </div>
                  </Link>
                </div>{" "}
                <br />
                <div className="col-xl-2 col-sm-6 py-2">
                  <Link to="/admin/myreport" style={{ textDecoration: "none" }}>
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
                  <Link to="/admin/setting" style={{ textDecoration: "none" }}>
                    <div className="card text-white gray h-100 w-100">
                      <div className="card-body gray">
                        <div className="rotate">
                          <i className="fa fa fa-cog fa-4x"></i>
                        </div>
                        <h4 className="text-uppercase">Settings</h4>
                        <small>Change App Settings</small>
                      </div>
                    </div>
                  </Link>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getOverAllSumInv: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getOverAllSumExp: PropTypes.func.isRequired,
  getTotalRations: PropTypes.func.isRequired,
  getGrocerys: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.auth.loading,
  overAllInvestment: state.investment.overAllInvestment,
  overAllExpenses: state.expense.overAllExpenses,
  totalRation: state.delivery.totalRation,
  grocerys: state.kitType.grocerys,
});

export default connect(mapStateToProps, {
  loadUser,
  logout,
  getOverAllSumInv,
  getOverAllSumExp,
  getTotalRations,
  getGrocerys,
})(withRouter(Dashboard));
