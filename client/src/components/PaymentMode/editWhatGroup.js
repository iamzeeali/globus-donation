import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  editWhatGroup,
  getCurrentWhatGroup,
} from "../../_actions/whatsGroupAction";
import "../UI/Dashboard.css";
import { Link } from "react-router-dom";

const EditWhatGroup = ({
  whatgroup: { whatgroup, loading },
  history,
  editWhatGroup,
  getCurrentWhatGroup,
  match,
}) => {
  const [formData, setFormData] = useState({
    groupLink: "",
    desc: "",
  });

  //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD');
  useEffect(() => {
    getCurrentWhatGroup(match.params.id);
    setFormData({
      groupLink: loading || !whatgroup.groupLink ? "" : whatgroup.groupLink,
      desc: loading || !whatgroup.desc ? "" : whatgroup.desc,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentWhatGroup]);

  const { groupLink, desc } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editWhatGroup(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="container-fluid  pb-4 mb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-purple">
                    <div>
                      <h3 className="purple text-center p-4 text-white">
                        <Link to="/admin/payment" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit Whatsapp Group Link
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <input
                        name="groupLink"
                        placeholder="WhatsApp Group Link"
                        type="text"
                        value={groupLink}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="desc"
                        placeholder="Description"
                        type="text"
                        value={desc}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <button
                        type="submit"
                        className="d-block py-3 px-5 purple border-0 rounded font-weight-bold mt-3 text-white"
                      >
                        Edit
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

EditWhatGroup.propTypes = {
  editWhatGroup: PropTypes.func.isRequired,
  getCurrentWhatGroup: PropTypes.func.isRequired,
  accpay: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  whatgroup: state.whatgroup,
});
export default connect(mapStateToProps, { editWhatGroup, getCurrentWhatGroup })(
  EditWhatGroup
);
