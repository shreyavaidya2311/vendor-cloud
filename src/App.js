import React from "react";
import Admin from "./Admin/index";
import Dashboard from "./Admin/Dashboard/index";
import RegisterShop from "./Admin/RegisterShop/index";
import Inventory from "./Admin/Inventory/index";
import User from "./User/index";
import Cart from "./User/Cart/index";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/admin" component={Admin}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/registershop" component={RegisterShop}></Route>
      <Route path="/inventory" component={Inventory}></Route>
      <Route path="/user" component={User}></Route>
      <Route path="/cart" component={Cart}></Route>
    </Router>
  );
}

export default App;
