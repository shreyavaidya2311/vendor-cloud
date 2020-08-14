import React from "react";
import Header from "../Header";
import ControlledAccordions from "../Dashboard/dashboard";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ControlledAccordions />
      </div>
    );
  }
}

export default Dashboard;
