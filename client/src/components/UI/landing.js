import React, { useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAllOrganisations,
  setCurrentOrganisation,
  filterOrg,
  clearFilter,
} from "../../_actions/OrgAction";

const Landing = ({
  isAuthenticated,
  getAllOrganisations,
  filterOrg,
  clearFilter,
  filtered,
  organisations,
}) => {
  const text = useRef("");

  useEffect(() => {
    getAllOrganisations();
    if (filtered === null) {
      text.current.value = "";
    }
  }, []);

  const onChangeHandler = (e) => {
    if (text.current.value !== null) {
      filterOrg(e.target.value);
    } else {
      clearFilter();
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="land ">
      <div class="container h-100 w-100 mb-5">
        <div class="justify-content-center h-100">
          <div class="searchbar">
            <input
              class="search_input"
              type="text"
              name=""
              placeholder="search organisations..."
              onChange={(e) => onChangeHandler(e)}
              ref={text}
            />
          </div>
        </div>
      </div>

      <div className="container ">
        <div className="org-head text-center">
          <h2 className="text-center lead">
            List of Organisations in our platform.
          </h2>
          <small>Click to views their respective dashboards</small>
        </div>

        <div className="row">
          {filtered
            ? filtered.map((org) => (
                <div class="col-md-4" key={org._id}>
                  <div class="widget-area no-padding blank">
                    <div class="social-widget">
                      <span id="googleplus">
                        <Link to={`/ngo/${org.handle}`}>
                          <h3 style={{ color: "#fff" }} className="py-5 lead">
                            {org.orgName}
                          </h3>
                        </Link>
                      </span>
                      <ul>
                        <li>
                          <p>
                            {org.state}
                            <i>State</i>
                          </p>
                        </li>
                        <li>
                          <p>
                            {org.city}
                            <i>City</i>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            : organisations.map((org) => (
                <div class="col-md-4" key={org._id}>
                  <div class="widget-area no-padding blank">
                    <div class="social-widget">
                      <span id="googleplus">
                        <Link to={`/ngo/${org.handle}`}>
                          <h3 style={{ color: "#fff" }} className="py-5 lead">
                            {org.orgName}
                          </h3>
                        </Link>
                      </span>
                      <ul>
                        <li>
                          <p>
                            {org.state}
                            <i>State</i>
                          </p>
                        </li>
                        <li>
                          <p>
                            {org.city}
                            <i>City</i>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      <div className="container h-100 py-5"></div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  getAllOrganisations: PropTypes.func.isRequired,
  filterOrg: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  organisations: state.organisation.allOrganisations,
  filtered: state.organisation.filtered,
});

export default connect(mapStateToProps, {
  getAllOrganisations,
  filterOrg,
  clearFilter,
})(Landing);
