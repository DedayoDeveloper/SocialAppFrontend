import React from 'react';
import classes from './EscortCard.module.css';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL } from '../../../config/Config';


export const SingleEscortCard = (props) => {
    console.log("pp", props)

    return(
        <>
        
        <div className="row justify-content-center mb-5">

            {Object.keys(props).length === 0  ?
                <>
                <div className="col-md-6">
                    <Skeleton height="100%" width="100%" />
                </div>
                <div className="col-md-6">
                    <Skeleton height="20" width="100%"/>
                    <Skeleton height="20" width="100%"/>
                    <Skeleton height="20" width="100%"/>
                    <Skeleton height="20" width="100%"/>
                    <Skeleton height="20" width="100%"/>
                    <Skeleton height="20" width="100%"/>
                    <Skeleton height="20" width="100%"/>

                </div>
                </>
            :

            Object.keys(props).length !== 0 ? 
            <>
            <div className="col-md-6">
                <div className={classes.singleProfileImage}>
                    <img src={props.imagePath && props.imagePath !== "" ? props.imagePath : null} alt="" />
                </div>
            </div>

            <div className="col-md-6 mt-4">
                <div className={classes.infoSection}>
                    <div><span>Name:</span></div>
                    <div><p>{props.name }</p></div>
                    <div><span>Description:</span></div>
                    <div><p>{props.description  }</p></div>
                    <div><span>Email:</span></div>
                    <div>{
                        props.email === null
                        ? 
                        <p>Pay to view email</p>
                        :
                        <p>{props.email}</p>
                         }</div>
                    <div><span>Phone:</span></div>
                    <div>
                        {
                        props.phoneNumber === null
                        ? 
                        <p>Pay to view phonenumber</p>
                        :
                        <p>{props.phoneNumber}</p>
                         }
                         </div>
                    <div><span>Location:</span></div>
                    <div><p>{props.location}</p></div>
                </div>
            </div>
            </>
            :
            null
            }
         </div>
         </>
    )
}