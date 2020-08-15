import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

export default function MiddleDividers() {
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

  const classes = useStyles();

  let sum = 0;

  return (
    <div>
      <div className={classes.root}>
        {data.map((cart) => {
          let { productName, quantity, price } = cart;

          function reduce(e) {
            e.preventDefault();
            quantity = quantity - 1;
          }

          return (
            <React.Fragment>
              <div id="whole thing">
                <Card
                  className={classes.root}
                  variant="outlined"
                  style={{ marginBottom: "4px" }}
                >
                  <CardContent>
                    <div className={classes.section1}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography gutterBottom variant="h4">
                            {productName}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography gutterBottom variant="h6">
                            Rs. {quantity * price}
                            <div style={{ display: "none" }}>
                              {(sum = sum + quantity * price)}
                            </div>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography color="textSecondary" variant="body2">
                        Quantity: {quantity}
                        <Button size="small" onClick={(e) => reduce()}>
                          <RemoveIcon />
                        </Button>
                        <Button size="small">
                          <AddIcon />
                        </Button>
                      </Typography>
                    </div>

                    <div className={classes.section3}>
                      <Button color="secondary">
                        Remove from cart <RemoveShoppingCartIcon />
                      </Button>
                    </div>
                    <Divider variant="middle" />
                  </CardContent>
                </Card>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div>
        Total paisa he aahe: <h2>{sum}</h2>
      </div>
    </div>
  );
}
