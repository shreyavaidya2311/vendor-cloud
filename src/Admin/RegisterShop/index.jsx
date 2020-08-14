import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField, Grid, Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Header from "../Header";
class RegisterShop extends React.Component {
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
                      startIcon={<CheckBoxIcon />}
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

export default RegisterShop;
