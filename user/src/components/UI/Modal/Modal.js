import React, { Component } from 'react';
import classes from "./Modal.module.css";
import Backdrop from '../BackDrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render(){
        return(
            <React.Fragment>
                <Backdrop show={this.props.show} close={this.props.modalClosed} /> 
            <div  className={classes.Modal} style={{
                transform:this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                opacity: this.props.show ? '1':'0'
            }} >
                <p className={classes.closeBtn} onClick={this.props.modalClosed}> x </p>
                {this.props.children}
            </div>
            </React.Fragment>
        )
    }
    
};
export default Modal;