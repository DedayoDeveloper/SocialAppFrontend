import React, { useState } from 'react';
import Banner from '../components/Landing/Banner';
import classes from './Styles/Landing.module.css';
import {BannerImage} from '../config/Config';
import { NavLink } from 'react-router-dom';


const bgLeft = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${BannerImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%'
}

const Landing = (props) => {

    return(
        <div>
            <div style={bgLeft}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className={classes.introSection}>
                                <h1>Meet Your Favourite Escort</h1>
                                <p>PTV Escort connects you with men and women ready for fun! Sign up quickly on our site and quickly find a pleasant partner.</p>
                                <button><NavLink to="/login">Get Started</NavLink></button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div className="lamour-special-services home2 new-block">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 col-md-6">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="block-syl1">
                                    <i className="fas fa-user-shield"></i>
									<p>Protection</p>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="block-syl1">
                                    <i className="fas fa-user-check"></i>
									<p>Verification</p>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="block-syl1">
                                    <i className="fas fa-grin-hearts"></i>
									<p>Attention</p>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 col-sm-6">
								<div className="block-syl1">
                                    <i className="far fa-comment-dots"></i>
									<p>Communication</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-6">
						<div className="map-txt-block">
							<div className="inner-content-wrapper">
								<div className="title1 stl2">
									<h2 className="fz35">PTV Escort Services</h2>
									<p className="fz20">Connecting singles across the world to their ideal partner</p>
								</div>
								<p className="fz20">Here you will be able to fulfil any fantasies you might have! With our advanced search options and a big user base everyone will find someone perfect.</p>

								<p className="fz20"> We also expect all our members to respect each other's privacy at all costs, so you don't have to worry about the disclosure of secret adventures. ptvescort.com is reliable, rewarding, and exciting.</p>

                                <p className="fz20">Members of ptvescort.com are open-minded and craving for new adventures. </p>

                               
                                <NavLink to="/login">Begin your adventure</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
       

        </div>

    )
}

export default Landing