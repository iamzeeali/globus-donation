import React, { Fragment } from "react";
import AccPay from "./AccPay";
import UPIPay from "./UPIPay";
import WhatsGrp from "./WhatsGrp";

const PaymentLanding = () => {
  return (
    <Fragment>
      <div className="container ml-2 mb-4 pb-4">
        <h6>Account Based Mode</h6>
        <AccPay /> <hr />
        <h6>UPI Based Mode</h6>
        <UPIPay />
        <hr />
        <h6>Whatsapp Group</h6>
        <WhatsGrp />
      </div>
    </Fragment>
  );
};

export default PaymentLanding;
