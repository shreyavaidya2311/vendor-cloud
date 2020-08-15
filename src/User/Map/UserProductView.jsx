import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Grid, Typography, IconButton } from "@material-ui/core";
import Header from "../Header";
import { blue } from "@material-ui/core/colors";
import { ShoppingCart, Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { connect } from "react-redux";

class UserProductView extends React.Component {
  state = {
    storeName: null,
    productData: [],
    productQuantity: 1,
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/api/products/getProductsByStore/5f36b5247337b4a0e52f5cf0`
      )
      .then((res) => {
        this.setState({ productData: res.data });
        console.log(res.data);
      });
    const { name } = this.props.location.state;
    this.setState({ storeName: name });
    const { storeId } = this.props.match.params;
    console.log(storeId);
  }
  render() {
    return (
      <div>
        <Header />
        <Grid justify="center" container>
          <Typography style={{ fontSize: "1.5rem" }} variant="overline">
            Welcome to {this.state.storeName}
          </Typography>
        </Grid>
        <Grid justify="center" container>
          {this.state.productData.map((product) => (
            <Grid item xs={4}>
              <Card variant="outlined" style={{ margin: "2rem" }}>
                <CardContent>
                  <Typography
                    style={{ fontSize: "1rem" }}
                    variant="overline"
                    display="block"
                  >
                    Product - {product.productName}
                  </Typography>
                  <hr />
                  <Typography
                    style={{ fontSize: "1rem" }}
                    variant="overline"
                    display="block"
                  >
                    Price - {product.price}
                  </Typography>
                  <Typography
                    style={{ fontSize: "1rem" }}
                    variant="overline"
                    display="block"
                  >
                    Product Category - {product.category}
                  </Typography>
                  <Grid container justify="space-between">
                    <Grid item>
                      <Button
                        variant="outlined"
                        size="large"
                        style={{ color: blue[500] }}
                        startIcon={<ShoppingCart />}
                      >
                        Add to Cart
                      </Button>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          if (this.state.productQuantity < 0) {
                            this.setState({
                              ...this.state,
                              productQuantity: this.state.productQuantity - 1,
                            });
                          } else {
                            this.setState({
                              productQuantity: 1,
                            });
                          }
                        }}
                      >
                        <Remove />
                      </IconButton>
                      {this.state.productQuantity}
                      <IconButton
                        onClick={() => {
                          this.setState({
                            ...this.state,
                            productQuantity: this.state.productQuantity + 1,
                          });
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UserProductView);
