import React, { Fragment } from "react";
import "../UI/Dashboard.css";
import { Link } from "react-router-dom";
import logoGl from "../../images/logoGL.png";

const style = {
  maxHeight: 100,
  maxWidth: 140,
  paddingBottom: 10,
};

const Footer = () => {
  return (
    <Fragment>
      <div className="container mt-5"></div>
      <div className="container-fluid footer">
        <p className="mt-2">
          {" "}
          Application developed & donated by{" "}
          <Link data-toggle="modal" data-target="#exampleModalCenter" to="">
            {" "}
            <strong className="text-white">Globus Labs </strong>
          </Link>
          💝
        </p>
      </div>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Want to use this Application Free?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Contact Globus labs at-
              <em> info@globuslabs.com</em> <br />
              or call +91-7979986307
              <div>
                <img src={logoGl} alt={logoGl} style={style} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
