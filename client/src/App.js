import React, { Fragment, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./utils/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./_actions/authAction";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Alert from "./components/UI/Alert";
import Navbar from "./components/UI/navbar";
import Login from "./components/UI/Login";

import DashboardMain from "./components/UI/DashboardMain";
import Profile from "./components/UI/Profile";
import AddInvestment from "./components/Investment/addInvestment";
import AddExpense from "./components/Expense/addExpense";
import EditInvestment from "./components/Investment/editInvestment";
import ViewExpenses from "./components/Expense/viewExpenses";
import EditExpense from "./components/Expense/editExpenses";
import ReportsLanding from "./components/Reports/reportsLanding";
import ViewAllInvestment from "./components/Reports/viewAllInvestment";
import ViewAllExpenses from "./components/Reports/viewAllExpenses";
import NotFound from "./components/UI/notFound";

import ReportsLandingGuest from "./components/Reports/GuestReport/reportsLandingGuest";
import ViewGuestRation from "./components/Reports/GuestReport/viewAllRationGuest";

import EditOrgProfile from "./components/UI/editOrgProfile";
import ForgotPassword from "./components/UI/forgotPassword";
import ResetPassword from "./components/UI/ResetPassword";
import DashboardGuest from "./components/UI/Dashboardguest";
import AddDeliveredKit from "./components/Delivery/addDeliveredKit";
import AddDeliveryFromReq from "./components/Delivery/addDeliveryFromReq";
import ViewdeliveredKit from "./components/Delivery/ViewdeliveredKit";
import EditDeliveredKit from "./components/Delivery/editDeliveredKit";
import ViewAllRation from "./components/Reports/viewAllRation";

import Footer from "./components/UI/footer";
import Payment_landing from "./components/PaymentMode/payment_landing";
import AddPayAcc from "./components/PaymentMode/addPayAcc";
import AddUPI from "./components/PaymentMode/addUPI";
import ViewPayAcc from "./components/PaymentMode/viewPayAcc";
import EditPayAcc from "./components/PaymentMode/editPayAcc";
import ViewUPI from "./components/PaymentMode/viewUPI";
import EditUPI from "./components/PaymentMode/editUPI";
import PaymentLanding from "./components/Reports/PaymentMode/PaymentLanding";
import AdminPaymentLanding from "./components/Reports/PaymentMode/AdminPaymentLanding";
import AddWhatGroup from "./components/PaymentMode/addWhatGroup";
import ViewWhatGroup from "./components/PaymentMode/viewWhatGroup";
import EditWhatGroup from "./components/PaymentMode/editWhatGroup";
import AddKit from "./components/Kit/addKit";
import ViewKit from "./components/Kit/viewKit";
import EditKit from "./components/Kit/editKit";
import SettingLanding from "./components/Setting/settingLanding";
import DefaultGrocery from "./components/Setting/defaultGrocery";
import EditdefaultGrocery from "./components/Setting/editdefaultGrocery";
import AddCity from "./components/City/AddCity";
import Cities from "./components/City/Cities";
import EditCity from "./components/City/EditCity";

import KitReq from "./components/GuestForm/kitReq";
import EditKitReq from "./components/GuestForm/editKitReq";

import ContactUs from "./components/GuestForm/contactus";
import ViewContactUs from "./components/Reports/viewContactUs";
import ViewKitReq from "./components/Reports/viewKitReq";
import OrgProfile from "./components/UI/orgProfile";
import landing from "./components/UI/landing";

import addCause from "./components/Cause/addCause";
import causes from "./components/Cause/causes";
import editCause from "./components/Cause/editCause";

import GuestDonations from "./components/Reports/GuestReport/GuestDonations";
import GuestExpenses from "./components/Reports/GuestReport/GuestExpenses";
import addDeliveryFromReq from "./components/Delivery/addDeliveryFromReq";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Navbar />
          <Switch>
            <PrivateRoute path="/dashboard" component={DashboardMain} />
            <PrivateRoute path="/admin/your_profile" component={Profile} />
            <PrivateRoute path="/admin/org_profile" component={OrgProfile} />
            <PrivateRoute
              path={`/edit-orgProfile/:id`}
              component={EditOrgProfile}
            />
            <PrivateRoute
              path="/admin/addinvestment"
              component={AddInvestment}
            />
            <PrivateRoute
              path={`/admin/editInvestment/:id`}
              component={EditInvestment}
            />
            <PrivateRoute path="/admin/addexpenses" component={AddExpense} />
            <PrivateRoute
              path={`/admin/editExpense/:id`}
              component={EditExpense}
            />
            <PrivateRoute
              path={`/admin/view-contactus`}
              component={ViewContactUs}
            />
            <PrivateRoute
              path={`/admin/view-kitrequest`}
              component={ViewKitReq}
            />
            <PrivateRoute
              path={`/admin/add-ration`}
              component={AddDeliveredKit}
            />
            <PrivateRoute
              path={`/admin/view-ration`}
              component={ViewdeliveredKit}
            />
            <PrivateRoute
              path={`/admin/editRation/:id`}
              component={EditDeliveredKit}
            />
            <PrivateRoute
              path="/addDelFromReq/:id"
              component={addDeliveryFromReq}
            />
            <PrivateRoute path={`/admin/add-kit`} component={AddKit} />
            <PrivateRoute path={`/admin/view-kit`} component={ViewKit} />
            <PrivateRoute path={`/admin/edit-kit/:id`} component={EditKit} />
            <PrivateRoute path={`/admin/payment`} component={Payment_landing} />
            <PrivateRoute
              path={`/admin/accountpayment`}
              component={AddPayAcc}
            />
            <PrivateRoute path={`/admin/upipayment`} component={AddUPI} />
            <PrivateRoute path={`/admin/view-accpay`} component={ViewPayAcc} />
            <PrivateRoute path={`/admin/view-upipay`} component={ViewUPI} />
            <PrivateRoute
              path={`/admin/editAccPay/:id`}
              component={EditPayAcc}
            />
            <PrivateRoute path={`/admin/editUpiPay/:id`} component={EditUPI} />
            <PrivateRoute path={`/admin/whatsgroup`} component={AddWhatGroup} />
            <PrivateRoute
              path={`/admin/view-whatgroup`}
              component={ViewWhatGroup}
            />
            <PrivateRoute
              path={`/admin/editWhatGroup/:id`}
              component={EditWhatGroup}
            />
            <PrivateRoute path={`/admin/setting`} component={SettingLanding} />
            <PrivateRoute
              path={`/admin/defaultGrocery`}
              component={DefaultGrocery}
            />
            <PrivateRoute
              path={`/admin/editdefaultGrocery/:id`}
              component={EditdefaultGrocery}
            />
            <PrivateRoute path="/admin/myreport" component={ReportsLanding} />
            <PrivateRoute
              path="/admin/ration/allRation"
              component={ViewAllRation}
            />
            <PrivateRoute path={`/addCity`} component={AddCity} />
            <PrivateRoute path={`/cities`} component={Cities} />
            <PrivateRoute path={`/editCity/:id`} component={EditCity} />
            <PrivateRoute path="/addCause" component={addCause} />
            <PrivateRoute path="/causes" component={causes} />
            <PrivateRoute path={`/editCause/:id`} component={editCause} />
            <PrivateRoute path={`/editKitReq/:id`} component={EditKitReq} />
            <Route
              path="/guestDeliveries/:handle"
              component={ViewGuestRation}
            />
            <Route exact path="/dashboardguest" component={DashboardGuest} />
            <Route
              path="/guest/myreport/:handle"
              component={ReportsLandingGuest}
            />
            <Route
              path="/admin/donation/viewAllDonations"
              component={ViewAllInvestment}
            />
            <Route
              path="/admin/expenses/viewAllexpenses"
              component={ViewAllExpenses}
            />
            <Route path="/guestDonations/:handle" component={GuestDonations} />
            <Route path="/guestExpenses/:handle" component={GuestExpenses} />
            <Route path="/admin/view-expense" component={ViewExpenses} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={landing} />
            <Route exact path="/ngo/:handle" component={DashboardGuest} />
            <Route path="/guest/ration/allRation" component={ViewGuestRation} />
            <Route path="/admin/allPayment" component={AdminPaymentLanding} />
            <Route
              path="/guest/donate-now/:handle"
              component={PaymentLanding}
            />
            <Route path="/forgetPassword" component={ForgotPassword} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/kitrequest/:handle" component={KitReq} />
            <Route path="/contactus" component={ContactUs} />
            <Route render={NotFound} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
