import React from 'react';
import Navigationitems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

const header = (props) => {

    return(
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <Logo/>
            <button onClick={props.openDrawer} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Navigationitems logout={props.logout} username={props.username} isVerify={props.isVerify}  isAuth={props.isAuth} />
        </nav>
    )
}
export default header;