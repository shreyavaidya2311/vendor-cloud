import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Button,
  Grid,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  makeStyles,
} from "@material-ui/core";
import Logo from "../images/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import "../App.css";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const StyledAppBar = withStyles({
  root: {
    background: "linear-gradient(45deg,#3981ed 60rem,#246ad4 30rem)",
  },
  label: {
    textTransform: "capitalize",
  },
})(AppBar);

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <StyledAppBar>
          <Toolbar>
            <Link to="/user" className="link">
              {" "}
              <img
                src={Logo}
                alt="Logo"
                height="40rem"
                width="40rem"
                style={{ marginRight: "0.5rem" }}
              />
            </Link>

            <Grid container spacing={12}>
              <Grid item xs={4}>
                <Link to="/user" className="link">
                  <Typography variant="h6">Vendor Cloud</Typography>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Button
                  color="inherit"
                  startIcon={<SearchIcon />}
                  onClick={handleClickOpen}
                >
                  Search by Category
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Link to="/cart" className="link">
                  <Button color="inherit" startIcon={<ShoppingCartIcon />}>
                    Cart
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <Button color="inherit" startIcon={<ExitToAppIcon />}>
              Logout
            </Button>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
      <Toolbar />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select a category</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <Select>
                <option>Grocery</option>
                <option>Stationery and Novelties</option>
                <option>Pharmacy</option>
                <option>Clothing and Accessories</option>
                <option>Cosmetics</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}