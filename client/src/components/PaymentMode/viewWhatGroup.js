import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getWhatGroups,
  deleteWhatGroup,
  setCurrentWhatGroup,
} from "../../_actions/whatsGroupAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewPayAcc = ({
  getWhatGroups,
  deleteWhatGroup,
  setCurrentWhatGroup,
  whatgroups,
}) => {
  useEffect(() => {
    getWhatGroups();
    //eslint-disable-next-line
  }, [getWhatGroups]);

  const onDeleteHandler = (id) => {
    deleteWhatGroup(id);
  };

  return (
    <Fragment>
      <div className="container">
        <div class="row">
          {whatgroups.map((acc) => (
            <div class="col-sm-4 mb-2">
              <div class="card border border-success">
                <div class="card-body ">
                  <h5 class="card-title">Join our Whatsapp Group</h5>
                  <p class="card-text">
                    {" "}
                    <i className="fa fa-whatsapp mr-2"></i>
                    <strong>Group Link- </strong>{" "}
                    <a
                      href={acc.groupLink}
                      target="_blank"
                      without
                      rel="noopener noreferrer"
                    >
                      {acc.groupLink}
                    </a>
                  </p>
                  <p class="card-text">
                    <strong>Description- </strong>
                    {acc.desc}
                  </p>

                  <Link
                    to={`/admin/editWhatGroup/${acc._id}`}
                    onClick={() => setCurrentWhatGroup(acc)}
                  >
                    <i className="fa fa-edit fa-lg mr-4"></i>
                  </Link>
                  <Link
                    title="Delete"
                    to="#!"
                    onClick={() => onDeleteHandler(acc._id)}
                  >
                    <i className="fa fa-trash text-danger fa-lg"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ViewPayAcc.propTypes = {
  getWhatGroups: PropTypes.func.isRequired,
  deleteWhatGroup: PropTypes.func.isRequired,
  setCurrentWhatGroup: PropTypes.func.isRequired,
  whatgroups: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  whatgroups: state.whatgroup.whatgroups,
});
export default connect(mapStateToProps, {
  getWhatGroups,
  deleteWhatGroup,
  setCurrentWhatGroup,
})(ViewPayAcc);
