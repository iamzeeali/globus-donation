import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editGrocery, getCurrentGrocery } from "../../_actions/kitTypeAction";
import "../UI/Dashboard.css";
import { Link } from "react-router-dom";

const EditGrocery = ({
  grocery: { grocery, loading },
  history,
  editGrocery,
  getCurrentGrocery,
  match,
}) => {
  const [formData, setFormData] = useState({
    kitType: "",
    price: "",
    items: "",
  });

  //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD');
  useEffect(() => {
    getCurrentGrocery(match.params.id);
    setFormData({
      kitType: loading || !grocery.kitType ? "" : grocery.kitType,
      price: loading || !grocery.price ? "" : grocery.price,
      items: loading || !grocery.items ? "" : grocery.items,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentGrocery]);

  const { kitType, items, price } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editGrocery(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="container-fluid pb-4 mb-4">
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light border border-danger">
                    <div>
                      <h3 className="bg-danger text-center p-4 text-white">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit Grocery Kit
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <input
                        name="kitType"
                        placeholder="Name of Grocery Kit"
                        type="text"
                        value={kitType}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="price"
                        placeholder="Total Price"
                        type="text"
                        value={price}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <input
                        name="items"
                        placeholder="Grocery Items "
                        type="text"
                        value={items}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />
                      <small className="text-muted">
                        Enter comma separated values. Eg: Rice-10kg
                        Flour-10Kg,etc.
                      </small>

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

EditGrocery.propTypes = {
  editGrocery: PropTypes.func.isRequired,
  getCurrentGrocery: PropTypes.func.isRequired,
  grocery: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  grocery: state.kitType,
});
export default connect(mapStateToProps, { editGrocery, getCurrentGrocery })(
  EditGrocery
);
