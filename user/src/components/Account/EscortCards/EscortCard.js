import React from 'react';
import classes from './EscortCard.module.css';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { BASE_URL } from '../../../config/Config';


export const EscortProfileCard = (props) => {

    return(
        <NavLink className={classes.mainWrapper} to={"/view-escorts/" + props.id} >
        <div className={classes.cardWrapper}>
            <div className={classes.profileImage}>
                {
                    props.imagePath ? 
                    <img src={props.imagePath} alt="" />
                    :
                    <Skeleton height="200px" width="100%"/>
                }
            </div>
            <div>
                {props.category ?
                    <span style={{
                        color: '#fff',
                        background: '#ac0464',
                        padding: '6px 6px',
                        fontSize:'10px'
                    }}>{props.category}</span>
                    :
                    null
                }
            </div>
            <div className={classes.profileText}>
                
                <p>{props.description || <Skeleton height="20" width="100%"/>}</p>
                <p> {props.location ?
                    <>
                    <i className="fa fa-map-marker mr-1"></i> {props.location}
                    </>
                 : <Skeleton height="20" width={100}/>
                 }</p>
            </div>

        </div>
        </NavLink>
    )
}