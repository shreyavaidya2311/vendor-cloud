import React from "react";
import Header from "./Header";
import dashboard from "../images/dashboard.png";
import inventory from "../images/inventory.png";
import registershop from "../images/registershop.png";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

class Admin extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <Grid container style={{ marginTop: "5rem" }}>
          <Grid item xs={3} style={{ margin: "3rem", marginLeft: "5rem" }}>
            <Card>
              <CardContent>
                <CardMedia
                  style={{
                    height: "13rem",
                    width: "17rem",
                    marginLeft: "3rem",
                  }}
                  image={dashboard}
                />
                <Link to="/dashboard">
                  <Button
                    size="small"
                    color="primary"
                    style={{ float: "right", margin: "1rem" }}
                    endIcon={<NavigateNextIcon />}
                  >
                    GO TO DASHBOARD
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} style={{ margin: "3rem" }}>
            <Card>
              <CardContent>
                <CardMedia
                  style={{
                    height: "13rem",
                    width: "15rem",
                    marginLeft: "4rem",
                  }}
                  image={registershop}
                />
                <Link to="/registershop">
                  <Button
                    size="small"
                    color="primary"
                    style={{ float: "right", margin: "1rem" }}
                    endIcon={<NavigateNextIcon />}
                  >
                    REGISTER A SHOP
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} style={{ margin: "3rem" }}>
            <Card>
              <CardContent>
                <CardMedia
                  style={{
                    height: "13rem",
                    width: "15rem",
                    marginLeft: "2.6rem",
                  }}
                  image={inventory}
                />
                <Link to="/inventory">
                  <Button
                    size="small"
                    color="primary"
                    style={{ float: "right", margin: "1rem" }}
                    endIcon={<NavigateNextIcon />}
                  >
                    GO TO INVENTORY
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Admin;
