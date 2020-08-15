import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Add, Cancel } from "@material-ui/icons";
import Header from "../Header";
import axios from "axios";

class AddProduct extends React.Component {
  state = {
    productName: "",
    productCategory: "",
    productPrice: 0,
    productQuantity: 0,
  };

  handleClick = (e) => {
    const {
      productName,
      productCategory,
      productPrice,
      productQuantity,
    } = this.state;
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_ROUTE}/api/products/addItems/${this.props.userId}`,
        { productName, productQuantity, productCategory, productPrice }
      )
      .then((res) => console.log(res));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
                  Product -
                </Typography>
                <hr />
                <br />
                <TextField
                  name="productName"
                  variant="outlined"
                  required
                  fullWidth
                  id="productName"
                  label="Product Name"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  name="productCategory"
                  variant="outlined"
                  required
                  fullWidth
                  id="productCategory"
                  label="Product Category"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  name="productPrice"
                  variant="outlined"
                  required
                  fullWidth
                  id="productPrice"
                  label="Product Price"
                  type="number"
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <TextField
                  name="productQuantity"
                  variant="outlined"
                  required
                  fullWidth
                  id="productQuantity"
                  label="Product Quantity"
                  type="number"
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
                      startIcon={<Add />}
                      onClick={this.handleClick}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="large"
                      startIcon={<Cancel />}
                      onClick={this.props.handleAddClick}
                    >
                      Cancel
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

export default AddProduct;
