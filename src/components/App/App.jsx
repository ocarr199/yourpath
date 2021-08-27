// ⬇ What dependencies we need to import
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
// ⬇ What custom components we need to import
import "./App.css";
import Admin from "../Admin/Admin";
import ClientFacing from "../ClientFacing/ClientFacing";
import Dashboard from "../Dashboard/Dashboard";
import Footer from "../Footer/Footer";
import LandingPage from "../LandingPage/LandingPage";
import NewPassword from "../NewPassword/NewPassword";
import Patient from "../Patient/Patient";
import PatientDetail from "../PatientDetail/PatientDetail";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Provider from "../Provider/Provider";
import ProviderDetail from "../ProviderDetail/ProviderDetail";
import RegisterPage from "../RegisterPage/RegisterPage";
import SideNav from "../SideNav/SideNav";
import Specialties from "../Specialty/Specialty";
import SuccessPage from "../NewPassword/SuccessPage";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4974a5",
    },
    secondary: {
      main: "#ac264d",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <ThemeProvider theme={theme}>
          <SideNav>
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              <ProtectedRoute
                exact
                path="/admin"
              >
                <Admin />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/patient"
              >
                <Patient />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/patientDetail/:id"
              >
                <PatientDetail />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/provider"
              >
                <Provider />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/providerDetail/:id"
              >
                <ProviderDetail />
              </ProtectedRoute>

              {/* Not protected because it is for patients */}
              <Route exact path="/patientDetail/recommendation/:id/:token">
                <ClientFacing />
              </Route>

              <Route exact path="/register/:token">
                <NewPassword />
              </Route>

              <Route exact path="/success">
                <SuccessPage />
              </Route>

              <Route
                exact
                path="/specialties"
              >
                <Specialties />
              </Route>

              <ProtectedRoute
                exact
                path="/user"
              >
                <Dashboard />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/login"
                authRedirect="/user"
              >
                <LandingPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/registration"
              >
                <RegisterPage />
              </ProtectedRoute>

              <ProtectedRoute
                exact
                path="/home"
                authRedirect="/user"
              >
                <LandingPage />
              </ProtectedRoute>

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
            <Footer />
          </SideNav>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
