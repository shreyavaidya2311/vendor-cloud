import React from "react";
import Header from "../Header";
import ViewCart from "./ViewCart";

class Cart extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ViewCart />
      </div>
    );
  }
}

export default Cart;
