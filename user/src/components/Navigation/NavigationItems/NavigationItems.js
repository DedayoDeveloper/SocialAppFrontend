import React from 'react';
import classes from './Navigation.module.css';
import Navigationitem from './NavigationItem';
import {ProfileIcon} from '../../../config/Config'
import {NavLink} from 'react-router-dom'

const navigationitems = (props) => {
   

    let attachedClasses = ['app-navbar', 'navbar-collapse'];
    let attachedClasses_2 = ['navbar-nav'];
    if(props.device === 'mobile'){
        attachedClasses = [classes.AppNavbar, 'app-navbar', 'navbar-collapse']
        attachedClasses_2 = [classes.Nav, 'navbar-nav']
    }
    
    let Navigation = '';
    if(!props.isAuth){
        Navigation = (
            <React.Fragment>
            <Navigationitem styleType="null" link='/' exact>Home</Navigationitem>
            <Navigationitem styleType="Login" link='/login' >Login</Navigationitem>
            <Navigationitem styleType="Signup" link='/sign-up' >Signup</Navigationitem>
            </React.Fragment> 
        )
    }

    

    if(props.isAuth ){
        Navigation = <React.Fragment>
                        <Navigationitem styleType="null" link='/' exact>Home</Navigationitem>
                        <Navigationitem styleType="null" link='/dashboard' >Find Escorts</Navigationitem>
                        <button className={classes.mobileLogoutBtn} onClick={props.logout} >Logout</button>
                        
                        <div className={classes.profileIconDiv}>
                            <div className={classes.profileIcon}>
                                <img src={ProfileIcon} alt="profile" /> 
                            </div>
                            <p className={classes.displayName}>{props.firstname}</p>
                            <div className={classes.overlayNav}>
                            <button onClick={props.logout} >Logout</button>
                            </div>
                        </div>
                    </React.Fragment>
    }
    
    return(

    <div className={attachedClasses.join(' ')} id="navbarNav">
        <ul className={attachedClasses_2.join(' ')}>


        {Navigation}
        </ul>
    </div>
)};

export default navigationitems;