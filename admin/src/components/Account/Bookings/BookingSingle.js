import React from 'react';
import classes from './css/BookingSingle.module.css';
import Arrow from '../../../assets/images/arrow.svg';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export const BookingSingle = (props) => {

    return(
        <SkeletonTheme color="#cacaca" highlightColor="#afaeae">
        <div className={classes.summarydiv}>
            <h5>Trip Summary</h5>
            <div className={classes.tripSummary}>
                <div className={classes.item}>
                    <p>From</p>
                    <h4>{props.departure || <Skeleton duration={0.6} />}</h4>
                    <h6>{props.departurepark || <Skeleton duration={0.6}  />}</h6>
                </div>
                <div className={classes.arrow}>
                    <p><img width="35px" src={Arrow} alt="" /></p>
                </div>
                <div className={classes.item}>
                    <p>To</p>
                    <h4>{props.destination || <Skeleton duration={0.6} />}</h4>
                    <h6>{props.arrivalpark || <Skeleton duration={0.6}  />}</h6>
                </div>
            </div>
            <div className={classes.tripDateSummary}>
                <div className={classes.TDItem}>
                    <p>Date</p>
                    <h4>{props.date || <Skeleton duration={0.6} />}</h4>
                </div>

                <div className={classes.TDItem}>
                    <p>Time</p>
                    <h4>{props.time || <Skeleton duration={0.6} />}</h4>
                </div>
            </div>
            <div className={classes.selection}>

            {props.time ? 
                <React.Fragment>
                <button 
                onClick={() => props.toggleState(1)} 
                className={ props.bookingState === 1 ? classes.active : ''}
                > Going alone</button>
                <button 
                onClick={() => props.toggleState(2)}
                className={ props.bookingState === 2 ? classes.active : ''}
                > Going with others</button>
                <button 
                onClick={() => props.toggleState(3)}
                className={ props.bookingState === 3 ? classes.active : ''}
                > Booking for others</button>
                </React.Fragment>: 
                <React.Fragment>
                <div><Skeleton duration={0.6}  height={30}  /></div> 
                <div><Skeleton duration={0.6}  height={30} /></div> 
                <div><Skeleton duration={0.6}  height={30} /></div> 
                </React.Fragment>}
                {/* <button className={classes.active}> Going alone</button>
                <button> Going with others</button>
                <button> Booking for others</button> */}
            </div>

        </div> 
        </SkeletonTheme>
    )


}