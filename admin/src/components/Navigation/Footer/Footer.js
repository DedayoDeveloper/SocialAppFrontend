import React from 'react';
import classes from './Footer.module.css';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {

    return(
        <div className={classes.Footer}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-4 mt-4">
                        <p className="text-lg-left text-center">© 2020 PTV Escorts, Inc. All rights reserved</p>
                    </div>
                    <div className="col-md-2 mt-4">
                       
                    </div>
                    <div className="col-md-6 mt-4">
                       <div className="row justify-content-center justify-content-lg-end">
                        <ul style={{margin:'0'}} className={classes.SocialIcons}>
                            <li><a><i className="fa fa-facebook"></i></a></li>
                            <li><a><i className="fa fa-instagram"></i></a></li>
                            <li><a><i className="fa fa-twitter"></i></a></li>
                        </ul>
                       </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Footer;