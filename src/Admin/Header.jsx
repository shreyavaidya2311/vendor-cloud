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
} from "@material-ui/core";
import Logo from "../images/logo.png";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import StoreIcon from "@material-ui/icons/Store";
import LayersIcon from "@material-ui/icons/Layers";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../App.css";
import { Link } from "react-router-dom";

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

export default function Header(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <StyledAppBar>
          <Toolbar>
            <Link to="/admin" className="link">
              <img
                src={Logo}
                alt="Logo"
                height="40rem"
                width="40rem"
                style={{ marginRight: "0.5rem" }}
              />
            </Link>
            <Grid container spacing={10}>
              <Grid item xs={3} inline>
                <Link to="/admin" className="link">
                  <Typography variant="h6">Vendor Cloud</Typography>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to="/dashboard" className="link">
                  <Button color="inherit" startIcon={<PlaylistAddCheckIcon />}>
                    Dashboard
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to="/registershop" className="link">
                  <Button color="inherit" startIcon={<StoreIcon />}>
                    Register Shop
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <Link to="/inventory" className="link">
                  <Button color="inherit" startIcon={<LayersIcon />}>
                    Inventory
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
    </React.Fragment>
  );
}
