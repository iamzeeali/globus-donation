import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminDashboard from "./DashboardAdmin";
import DelBoyDashboard from "./DashboardDelBoy";

const Dashboard = ({ auth: { isAuthenticated, role } }) => {
  let dashboard;
  if (isAuthenticated && role === "admin") {
    dashboard = <AdminDashboard />;
  } else {
    dashboard = <DelBoyDashboard />;
  }

  return <Fragment>{dashboard}</Fragment>;
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Dashboard));
