import React from "react";
import Header from "../Header";
import OrderList from "./dashboard";
import { Typography, Grid } from "@material-ui/core";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Grid container justify="center">
          <Typography variant="overline" style={{ fontSize: "1.5rem" }}>
            Orders to Ship
          </Typography>
        </Grid>
        <OrderList />
      </div>
    );
  }
}

export default Dashboard;
