import React from 'react';
import classes from '../css/TripListMobile.module.css';
import {BusIcon, currency, PayIcon} from '../../../../config/Config'
import Button from '../../../UI/Button/Button';
import Skeleton from 'react-loading-skeleton';
import {formatDate2, formatCurrency} from '../../../../shared/Method'


const mobile = (props) => {

    return(
        <React.Fragment>
        
        {!props.departuredate ? 
        <div className={classes.loaderDiv}>
            <Skeleton duration={0.48} width="100%" height={20} />
            <Skeleton duration={0.48} width="100%" height={20} />
            <Skeleton duration={0.48} width="100%" height={20} />
            <Skeleton duration={0.48} width="100%" height={20} />
        </div>
        
        
        :
        <div className={classes.mobileWrapper}>
            <div className={classes.icon}>
             <div className={classes.iconWrapper}><img src={PayIcon} alt="icon" /></div>
            </div>
            
            <div className={classes.tripDestination}>
                <p>{props.departure }</p> 
                <p> {props.departure ? '—': ''} </p> 
                <p>{props.destination}</p>
            </div>
            {/* <div>Boarding</div>
            <div>Jobowu station</div>
            <div>Destination</div>
            <div>Kano Bansa Station</div> */}
          
           

            <div style={{color: '#2391d5'}}>Date</div>
            <div style={{color: '#2391d5'}} className={classes.time}>{formatDate2(props.departuredate)} </div>

            
            <div style={{color:'green'}}>Paid</div>
            <div style={{color:'green'}}> {currency} {formatCurrency(props.price)}</div>
            
            

            <div style={{color: '#414ed8'}}>Seat(s)</div>
            <div style={{color: '#414ed8'}}>{props.extrariders}</div>
          
        </div>
        }
        </React.Fragment>
    )
}
export default mobile;