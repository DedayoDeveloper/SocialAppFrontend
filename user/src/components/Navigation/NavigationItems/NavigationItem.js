import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navigation.module.css'



const navigationitem = (props) => {

    let attachedClasses = ['nav-link', classes[props.styleType]]

    
    return(
        <li style={{}} className="nav-item">
            <NavLink 
            to={props.link}
            exact={props.exact}
            className={attachedClasses.join(' ')}
            activeClassName="active"
            > {props.children}</NavLink>
        </li>
    )
};

export default navigationitem;