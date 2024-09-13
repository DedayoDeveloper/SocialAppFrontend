import React from 'react';
import classes from "./Modal.module.css";
import Backdrop from '../BackDrop/Backdrop';

const Modal = ({ show, modalClosed, children }) => {
  // No need for `shouldComponentUpdate` in a functional component. 
  // React.memo will handle the optimization for re-rendering.

  return (
    <>
      <Backdrop show={show} close={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        <p className={classes.closeBtn} onClick={modalClosed}> x </p>
        {children}
      </div>
    </>
  );
};

// Wrapping in React.memo for optimization similar to shouldComponentUpdate
export default React.memo(Modal, (prevProps, nextProps) => 
  prevProps.show === nextProps.show && prevProps.children === nextProps.children
);