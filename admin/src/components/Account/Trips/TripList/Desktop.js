import React from 'react';
import classes from '../css/TripListDesktop.module.css';
import {BusIcon, currency, PayIcon} from '../../../../config/Config'
import Button from '../../../UI/Button/Button';
import Arrow from '../../../../assets/images/arrow.svg';
import Skeleton from "react-loading-skeleton";
import { formatDate2, formatCurrency } from '../../../../shared/Method';

const desktop = (props) => {
    console.log("PROPS",{...props});

    return(
        <React.Fragment>
        <div className={classes.wrapper}>
            <div className={classes.icon}>
                
                {props.departure ?  <div className={classes.iconWrapper}><img src={PayIcon} alt="icon" /></div> : <Skeleton duration={0.48}  height={38} width={38}  /> }
                 
            </div>
            <div>
                <div className={classes.tripDestination}>
                    <p>{props.departure || <Skeleton duration={0.48} width={100} />}</p> 
                    <p> {props.departure ? '—': ''} </p> 
                    <p>{props.destination || <Skeleton duration={0.48} width={100} />}</p>
                </div>
                <div className={classes.tripStation}>
                    {/* <p>Jobowu station</p>
                    <p><img width="24px" src={Arrow} alt="" /></p>
                    <p>Kano Bansa Station</p> */}
                </div>
                <p  className={classes.time}>{ props.departuredate ? formatDate2(props.departuredate) 
                // +' at ' +props.time 
                : <Skeleton duration={0.48} height={5} width="100%" /> }</p>
            </div>
            
            <div className={classes.PayInfo}>
                
                <p>{props.extrariders ? props.extrariders + ' seat(s)' : <Skeleton duration={0.48} width={100} />}</p>
            </div>
            <div className={classes.price}>
                {props.price ?
                <>
                <h6>Paid</h6>
                <p> {currency} {formatCurrency(props.price)}</p>
                </>
                :
                <>
                
                <p><Skeleton duration={0.48} height={50} width={50} /></p>
                </>
                }

            </div>
        </div>

        
        </React.Fragment>
    )
}
export default desktop;