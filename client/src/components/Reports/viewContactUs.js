import React, { Fragment, useEffect } from "react";
import { getContactUss } from "../../_actions/ContactUsAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ContactUs = ({ getContactUss, contacts }) => {
  useEffect(() => {
    getContactUss();
    //eslint-disable-next-line
  }, [getContactUss]);

  return (
    <Fragment>
      <div className="container mb-4 pb-4">
        <div class="row">
          {contacts.map((cu) => (
            <div class="col-sm-4 mb-2">
              <div class="card border border-dark">
                <div class="card-body">
                  <h5 class="card-title">
                    {cu.name}, <strong>{cu.ngo}</strong>
                  </h5>
                  <p class="card-text">
                    {" "}
                    <i className="fa fa-envelope"></i> Email- {cu.email}
                  </p>{" "}
                  <hr />
                  <p class="card-text">
                    {" "}
                    <i className="fa fa-phone"></i> Phone- {cu.phone}
                  </p>
                  <hr />
                  <p class="card-text">
                    {" "}
                    <i className="fa fa-globe"></i> Website- {cu.website}
                  </p>
                  <hr />
                  <p class="card-text">
                    {" "}
                    <i className="fa fa-map-marker"></i> Address-{" "}
                  </p>
                  <em>
                    {" "}
                    <strong>House No-</strong>
                    {cu.houseNo}, <strong>Landmark-</strong>
                    {!cu.landmark ? "" : cu.landmark} <br />
                    <strong>Road No-</strong>
                    {cu.road}, <strong>Area-</strong>
                    {cu.area}
                    <br />
                    <strong>City-</strong>
                    {cu.city}, <strong>State-</strong>
                    {cu.stateName} <br />
                    <strong>Pincode-</strong>
                    {cu.pincode}
                  </em>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ContactUs.propTypes = {
  getContactUss: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: state.contactus.contacts,
});
export default connect(mapStateToProps, { getContactUss })(ContactUs);
