import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Header from "../Header";
import axios from "axios";
import { connect } from "react-redux";
class RegisterShop extends React.Component {
  state = {
    shopName: "",
    shopCategory: "",
    shopAddress: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleButton = (e) => {
    let adminId = this.props.auth.user.id;
    const { shopName, shopCategory, shopAddress } = this.state;
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ROUTE}/api/stores/addStore/${adminId}`,
        {
          shopName,
          shopAddress,
          shopCategory,
        }
      )
      .then((res) => {
        console.log(res);
        this.props.history.push("/admin");
      });
  };

  render() {
    return (
      <div>
        <Header />
        <Grid justify="center" container>
          <Card variant="outlined" style={{ margin: "2rem", width: "35rem" }}>
            <CardContent>
              <form>
                <Typography
                  style={{ fontSize: "1rem" }}
                  variant="overline"
                  display="block"
                >
                  Register a Shop
                </Typography>
                <hr />
                <br />
                <TextField
                  name="shopName"
                  variant="outlined"
                  required
                  fullWidth
                  id="productName"
                  label="Shop Name"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  name="shopCategory"
                  variant="outlined"
                  required
                  fullWidth
                  id="shopCategory"
                  label="Shop Category"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  name="shopAddress"
                  variant="outlined"
                  required
                  fullWidth
                  id="shopAddress"
                  label="Shop Address"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <Grid justify="center" spacing={3} container>
                  <Grid item>
                    <Button
                      variant="outlined"
                      size="large"
                      style={{ color: blue[500] }}
                      startIcon={<CheckBoxIcon />}
                      onClick={this.handleButton}
                    >
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(RegisterShop);
