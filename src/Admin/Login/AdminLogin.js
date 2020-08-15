import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginAdmin } from "../../redux/auth/authActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import logo from "../../images/loginlogo.png";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

class AdminLogin extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
  };

  componentDidMount() {
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.user.userType === 1
    ) {
      this.props.history.push("/admin");
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated && nextProps.auth.user.userType === 1) {
      this.props.history.push("/admin");
    } else if (
      nextProps.auth.isAuthenticated &&
      nextProps.auth.user.userType === 0
    ) {
      this.props.history.push("/user");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginAdmin(userData);
  };
  useStyles = () =>
    makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
      },
      form: {
        width: "100%",
        marginTop: theme.spacing(3),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

  render() {
    const classes = this.useStyles();
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Link to="/login" className="vlink">
            <Grid container justify="center" style={{ marginTop: "3rem" }}>
              <div style={{ marginTop: "0.4rem" }}>
                <img src={logo} alt="Logo" height="60rem" width="60rem" />
              </div>

              <Typography
                variant="overline"
                style={{
                  marginLeft: "1rem",
                  fontSize: "1.75rem",
                }}
              >
                Vendor Cloud
              </Typography>
            </Grid>
          </Link>
          <Grid container justify="center">
            <ButtonGroup color="primary">
              <Button size="large">
                <Link to="/adminlogin" className="alink">
                  Admin
                </Link>
              </Button>
              <Button size="large">
                <Link to="/login" className="alink">
                  User
                </Link>
              </Button>
            </ButtonGroup>
          </Grid>

          <Card style={{ padding: "1rem", marginTop: "1rem" }}>
            <CardContent>
              <Grid container justify="center">
                <Typography component="h1" variant="h5">
                  Login as Admin
                </Typography>
              </Grid>
              <br />
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/adminregister" variant="body2" className="alink">
                    Dont have an account? Register here
                  </Link>
                </Grid>
              </Grid>
              <br />
              <form
                className={classes.form}
                noValidate
                onSubmit={this.onSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      error={this.props.errors.email ? true : false}
                      helperText={this.props.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      onChange={this.onChange}
                      value={this.state.password}
                      autoComplete="current-password"
                      error={this.props.errors.passwordIncorrect ? true : false}
                      helperText={this.props.errors.passwordIncorrect}
                    />
                  </Grid>
                </Grid>
                <br />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
}

AdminLogin.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginAdmin })(AdminLogin);
