import React from "react";
import Admin from "./Admin/index";
import Dashboard from "./Admin/Dashboard/index";
import RegisterShop from "./Admin/RegisterShop/index";
import Inventory from "./Admin/Inventory/index";
import User from "./User/index";
import Cart from "./User/Cart/index";
import AdminLogin from "./Admin/Login/AdminLogin";
import AdminRegister from "./Admin/Login/AdminRegister";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
        <Route path="/admin" component={Admin}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/registershop" component={RegisterShop}></Route>
        <Route path="/inventory" component={Inventory}></Route>
        <Route path="/user" component={User}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/adminlogin" component={AdminLogin}></Route>
        <Route path="/adminregister" component={AdminRegister}></Route>
      </Router>
    </Provider>
  );
}

export default App;
