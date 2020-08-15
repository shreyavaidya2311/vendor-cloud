import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../../redux/auth/authActions";
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
class AdminRegister extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (
      this.props.auth.isAuthenticated &&
      this.props.auth.user.userType === 1
    ) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerAdmin(newUser, this.props.history);
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
                <Link to="/adminregister" className="alink">
                  Admin
                </Link>
              </Button>
              <Button size="large">
                <Link to="/register" className="alink">
                  User
                </Link>
              </Button>
            </ButtonGroup>
          </Grid>

          <Card style={{ padding: "1rem", marginTop: "1rem" }}>
            <CardContent>
              <Grid container justify="center">
                <Typography component="h1" variant="h5">
                  Register as Admin
                </Typography>
              </Grid>
              <br />
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/adminlogin" variant="body2" className="alink">
                    Already have an account? Log in here
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
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      onChange={this.onChange}
                      value={this.state.name}
                    />
                  </Grid>

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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="password2"
                      type="password"
                      label="Confirm Password"
                      autoComplete="current-password"
                      onChange={this.onChange}
                      value={this.state.password2}
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
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
}
AdminRegister.propTypes = {
  registerAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerAdmin })(
  withRouter(AdminRegister)
);
