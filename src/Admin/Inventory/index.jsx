import React from "react";
import Header from "../Header";
import MUIDataTable from "mui-datatables";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import { blue, green } from "@material-ui/core/colors";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import { Add } from "@material-ui/icons";

class Inventory extends React.Component {
  state = {
    isEditClicked: false,
    isAddClicked: false,
  };
  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableRow: {
          root: {
            "&$selected": {
              backgroundColor: "#e6f0ff !important",
            },
          },
        },
        MUIDataTableSelectCell: {
          checked: { color: "dodgerblue !important" },
        },
      },
    });
  handleEditClick = () => {
    this.setState({ isEditClicked: !this.state.isEditClicked });
  };
  handleAddClick = () => {
    this.setState({ isAddClicked: !this.state.isAddClicked });
  };
  render() {
    const columns = [
      {
        name: "productName",
        label: "Product Name",
      },
      {
        name: "productCategory",
        label: "Product Category",
      },
      {
        name: "productPrice",
        label: "Product Price",
      },
      {
        name: "productQuantity",
        label: "Product Quantity",
      },
      {
        name: "editProduct",
        label: "Edit Product",
        options: {
          customBodyRenderLite: () => {
            return (
              <IconButton onClick={this.handleEditClick}>
                <EditIcon style={{ color: blue[500] }} />
              </IconButton>
            );
          },
        },
      },
    ];

    const data = [
      ["Apple", "Grocery", "2", "$10"],
      ["Apple", "Grocery", "2", "$10"],
      ["Apple", "Grocery", "2", "$10"],
      ["Apple", "Grocery", "2", "$10"],
    ];

    const options = {
      filterType: "checkbox",
    };
    const { isAddClicked } = this.state;
    if (isAddClicked) {
      return <AddProduct handleAddClick={this.handleAddClick} />;
    }
    const { isEditClicked } = this.state;
    if (isEditClicked) {
      return <EditProduct handleEditClick={this.handleEditClick} />;
    }
    return (
      <div>
        <Header />
        <div style={{ margin: "2rem" }}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"Inventory"}
              data={data}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
          <br />
          <Grid justify="center" container>
            <Button
              variant="outlined"
              size="large"
              style={{ color: green[500] }}
              startIcon={<Add />}
              onClick={this.handleAddClick}
            >
              Add Product
            </Button>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Inventory;
