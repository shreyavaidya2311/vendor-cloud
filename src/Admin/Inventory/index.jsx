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
import axios from "axios";
import { connect } from "react-redux";

class Inventory extends React.Component {
  state = {
    dataIndex: null,
    isEditClicked: false,
    isAddClicked: false,
    userId: null,
    productData: [],
    processData: [],
  };

  componentDidMount() {
    const adminId = this.props.auth.user.id;
    this.setState({ userId: adminId });
    axios
      .get(`http://localhost:5000/api/products/getStoreItem/${adminId}`)
      .then((res) => {
        this.setState({ productData: res.data });
        processData(res.data);
      });

    const processData = (pdata) => {
      let newArr = [];
      pdata.map((data, key) => {
        newArr.push([
          key + 1,
          data.productName,
          data.category,
          data.price,
          data.quantity,
          data._id,
        ]);
        return 0;
      });
      this.setState({ processData: newArr });
    };
  }

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

  handleEditClick = (dataIndex) => {
    this.setState({
      dataIndex: dataIndex,
      isEditClicked: !this.state.isEditClicked,
    });
  };

  handleAddClick = () => {
    this.setState({ isAddClicked: !this.state.isAddClicked });
  };

  render() {
    const columns = [
      {
        name: "productKey",
        label: "Product ID",
      },
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
        label: "Product Price($)",
      },
      {
        name: "productQuantity",
        label: "Product Quantity",
      },
      {
        name: "editProduct",
        label: "Edit Product",
        options: {
          customBodyRenderLite: (dataIndex) => {
            return (
              <IconButton onClick={() => this.handleEditClick(dataIndex)}>
                <EditIcon style={{ color: blue[500] }} />
              </IconButton>
            );
          },
        },
      },
    ];

    const options = {
      filterType: "checkbox",
      onRowsDelete: (rowsDeleted) => {
        const data = this.state.processData;
        const idsToDelete = rowsDeleted.data.map((d) => data[d.dataIndex][5]);
        axios
          .delete(
            `http://localhost:5000/api/products/deleteItem/${idsToDelete}`
          )
          .then((res) => console.log(res));
      },
    };

    const { isAddClicked } = this.state;
    if (isAddClicked) {
      return (
        <AddProduct
          handleAddClick={this.handleAddClick}
          userId={this.state.userId}
        />
      );
    }
    const { isEditClicked } = this.state;
    if (isEditClicked) {
      return (
        <EditProduct
          handleEditClick={this.handleEditClick}
          data={this.state.processData[this.state.dataIndex]}
        />
      );
    }
    return (
      <div>
        <Header />
        <div style={{ margin: "2rem" }}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"Inventory"}
              data={this.state.processData}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Inventory);
