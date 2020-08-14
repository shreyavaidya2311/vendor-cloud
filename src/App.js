import React from "react";
import Admin from "./Admin/index";
import Dashboard from "./Admin/Dashboard/index";
import RegisterShop from "./Admin/RegisterShop/index";
import Inventory from "./Admin/Inventory/index";
import User from "./User/index";
import Cart from "./User/Cart/index";
import AdminLogin from "./Admin/Login/AdminLogin";
import Login from "./User/Login/Login";
import Register from "./User/Login/Register";
import AdminRegister from "./Admin/Login/AdminRegister";
import AdminProtectedRoute from "./Admin/ProtectedRoute/AdminProtectedRoute";
import UserProtectedRoute from "./User/ProtectedRoute/UserProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import "materialize-css/dist/css/materialize.min.css";

import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/auth/authActions";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <AdminProtectedRoute exact path="/admin" component={Admin} />
          <AdminProtectedRoute
            path="/dashboard"
            component={Dashboard}
          ></AdminProtectedRoute>
          <AdminProtectedRoute
            path="/registershop"
            component={RegisterShop}
          ></AdminProtectedRoute>
        </Switch>
        <Switch>
          <AdminProtectedRoute
            path="/inventory"
            component={Inventory}
          ></AdminProtectedRoute>
          <UserProtectedRoute
            path="/user"
            component={User}
          ></UserProtectedRoute>
          <UserProtectedRoute
            path="/cart"
            component={Cart}
          ></UserProtectedRoute>
        </Switch>
        <Route path="/adminlogin" component={AdminLogin}></Route>
        <Route path="/adminregister" component={AdminRegister}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Router>
    </Provider>
  );
}

export default App;
