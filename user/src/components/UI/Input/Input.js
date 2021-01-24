import React from 'react';

import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = props.errorMsg;
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} disabled={option.disabled} selected={option.selected}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                // {...props.elementConfig}
                // value={props.value}
                // onChange={props.changed}
                {...props} />;
    }

    return (
        <React.Fragment>
        {props.label ?<label className={classes.Label}>{props.label}</label> :''}
        <div style={{display : props.label ? 'flex': 'block'}} className={classes.Input}>
            
            {props.addon ?
            <div >
                <span className={classes.addon}>{props.addon}</span>
            </div>
            : 
            ''
            }
            {inputElement}
            
        </div>
        {validationError ? <p className={classes.validationError}>{validationError}</p>:null}
        </React.Fragment>
    );


};

export default input;