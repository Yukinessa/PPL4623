import React from "react";

import AuthLayout from "../components/layouts/AuthLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Container, makeStyles, Paper, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  backgroundImage: {
    height: "500px",
    width: "95%",
    backgroundColor: "#949494",
  },
  formLogin: {
    marginTop: "100px",
  },
});

function Login() {
  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const handleSubmit = (value) => {
  //   if (value.target.name == "") {
  //     alert("please input the email and password");
  //   }
  // };

  return (
    <AuthLayout>
      <Grid container spacing={1}>
        <Grid item xs={6} className={classes.formLogin}>
          <Container>
            <Typography variant="h4" color="initial" align="center">
              Login
            </Typography>
            <TextField
              name="username"
              label="Username"
              margin="normal"
              fullWidth
              variant="outlined"
            />
            <TextField
              name="password"
              label="Password"
              margin="normal"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="default" fullWidth>
              Login
            </Button>
            <Button
              variant="text"
              color="default"
              fullWidth
              component={Link}
              to="/register"
            >
              Create an Account
            </Button>
          </Container>
        </Grid>
        <Grid item xs={1}>
          <Divider
            orientation="vertical"
            variant="middle"
            style={{
              border: "1px solid",
              backgroundColor: "#949494",
              borderColor: "#949494",
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.backgroundImage}></Paper>
        </Grid>
      </Grid>
    </AuthLayout>
  );
}

export default Login;
