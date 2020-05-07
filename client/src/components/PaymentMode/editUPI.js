import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editUpiPay, getCurrentUpiPay } from "../../_actions/upiPayAction";
import "../UI/Dashboard.css";
import { Link } from "react-router-dom";

const EditUpiPay = ({
  upipay: { upiPay, loading },
  history,
  editUpiPay,
  getCurrentUpiPay,
  match,
}) => {
  const [formData, setFormData] = useState({
    UPIName: "",
    phoneNo: "",
    UPIid: "",
    image: "",
  });

  //format('2013-03-10T02:00:00Z', 'YYYY-MM-DD');
  useEffect(() => {
    getCurrentUpiPay(match.params.id);
    setFormData({
      UPIName: loading || !upiPay.UPIName ? "" : upiPay.UPIName,
      phoneNo: loading || !upiPay.phoneNo ? "" : upiPay.phoneNo,
      UPIid: loading || !upiPay.UPIid ? "" : upiPay.UPIid,
      image: loading || !upiPay.image ? "" : upiPay.image,
    });
    //eslint-disable-next-line
  }, [loading, getCurrentUpiPay]);

  const { UPIName, phoneNo, UPIid, image } = formData;

  const onChangeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    e.preventDefault();

    setFormData({ ...formData, image: e.target.files[0] });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // for uploading images send file as blob multipart/form-data
    let formData = new FormData();

    formData.append("image", image);
    formData.append("phoneNo", phoneNo);
    formData.append("UPIid", UPIid);
    formData.append("UPIName", UPIName);

    editUpiPay(formData, history, match.params.id);
  };

  return (
    <Fragment>
      <div className="container-fluid  pb-4 mb-4">
        <form
          encType="multipart/form-data"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          <section className="login py-2 border-top-1">
            <div className="container">
              <div className="row justify-content-center animated fadeIn">
                <div className="col-lg-7 col-md-10 align-item-center">
                  <div className="bg-light">
                    <div>
                      <h3 className="purple text-center text-white p-4">
                        <Link to="/dashboard" className="text-white">
                          <i className="fa fa-arrow-left mr-2 float-left"></i>
                        </Link>{" "}
                        Edit UPI Detail
                      </h3>
                    </div>
                    <fieldset className="p-4">
                      <select
                        className="border p-3 w-100 my-2"
                        onChange={(e) => onChangeHandler(e)}
                        name="UPIName"
                        value={UPIName}
                        required
                      >
                        <option value="" className="form-control">
                          --Select UPI--
                        </option>
                        <option value="https://res.cloudinary.com/kamranjaved/image/upload/v1587197066/20200418_132851_t9kfx9.jpg">
                          PayTM
                        </option>
                        <option value="https://res.cloudinary.com/kamranjaved/image/upload/v1587197066/20200418_133126_t5j87t.jpg">
                          PhonePay
                        </option>
                        <option value="https://res.cloudinary.com/kamranjaved/image/upload/v1587197066/20200418_132939_uyudm7.jpg">
                          GPay
                        </option>
                      </select>

                      <input
                        name="phoneNo"
                        placeholder="Phone no"
                        type="number"
                        value={phoneNo}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                        required
                      />

                      <input
                        name="UPIid"
                        placeholder="UPI ID"
                        type="text"
                        value={UPIid}
                        onChange={(e) => onChangeHandler(e)}
                        className="border p-3 w-100 my-2"
                      />

                      <div>
                        <small>
                          Upload QR Code{" "}
                          <b>
                            Max-File-Size-1MB <br />
                            Supported File jpg/png
                          </b>
                        </small>
                        <input
                          placeholder="Upload QR Code"
                          type="file"
                          tdata-button="Upload QR Code"
                          name="image"
                          onChange={onChangeImage}
                          className="border p-3 w-100 my-2"
                        />{" "}
                        <br />
                      </div>

                      <button
                        type="submit"
                        className="d-block py-3 px-5 purple text-white border-0 rounded font-weight-bold mt-3"
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

EditUpiPay.propTypes = {
  editUpiPay: PropTypes.func.isRequired,
  getCurrentUpiPay: PropTypes.func.isRequired,
  accpay: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  upipay: state.upiPay,
});
export default connect(mapStateToProps, { editUpiPay, getCurrentUpiPay })(
  EditUpiPay
);
