import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCities,
  deleteCity,
  setCurrentCity,
} from "../../_actions/cityAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Cities = ({
  getCities,
  deleteCity,
  setCurrentCity,
  cities,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getCities();
    //eslint-disable-next-line
  }, [getCities]);

  const onDeleteHandler = (id) => {
    deleteCity(id);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <section className="container-fluid mt-4  justify-content-center ">
          <div className="container">
            <div className="row justify-content-center animated fadeIn">
              <div className="col-lg-10 col-md-10 align-item-center">
                <h2 className="text-center pt-2"> Cities </h2>
                <br />
                <div className="row">
                  <table className="table table-hover table-sm mt-2">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">City</th>
                        <th scope="col">State</th>
                        <th scope="col">Areas</th>
                        <th scope="col" className="text-right">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {cities.map((city) => (
                        <tr key={city._id}>
                          <td>{!city.city ? "NA" : city.city}</td>
                          <td>{!city.state ? "NA" : city.state}</td>
                          <td>
                            {" "}
                            <ul style={{ padding: "0", listStyleType: "none" }}>
                              {city.areas.slice(0, 4).map((area, index) => (
                                <li key={index}>{area}</li>
                              ))}
                            </ul>
                          </td>

                          <td className="text-right">
                            <Link
                              to={`/editCity/${city._id}`}
                              onClick={() => setCurrentCity(city)}
                            >
                              <i className="fa fa-edit fa-lg mr-4"></i>
                            </Link>
                            <Link
                              title="Delete"
                              to="#!"
                              onClick={() => onDeleteHandler(city._id)}
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

Cities.propTypes = {
  getCities: PropTypes.func.isRequired,
  deleteCity: PropTypes.func.isRequired,
  setCurrentCity: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.city.cities,
  filtered: state.city.filtered,
  loading: state.city.loading,
});
export default connect(mapStateToProps, {
  getCities,
  deleteCity,
  setCurrentCity,
})(Cities);
