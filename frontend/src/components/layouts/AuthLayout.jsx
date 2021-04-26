import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

import Navbar from "../molecules/navbar"

function AuthLayout(props){
  return(
    <>
      <Navbar />
      <Toolbar />
        {props.children}
    </>
  )
}

export default AuthLayout
