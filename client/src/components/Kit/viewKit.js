import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getGrocerys,
  deleteGrocery,
  setCurrentGrocery,
} from "../../_actions/kitTypeAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ViewGrocery = ({
  getGrocerys,
  deleteGrocery,
  setCurrentGrocery,
  grocerys,
}) => {
  useEffect(() => {
    getGrocerys();
    //eslint-disable-next-line
  }, [getGrocerys]);

  const onDeleteHandler = (id) => {
    deleteGrocery(id);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {grocerys.map((groc) => (
            <div className="col-sm-4 mb-2" key={groc._id}>
              <div className="card border border-danger">
                <div className="card-body">
                  <h5 className="card-title">{groc.kitType}</h5>
                  <p className="card-text">Price- {groc.price}</p>
                  {groc.items.map((item, index) => (
                    <em key={index}> {item}</em>
                  ))}{" "}
                  <br /> <br />
                  <div className="row ml-2">
                    <Link
                      to={`/admin/edit-kit/${groc._id}`}
                      onClick={() => setCurrentGrocery(groc)}
                    >
                      <i className="fa fa-edit fa-lg mr-4"></i>
                    </Link>
                    <Link
                      title="Delete"
                      to="#!"
                      onClick={() => onDeleteHandler(groc._id)}
                    >
                      <i className="fa fa-trash text-danger fa-lg"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ViewGrocery.propTypes = {
  getGrocerys: PropTypes.func.isRequired,
  deleteGrocery: PropTypes.func.isRequired,
  setCurrentGrocery: PropTypes.func.isRequired,
  grocerys: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  grocerys: state.kitType.grocerys,
});
export default connect(mapStateToProps, {
  getGrocerys,
  deleteGrocery,
  setCurrentGrocery,
})(ViewGrocery);
