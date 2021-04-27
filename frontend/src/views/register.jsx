import React from "react";

import AuthLayout from "../components/layouts/AuthLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, makeStyles, MenuItem, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  backgroundImage: {
    height: "100%",
    backgroundColor: "#949494",
  },
  selectTextField: {
    width: "257px",
  },
});

function Register() {
  const classes = useStyles();

  const roles = [
    {
      value: "Designer",
      label: "Game Designer",
    },
    {
      value: "Publisher",
      label: "Game Publisher",
    },
  ];

  return (
    <AuthLayout>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper className={classes.backgroundImage}></Paper>
        </Grid>
        <Grid item xs={6}>
          <Container>
            <Typography variant="h4" color="initial" align="center">
              REGISTER
            </Typography>
            <TextField
              name="username"
              label="Username"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              margin="normal"
              type="password"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="role"
              label="Register as "
              margin="normal"
              variant="outlined"
              select
              className={classes.selectTextField}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="default" fullWidth>
              Continue
            </Button>
            <Typography align="center">
              Already Have Account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Login
              </Link>
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}

export default Register;
