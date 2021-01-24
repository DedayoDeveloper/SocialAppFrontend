import React from 'react';
import classes from './Banner.module.css';
import { NavLink } from 'react-router-dom';
import {BannerImage} from '../../config/Config';
import PlayStoreImg from '../../assets/images/playstore.svg';
import AppStoreImg from '../../assets/images/appstore.png';
import Arrow from '../../assets/images/right.svg';

const bgRight ={
    backgroundImage: `linear-gradient(rgba(245, 246, 252, 0.52), rgba(35, 145, 213, 0.28)), url(${BannerImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'

}
const banner = (props) => {

    return(
        <React.Fragment>
            <div className={classes.Banner}>
                <div className={classes.item}>
                    <div className={classes.headingText}>
                        <h2 className={classes.title}>Secure and reliable <br/> traveling insurance for Africa</h2>
                        <p>Get useful protection while traveling.</p>
                        <NavLink className={classes.bannerLink} to='/login'>Let's Ride <img src={Arrow} alt="" /> </NavLink>
                    </div>
                    <div className={classes.downloadLink}>
                            <a href="somelink"><img src={PlayStoreImg} alt="Play Store Download" /></a>
                            <a href="somelink"><img src={AppStoreImg} alt="App store Download" /></a>
                    </div>
                </div>
                <div style={bgRight}>

                </div>
            </div>
            
        
        
        </React.Fragment>
    )
}

export default banner