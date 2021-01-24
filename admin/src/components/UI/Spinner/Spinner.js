import React from 'react';
import classes from './Spinner.module.css';

export const Spinner = (props) => {

    const style = {
        height: props.height,
        width: props.width
    }
    return(
        <div style={style} className={classes.spinner}>
           
        </div>
    )
}