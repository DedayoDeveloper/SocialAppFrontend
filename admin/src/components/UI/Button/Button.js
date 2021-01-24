import React from 'react';
import classes from './Button.module.css';

const button = (props) => (

    <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}> {props.children}
    {props.loading && <div class="spinner-border" role="status">
  <span class="sr-only">Loading...</span>
</div>}
    </button>
)

export default button