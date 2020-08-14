import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Update, Cancel } from "@material-ui/icons";
import Header from "../Header";

class EditProduct extends React.Component {
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
