import React, { Fragment, useEffect, useState } from "react";
import { getAllRations } from "../../_actions/deliveryAction";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactToExcel from "react-html-table-to-excel";

const RationMaster = ({ getAllRations, allRations }) => {
  useEffect(() => {
    getAllRations();
    //eslint-disable-next-line
  }, [getAllRations]);

  const [state, setState] = useState({
    sortDate: [],
    isToggle: false,
  });
  const { isToggle } = state;

  const datesort1 = (e) => {
    let newDateSort = allRations;
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
      <div className="container-fluid  pb-4 mb-4">
        <section className=" mt-2  justify-content-center ">
          <div className="row justify-content-center animated fadeIn">
            <div className="col-lg-10 col-md-10 align-item-center">
              <h2 className="text-center pt-2"> Total Delivered Kit</h2>

              <br />
              <div className="row">
                <table
                  className="table table-hover table-sm mt-2"
                  id="table-inv"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" onClick={datesort}>
                        Date
                      </th>
                      <th scope="col">Kit type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">State</th>
                      <th scope="col">City</th>
                      <th scope="col">Area</th>
                      <th scope="col">Road</th>
                      <th scope="col">House No</th>
                      <th scope="col">Landmark</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allRations.map((ration) => (
                      <tr key={ration._id}>
                        <td>{moment(ration.date).format("DD-MM-YYYY")}</td>
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
                        <td>{!ration.landmark ? "NA" : ration.area}</td>

                        <td>
                          {!ration.description ? "NA" : ration.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <ReactToExcel
            className="btn-sm btn btn-danger "
            table="table-inv" // id of table which you want to export
            filename={`Rat-${Date.now()}`} // name of the file
            sheet="sheet"
            buttonText="Export Table" // button name
          />
        </div>
      </div>
    </Fragment>
  );
};

RationMaster.propTypes = {
  getAllRations: PropTypes.func.isRequired,
  allRations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allRations: state.delivery.allRations,
  filtered: state.delivery.filtered,
  loading: state.delivery.loading,
});
export default connect(mapStateToProps, { getAllRations })(RationMaster);

// const datesort1 = (e) => {
//     let newDateSort = allRations
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
