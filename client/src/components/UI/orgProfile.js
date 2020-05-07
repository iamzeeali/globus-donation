import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import "./Dashboard.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { loadUser } from "../../_actions/authAction";
import { setCurrentOrganisation } from "../../_actions/OrgAction";

const OrgProfile = ({ organisation, setCurrentOrganisation }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Fragment>
      <section className="user-profile section animated fadeInUp">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-lg-3 offset-lg-0">
              <div className="sidebar">
                <div className="widget user shadow p-3 mb-5 bg-white rounded">
                  <div className="image d-flex justify-content-center">
                    <img
                      src={organisation.logo}
                      width="250"
                      height="100"
                      alt=""
                      className=""
                    />
                  </div>
                  <h5 className="text-center">{organisation.orgName}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-10 offset-md-1 col-lg-9 offset-lg-0">
              <div className="widget welcome-message">
                <Link
                  to={`/edit-orgProfile/${organisation._id}`}
                  onClick={() => setCurrentOrganisation(organisation)}
                >
                  <h2>
                    View profile{" "}
                    <i
                      className="fa fa-pencil-square fa-lg ml-4"
                      data-toggle="tooltip"
                      title="Edit Details"
                    ></i>
                  </h2>
                </Link>
                <p>{organisation.dashMsg && organisation.dashMsg}</p>
              </div>

              <div className="row">
                <div className="col-lg-10 col-md-10">
                  <div className="widget personal-info">
                    <h3>
                      <strong>Organisation Name- </strong>
                      {organisation.orgName}
                    </h3>

                    <h3>
                      <strong>Phone- </strong>
                      {organisation.phone}
                    </h3>
                    <h3>
                      <strong>Email- </strong>
                      {organisation.email}
                    </h3>
                    <h3>
                      <strong>Website- </strong>
                      {organisation.website}
                    </h3>

                    <h3>
                      <strong>State- </strong>
                      {organisation.state}
                    </h3>
                    <h3>
                      <strong>City- </strong>
                      {organisation.city}
                    </h3>

                    <h3>
                      <strong>Address- </strong>
                      {organisation.address}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

OrgProfile.propTypes = {
  user: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  setCurrentOrganisation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  organisation: state.auth.user.organisation
    ? state.auth.user.organisation
    : "",
});

export default connect(mapStateToProps, { loadUser, setCurrentOrganisation })(
  OrgProfile
);

//encType="multipart/form-data"
