import React, { Fragment, useEffect } from "react";
import { getWhatGroups } from "../../../_actions/whatsGroupAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const ViewPayAcc = ({ getWhatGroups, match, whatgroups }) => {
  useEffect(() => {
    getWhatGroups(match.params.handle);
    //eslint-disable-next-line
  }, [getWhatGroups]);

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
                      rel="noopener noreferrer"
                    >
                      {acc.groupLink}
                    </a>
                  </p>
                  <p class="card-text">
                    <strong>Description- </strong>
                    {acc.desc}
                  </p>
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
  whatgroups: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  whatgroups: state.whatgroup.whatgroups,
});
export default connect(mapStateToProps, { getWhatGroups })(
  withRouter(ViewPayAcc)
);
