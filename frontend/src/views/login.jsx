import React from 'react'

import AuthLayout from "../components/layouts/AuthLayout"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import { Link } from 'react-router-dom'

function Login(){

  return(
    <AuthLayout>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Container>
          <Typography variant="h4" color="initial" align="center">Login</Typography>
          <TextField
            id="username"
            label="Username"
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="password"
            label="Password"
            margin="normal"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" color="default" fullWidth>
            Login
          </Button>
          <Button variant="text" color="default" fullWidth component={Link} to="/register">
            Create an Account
          </Button>
          </Container>
        </Grid>
        <Grid 
        item xs={6}
        style={{
          backgroundImage : "url('https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80')"
        }} />
      </Grid>
    </AuthLayout>
  )
}

export default Login;