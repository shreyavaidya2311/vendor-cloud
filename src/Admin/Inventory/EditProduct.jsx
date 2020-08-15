import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Update, Cancel } from "@material-ui/icons";
import Header from "../Header";
import axios from "axios";

class EditProduct extends React.Component {
  state = {
    productName: "",
    productCategory: "",
    productPrice: "",
    productQuantity: "",
  };

  componentDidMount() {
    this.setState({
      productName: this.props.data[1],
      productCategory: this.props.data[2],
      productPrice: this.props.data[3],
      productQuantity: this.props.data[4],
    });
  }

  handleEdit = (e) => {
    const { productCategory, productPrice, productQuantity } = this.state;
    axios
      .patch(
        `http://localhost:5000/api/products/updateItem/${this.props.data[5]}`,
        {
          productQuantity,
          productCategory,
          productPrice,
        }
      )
      .then((res) => {
        console.log(res);
        this.props.handleEditClick();
      });
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
                  Product - {this.state.productName}
                </Typography>
                <hr />
                <br />
                <TextField
                  name="productName"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  id="productName"
                  label="Product Name"
                  value={this.state.productName}
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
                  value={this.state.productCategory}
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
                  value={this.state.productPrice}
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
                  value={this.state.productQuantity}
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
                      startIcon={<Update />}
                      onClick={this.handleEdit}
                    >
                      Update
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="large"
                      startIcon={<Cancel />}
                      onClick={this.props.handleEditClick}
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

export default EditProduct;
