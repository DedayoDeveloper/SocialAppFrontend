import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/BackDrop/Backdrop';

import Navigationitems from '../NavigationItems/NavigationItems'


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return(
        <React.Fragment>
        <Backdrop close={props.closeDrawer} show={props.open}/>
        <div onClick={props.closeDrawer} className={attachedClasses.join(' ')}> 
            {/* <div className={classes.Logo}>
            
            </div> */}
            <nav className={classes.nav}>
            <Navigationitems logout={props.logout} username={props.username} isAuth={props.isAuth} device="mobile" />
            </nav>
        </div>
        </React.Fragment>
    )
}
export default sideDrawer;