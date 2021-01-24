import React from 'react';
import { Applogo } from '../../config/Config';
import { NavLink } from 'react-router-dom';

const logo = (props) => {
    return (
        <div>
            <NavLink to="/">
                <img style={{width:'179px'}} src={Applogo} alt="ptv escorts"/>
            </NavLink>
        </div>
    )
}
export default logo;