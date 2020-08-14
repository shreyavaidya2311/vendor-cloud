import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserProtectedRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true && auth.user.userType === 0 ? (
        <Component {...props} />
      ) : (
        <Redirect to="/adminlogin" />
      )
    }
  />
);

UserProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserProtectedRoute);
