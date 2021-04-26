import React from 'react'

import AuthLayout from "../components/layouts/AuthLayout"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Container, MenuItem } from '@material-ui/core'
import { Link } from 'react-router-dom'


function Register(){
  const roles = [
    { value : "Designer",
      label : "Game Designer"
    },
    {
      value : "Publisher",
      label : "Game Publisher"
    },
  ];

  return(
    <AuthLayout>
      <Grid container spacing={1}>
          <Grid 
          item xs={6}
          style={{
            backgroundImage : "url('https://images.unsplash.com/photo-1585399000684-d2f72660f092?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80')"
          }} />
        <Grid item xs={6}>
          <Container>
          <Typography variant="h4" color="initial" align="center">REGISTER</Typography>
          <TextField
            id="username"
            label="Username"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="email"
            label="Email"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            margin="normal"
            type="password"
            variant="outlined"
            fullWidth
          />

          <TextField
            id="role"
            label="Register as "
            margin="normal"
            variant="outlined"
            select
            fullWidth
          >
            {roles.map((role) =>
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            )}
          </TextField>
          <Button variant="contained" color="default" fullWidth>
            Continue
          </Button>
          <Typography align="center">
            Already Have Account? <Link to="/login">Login</Link>
          </Typography>
          </Container>
        </Grid>
  
      </Grid>
    </AuthLayout>
  )
}

export default Register;