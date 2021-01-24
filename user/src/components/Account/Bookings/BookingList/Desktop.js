import React from 'react';
import classes from '../css/BookingListDesktop.module.css';
import {BusIcon, currency} from '../../../../config/Config'
import Button from '../../../UI/Button/Button';
import Arrow from '../../../../assets/images/arrow.svg';
import { formatDate2, formatCurrency} from '../../../../shared/Method';
import Skeleton from "react-loading-skeleton";
import { NavLink } from 'react-router-dom';

const desktop = (props) => {

    const styles = {
        background: '#2492d652'
    }
    return(
        <React.Fragment>
        <div className={classes.wrapper}>
            <div  className={classes.icon}>
                <div style={props.tcomp ? styles : {}} className={classes.iconWrapper}>
                   {props.tcomp ?  <img src={BusIcon} alt="icon" />: <Skeleton duration={0.48} circle={true} height={38} width={38}  />} 
                    
                </div>  
                <p>{props.tcomp ||  <Skeleton duration={0.48} width={100} />}</p> 
            </div>
            <div>
                <div className={classes.tripDestination}>
                    <p>{props.departure ||  <Skeleton duration={0.48} width={100} />}</p> <p> {props.departure ? '-' :''} </p> <p>{props.destination ||  <Skeleton duration={0.48} width={100} />}</p>
                </div>
                <div className={classes.tripStation}>
                    <p>{props.departurepark  ||  <Skeleton duration={0.48} width="100%" />}</p>
                    <p>{props.departure ? <img width="24px" src={Arrow} alt="" /> : ''}</p>
                    <p>{props.arrivalpark  ||  <Skeleton duration={0.48} width="100%" />}</p>
                </div>
            <p  className={classes.time}>{ props.departure ? formatDate2(props.date) +' at ' +props.time : <Skeleton duration={0.48} height={5} width="100%" /> }</p>
            </div>
            <div className={classes.price}>
            <p>  {  props.departure ? currency+formatCurrency(props.price): ""}</p>

            </div>
            <div className={classes.PayInfo}>
                <p>{props.seats ? props.seats+' Seats' :  <Skeleton duration={0.48} width={100} />}  </p>
                {props.seats ? <NavLink to={"/book-trip/" + props.id} className={classes.bookBtn} >Book Now</NavLink>: <button className={classes.SkeletonBtn}><Skeleton duration={0.48} width="100%" /></button>}
            </div>
        </div>

        
        </React.Fragment>
    )
}
export default desktop;