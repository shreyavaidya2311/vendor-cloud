import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "axios";

export default function ViewCart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/getItems")
      .then((response) => {
        processData(response.data);
      });
    const processData = (pData) => {
      let newArr = [];
      pData.map((data) => {
        newArr.push({
          productName: data.productName,
          quantity: data.quantity,
          price: data.price,
        });
      });
      setData(newArr);
    };
  }, []);

  console.log(data);

  let sum = 0;

  return (
    <div>
      {data.map((cart) => {
        let { productName, price } = cart;

        return (
          <React.Fragment>
            <div>
              <Grid justify="center" container>
                <Grid item xs={4}>
                  <Card variant="outlined" style={{ margin: "1.5rem" }}>
                    <CardContent>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="overline"
                            style={{ fontSize: "1.5rem" }}
                          >
                            {productName}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography gutterBottom variant="h6">
                            $ {1 * price}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography color="textSecondary" variant="body2">
                        Quantity: 1
                        <Button size="small">
                          <RemoveIcon />
                        </Button>
                        <Button size="small">
                          <AddIcon />
                        </Button>
                      </Typography>

                      <Button color="secondary">
                        Remove from cart <RemoveShoppingCartIcon />
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
