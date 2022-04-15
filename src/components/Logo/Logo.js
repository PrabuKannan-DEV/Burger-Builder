 import React from 'react'
 import classes from './Logo.module.css'
 import burgerLogo from '../../assets/images/burger-logo.png'
 
 function Logo() {
   return (
     <div className={classes.Logo}>
       <img src={burgerLogo} alt="burger logo" />
     </div>
   )
 }
 
export default Logo
 