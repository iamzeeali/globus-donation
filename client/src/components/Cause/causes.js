import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  getCauses,
  deleteCause,
  setCurrentCause,
} from "../../_actions/causeAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Causes = ({
  getCauses,
  deleteCause,
  setCurrentCause,
  causes,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getCauses();
    //eslint-disable-next-line
  }, [getCauses]);

  const onDeleteHandler = (id) => {
    deleteCause(id);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="container">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-10 col-md-10 align-item-center">
                <h2 className="text-center pt-2"> Causes </h2>
                <br />
                <div className="row">
                  <table className="table table-hover table-sm mt-2">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Cause</th>
                        <th scope="col">Start date</th>
                        <th scope="col" className="text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {causes.map((cau) => (
                        <tr key={cau._id}>
                          <td>{!cau.cause ? "NA" : cau.cause}</td>
                          <td>
                            {!cau.startDate
                              ? "NA"
                              : moment(cau.startDate).format("DD-MM-YYYY")}
                          </td>

                          <td className="text-right">
                            <Link
                              to={`/editCause/${cau._id}`}
                              onClick={() => setCurrentCause(cau)}
                            >
                              <i className="fa fa-edit fa-lg mr-4"></i>
                            </Link>
                            <Link
                              title="Delete"
                              to="#!"
                              onClick={() => onDeleteHandler(cau._id)}
                            >
                              <i className="fa fa-trash text-danger fa-lg"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Causes.propTypes = {
  getCauses: PropTypes.func.isRequired,
  deleteCause: PropTypes.func.isRequired,
  setCurrentCause: PropTypes.func.isRequired,
  causes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  causes: state.cause.causes,
  filtered: state.cause.filtered,
  loading: state.cause.loading,
});
export default connect(mapStateToProps, {
  getCauses,
  deleteCause,
  setCurrentCause,
})(Causes);
