import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getRations,
  deleteRation,
  setCurrentRation,
} from "../../_actions/deliveryAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewRation = ({
  getRations,
  deleteRation,
  setCurrentRation,
  rations,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getRations();
    //eslint-disable-next-line
  }, [getRations]);

  const onDeleteHandler = (id) => {
    deleteRation(id);
  };

  const [state, setState] = useState({
    sortDate: [],
    isToggle: false,
  });
  const { isToggle } = state;

  const datesort1 = (e) => {
    let newDateSort = rations;
    if (isToggle === false) {
      newDateSort.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    } else {
      newDateSort.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    setState({
      sortDate: newDateSort,
    });
  };

  const datesort = (e) => {
    setState({
      isToggle: !isToggle,
    });
    datesort1();
  };

  return (
    <Fragment>
      <div className="container-fluid pb-4 mb-4">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="row justify-content-center animated fadeIn">
            <div className="col-lg-10 col-md-10 align-item-center">
              <h2 className="text-center pt-2"> Delivered Kits </h2>
              <br />
              <div className="row">
                <table className="table table-hover table-sm mt-2">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" onClick={datesort}>
                        Date
                      </th>
                      <th scope="col">Cause</th>

                      <th scope="col">Kit type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">State</th>
                      <th scope="col">City</th>
                      <th scope="col">Area</th>
                      <th scope="col">Road</th>
                      <th scope="col">House No</th>
                      <th scope="col">Landmark</th>
                      <th scope="col">Description</th>
                      <th scope="col" className="text-right">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rations.map((ration) => (
                      <tr key={ration._id}>
                        <td>{moment(ration.date).format("DD-MM-YYYY")}</td>
                        <td>{!ration.cause ? "NA" : ration.cause.cause}</td>
                        <td>{!ration.kitType ? "NA" : ration.kitType}</td>
                        <td>
                          {!ration.kitQuantity ? "NA" : ration.kitQuantity}
                        </td>
                        <td>{!ration.state ? "NA" : ration.state}</td>

                        <td>{!ration.city ? "NA" : ration.city}</td>
                        <td>{!ration.area ? "NA" : ration.area}</td>
                        <td className="text-danger">
                          {!ration.road ? "NA" : ration.road}
                        </td>
                        <td className="text-danger">
                          {!ration.houseNo ? "NA" : ration.houseNo}
                        </td>
                        <td>{!ration.landmark ? "NA" : ration.landmark}</td>

                        <td>
                          {!ration.description ? "NA" : ration.description}
                        </td>

                        <td className="text-right">
                          <Link
                            to={`/admin/editRation/${ration._id}`}
                            onClick={() => setCurrentRation(ration)}
                          >
                            <i className="fa fa-edit fa-lg mr-4"></i>
                          </Link>
                          <Link
                            title="Delete"
                            to="#!"
                            onClick={() => onDeleteHandler(ration._id)}
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
        </section>
      </div>
    </Fragment>
  );
};

ViewRation.propTypes = {
  getRations: PropTypes.func.isRequired,
  deleteRation: PropTypes.func.isRequired,
  setCurrentRation: PropTypes.func.isRequired,
  rations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  rations: state.delivery.rations,
  filtered: state.delivery.filtered,
  loading: state.delivery.loading,
});
export default connect(mapStateToProps, {
  getRations,
  deleteRation,
  setCurrentRation,
})(ViewRation);

// const datesort1 = (e) => {
//     let newDateSort = rations
//     if (isOldestFirst) {
//         newDateSort.sort((a, b) => a.amount - b.amount)
//     } else {
//         newDateSort.sort((a, b) => b.amount - a.amount)
//     }
//     setState({
//         isOldestFirst: false,
//         sortDate: newDateSort
//     })
// }
