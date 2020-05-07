import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducer";
import error from "./errorsReducer";
import expense from "./expenseReducer";
import investment from "./investmentReducer";
import delivery from "./deliveryReducer";
import accPay from "./accPayReducer";
import upiPay from "./upiPayReducer";
import whatgroup from "./whatsGroupReducer";
import setting from "./settingReducer";
import kitType from "./kitTypeReducer";
import city from "./cityReducer";
import area from "./areaReducer";
import contactus from "./ContactUsReducer";
import kitreq from "./KitReqreducer";
import organisation from "./OrgReducer";
import cause from "./causeReducer";

export default combineReducers({
  auth,
  alert,
  error,
  expense,
  investment,
  delivery,
  accPay,
  upiPay,
  whatgroup,
  kitType,
  setting,
  city,
  area,
  organisation,
  contactus,
  kitreq,
  cause,
});
