import React from 'react';
import classes from './Pagination.module.css';

export const Pagination = (props) => {

    
    const pad = [...Array(props.length)].map((e, i) => <button key={i} className={props.currentPage == i+1 ? classes.active: null} onClick={() => props.click(i+1)}>{i+1}</button>)

    return(
        <div className={classes.center}>
        <div className={classes.pagination}>
        <button disabled={props.prev === null ? true : false} onClick={() => props.click(props.prev)}>&laquo;</button>
        {pad}
        <button disabled={props.next === null ? true : false} onClick={() => props.click(props.next)}>&raquo;</button>
        </div>
        </div>
    )
}