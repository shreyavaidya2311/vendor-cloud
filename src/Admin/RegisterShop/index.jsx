import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
  TextField,
  Grid,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Header from "../Header";
import axios from "axios";
import { connect } from "react-redux";
import * as ELG from "esri-leaflet-geocoder";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
class RegisterShop extends React.Component {
  state = {
    shopName: "",
    shopCategory: "Grocery",
    shopAddress: "",
    shopCity: "",
    cityData: [],
    addressData: [],
    checked: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddressSearch = () => {
    new ELG.geocode().address(this.state.shopAddress).run((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        addressData: [
          results.results[0].text,
          results.results[0].bounds,
          results.results[0].latlng,
        ],
      });
    });
  };

  handleCitySearch = () => {
    new ELG.geocode().address(this.state.shopCity).run((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        cityData: [
          results.results[0].text,
          results.results[0].bounds,
          results.results[0].latlng,
        ],
      });
    });
    console.log(this.state.cityData);
  };
  handleChecked = () => {
    this.setState({ checked: !this.state.checked });
    this.handleAddressSearch();
    this.handleCitySearch();
  };
  handleButton = () => {
    this.handleAddressSearch();
    this.handleCitySearch();
    let adminId = this.props.auth.user.id;
    const {
      shopName,
      shopCategory,
      shopAddress,
      shopCity,
      cityData,
      addressData,
    } = this.state;
    axios
      .post(`http://localhost:5000/api/stores/addStore/${adminId}`, {
        shopName,
        shopAddress,
        shopCategory,
        shopCity,
        cityData,
        addressData,
      })
      .then((res) => {
        console.log(res);
        //this.props.history.push("/admin");
      });
  };

  render() {
    const GreenCheckbox = withStyles({
      root: {
        color: green[400],
        "&$checked": {
          color: green[600],
        },
      },
      checked: {},
    })(Checkbox);

    console.log(this.state);
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
                  id="shopName"
                  label="Shop Name"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <Select
                  name="shopCategory"
                  variant="outlined"
                  required
                  fullWidth
                  id="shopCategory"
                  label="Shop Category"
                  onChange={this.handleChange}
                  value={this.state.shopCategory}
                >
                  <MenuItem value={"Grocery"}>Grocery</MenuItem>
                  <MenuItem value={"Stationary and Novelties"}>
                    Stationary and Novelties
                  </MenuItem>
                  <MenuItem value={"Pharmacy"}>Pharmacy</MenuItem>
                  <MenuItem value={"Clothing and Accessories"}>
                    Clothing and Accessories
                  </MenuItem>
                  <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
                </Select>
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
                <TextField
                  name="shopCity"
                  variant="outlined"
                  required
                  fullWidth
                  id="shopCity"
                  label="Shop City"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        checked={this.state.checked}
                        onChange={this.handleChecked}
                        name="checked"
                      />
                    }
                    label="I confirm that this is the correct location of my shop"
                  />
                </FormGroup>
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
