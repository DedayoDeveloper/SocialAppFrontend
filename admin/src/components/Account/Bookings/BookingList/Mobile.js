import React from 'react';
import classes from '../css/BookingListMobile.module.css';
import {BusIcon, currency} from '../../../../config/Config'
import Button from '../../../UI/Button/Button';
import Skeleton from 'react-loading-skeleton';
import {formatDate2, formatCurrency} from '../../../../shared/Method'
import { NavLink } from 'react-router-dom';


const mobile = (props) => {

    return(
        <React.Fragment>
        {!props.departure ? 
        <div className={classes.loaderDiv}>
            <Skeleton duration={0.48} width="100%" height={20} />
            <Skeleton duration={0.48} width="100%" height={20} />
            <Skeleton duration={0.48} width="100%" height={20} />
            <Skeleton duration={0.48} width="100%" height={20} />
        </div>
        
        
        :

        <div className={classes.mobileWrapper}>
            <div className={classes.icon}>
                <div className={classes.iconWrapper}>
                    <img src={BusIcon} alt="icon" />
                </div>   
            </div>
            <div className={classes.tripDestination}><p>{props.departure}</p> <p> — </p> <p>{props.destination}</p></div>
            <div>Boarding</div>
            <div>{props.departurepark}</div>
            <div>Destination</div>
            <div>{props.arrivalpark}</div>
            <div>Date</div>
            <div>{formatDate2(props.date) +' at ' +props.time}</div>
            <div>Price</div>
            <div>{currency +formatCurrency(props.price)}</div>  
            <div>Seat(s)</div>
            <div>{props.seats}</div>
            <NavLink className={classes.payBtnOnBookings} to={"/book-trip/" + props.id} >Book Now</NavLink>
        </div>
    }
        </React.Fragment>
    )
}
export default mobile;