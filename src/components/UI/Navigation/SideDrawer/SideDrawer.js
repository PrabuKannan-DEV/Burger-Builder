import React from 'react';
import Logo from '../../../Logo/Logo';
import Backdrop from '../../Backdrop/Backdrop';
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

function sideDrawer(props) {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed }/>
    <div className={attachedClasses.join(' ')}>
      <div className={classes.Logo}>
          <Logo/>
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
    </React.Fragment>
  )
}

export default sideDrawer
