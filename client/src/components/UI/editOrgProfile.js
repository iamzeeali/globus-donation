import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  editOrganisation,
  getCurrentOrganisation,
} from "../../_actions/OrgAction";
import "../UI/Dashboard.css";
import { Link } from "react-router-dom";

const EditOrganisation = ({
  organisation: { organisation, loading },
  history,
  editOrganisation,
  getCurrentOrganisation,
  match,
}) => {
  const [formData, setFormData] = useState({
    orgName: "",
    state: "",
    city: "",
    address: "",
    email: "",
    website: "",
    phone: "",
    logo: "",
    dashMsg: "",
  });

  //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD');
  useEffect(() => {
    getCurrentOrganisation(match.params.id);
    setFormData({
      orgName: loading || !organisation.orgName ? "" : organisation.orgName,
      state: loading || !organisation.state ? "" : organisation.state,
      city: loading || !organisation.city ? "" : organisation.city,
      address: loading || !organisation.address ? "" : organisation.address,
      logo: loading || !organisation.logo ? "" : organisation.logo,
      email: loading || !organisation.email ? "" : organisation.email,
      website: loading || !organisation.website ? "" : organisation.website,
      phone: loading || !organisation.phone ? "" : organisation.phone,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentOrganisation]);

  const {
    orgName,
    state,
    city,
    address,
    logo,
    email,
    website,
    phone,
    dashMsg,
  } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editOrganisation(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="container-fluid pb-4 mb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container ">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-danger">
                    <div>
                      <h3 className="bg-danger text-center p-4 text-white">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit Organisation
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <input
                        name="orgName"
                        placeholder="Name of Organisation"
                        type="text"
                        value={orgName}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="state"
                        placeholder="State"
                        type="text"
                        value={state}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="city"
                        placeholder="City"
                        type="text"
                        value={city}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="address"
                        placeholder="Address"
                        type="text"
                        value={address}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="email"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="website"
                        placeholder="Website"
                        type="text"
                        value={website}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="phone"
                        placeholder="Phone"
                        type="number"
                        value={phone}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="logo"
                        placeholder="Logo URL"
                        type="text"
                        value={logo}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <textarea
                        name="dashMsg"
                        placeholder="Message for Viewers"
                        type="text"
                        value={dashMsg}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <button
                        type="submit"
                        className="d-block btn-block py-3 px-5 bg-danger border-0 rounded font-weight-bold mt-3 text-white"
                      >
                        Save
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

EditOrganisation.propTypes = {
  editOrganisation: PropTypes.func.isRequired,
  getCurrentOrganisation: PropTypes.func.isRequired,
  organisation: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  organisation: state.organisation,
});
export default connect(mapStateToProps, {
  editOrganisation,
  getCurrentOrganisation,
})(EditOrganisation);
