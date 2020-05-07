import React, { Fragment, useEffect } from "react";
import { getUpiPays } from "../../../_actions/upiPayAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const style = {
  maxHeight: 90,
  maxWidth: 90,
};

const style2 = {
  maxHeight: 100,
  maxWidth: 140,
  paddingBottom: 10,
};

const UPIPay = ({ getUpiPays, upipays, match }) => {
  useEffect(() => {
    getUpiPays(match.params.handle);
    //eslint-disable-next-line
  }, [getUpiPays]);

  return (
    <Fragment>
      <div className="container">
        <div class="row">
          {upipays.map((upipay) => (
            <div class="col-sm-4 mb-2">
              <div class="card border border-primary">
                <div class="card-body ">
                  <img
                    src={upipay.UPIName}
                    alt={upipay.UPIName}
                    style={style2}
                  />
                  <p class="card-text">
                    {" "}
                    <i className="fa fa-university"></i>
                    <strong> UPI ID-</strong>
                    {!upipay.UPIid ? "NA" : upipay.UPIid}
                  </p>
                  <p class="card-text">
                    <strong>PHONE NO- </strong>
                    {upipay.phoneNo}
                  </p>

                  <div className="row">
                    <div className="col-sm-4">
                      <a
                        href={`${process.env.PUBLIC_URL}/uploads/${upipay.image}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/uploads/${upipay.image}`}
                          alt={upipay.image}
                          style={style}
                        />
                      </a>
                    </div>
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

UPIPay.propTypes = {
  getUpiPays: PropTypes.func.isRequired,
  upipays: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  upipays: state.upiPay.upiPays,
});
export default connect(mapStateToProps, { getUpiPays })(withRouter(UPIPay));
