import React, { Fragment, useEffect } from "react";
import { getKitReqs, setCurrentKitReq } from "../../_actions/kitReqAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const KitReq = ({ getKitReqs, kitreqs, setCurrentKitReq }) => {
  useEffect(() => {
    getKitReqs();
    //eslint-disable-next-line
  }, [getKitReqs]);

  return (
    <Fragment>
      <div className="container mb-4 pb-4">
        <div class="row">
          {kitreqs.map((cu) => (
            <div class="col-sm-4 mb-2">
              <div class="card border border-warning">
                <div class="card-body">
                  <h5 class="card-title lead">
                    <strong>{cu.name}</strong>
                  </h5>
                  <p>
                    <i className="fa fa-envelope"></i> Email: {cu.email}
                  </p>
                  <p>
                    <i className="fa fa-phone"></i> Phone: {cu.phone}
                  </p>
                  <p className="text-danger">
                    <i className="fa fa-medkit text-danger"></i> Kit Required:
                    {cu.kitQuantity}
                  </p>
                  <p>
                    {" "}
                    <i className="fa fa-map-marker"></i> Address:{" "}
                  </p>{" "}
                  <strong>House No: </strong>
                  {cu.houseNo}
                  <br />
                  <strong>Landmark: </strong>
                  {!cu.landmark ? "" : cu.landmark} <br />
                  <strong>Road No: </strong>
                  {cu.road} <br /> <strong>Area: </strong>
                  {cu.area}
                  <br />
                  <strong>City: </strong>
                  {cu.city} <br /> <strong>State: </strong>
                  {cu.stateName} <br />
                  <Link
                    to={`/editKitReq/${cu._id}`}
                    onClick={() => setCurrentKitReq(cu)}
                    className="btn btn-block btn-info mt-3"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/addDelFromReq/${cu._id}`}
                    onClick={() => setCurrentKitReq(cu)}
                    className="btn btn-block btn-warning mt-1"
                  >
                    Deliver?
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

KitReq.propTypes = {
  getKitReqs: PropTypes.func.isRequired,
  kitreqs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  kitreqs: state.kitreq.kitreqs,
});
export default connect(mapStateToProps, { getKitReqs, setCurrentKitReq })(
  KitReq
);
