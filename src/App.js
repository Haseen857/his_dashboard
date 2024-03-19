import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import "./scss/style.scss";

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const store =
  JSON.parse(window.localStorage.getItem("Status")) ||
  JSON.parse(window.localStorage.getItem("otpEmail")) ||
  JSON.parse(window.localStorage.getItem("UnVerifiedEmail"))
    ? true
    : false;

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
// const Login = React.lazy(() => import("./views/pages/login/Login"));
const Login = React.lazy(() => import("./Containers/Login"));
const Register = React.lazy(() => import("./Containers/Register"));

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const VerifyEmail = React.lazy(() =>
  import("./Containers/ForgetPassword/ForgotPassword")
);

const ResetPassword = React.lazy(() =>
  import("./Containers/ForgetPassword/ResetPassword")
);
const Otp = React.lazy(() => import("./Containers/ForgetPassword/otp"));
const DashboardLock = React.lazy(() =>
  import("./views/pages/DashboardLock/Dashboardlocak.js")
);
const Docupdate = React.lazy(() =>
  import("./Containers/Hospital/HospitaluploadUpdate")
);

// import { logout } from "./actions/auth";
// import { clearMessage } from "./actions/message";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />

            {/* <Route
              exact
              path="/otp"
              name="Otp Page"
              render={(props) => <Otp {...props} />}
            /> */}
            {/* <PrivateRoute
              path="/onlyAuthorizedAllowedHere/"
              component={(props) => <Otp {...props} />}
            /> */}

            <Route
              exact
              path="/otp"
              name="Otp Page"
              // render={(props) => {
              //   return store ? (
              //     <Otp {...props} />
              //   ) : (
              //     <Redirect
              //       to={{ pathname: "/login", state: { from: props.location } }}
              //     />
              //   );
              // }}
              render={(props) => <Otp {...props} />}
            />
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/verifyemail"
              name="VerifyEmail"
              render={(props) => <VerifyEmail {...props} />}
            />
            <Route
              path="/resetpassword"
              name="ResetPassword"
              render={(props) => <ResetPassword {...props} />}
            />
            <Route
              path="/dashboardlock"
              name="Dashboard"
              render={(props) => <DashboardLock {...props} />}
            />
            <Route
              path="/documentupdate"
              name="Document Update"
              render={(props) => <Docupdate {...props} />}
            />

            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Dashboard"
              render={(props) => <DefaultLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
