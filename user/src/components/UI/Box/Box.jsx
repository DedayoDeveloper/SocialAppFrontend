import React from 'react'
import styled from 'styled-components';

const Boxes = styled.div`
.box{
    background-color: ${({ isSelected }) => (isSelected ? '#ac0464' : '#000')};
    width: 100%;
    height: 150px;
    display: flex; /* If you want to center content */
    flex-direction: column; /* Align children vertically */
    align-items: center; /* Center children horizontally */
    border-radius: 0.5rem;
    justify-content: center; /* Center children vertically */
    cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ isDisabled }) => (isDisabled ? '0.5' : '1')};
    transition: background-color 0.3s ease;

}
.save-btn {
    margin-top: 10px;
    padding: 0.5rem 1rem;
    background-color: #ac0464;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
    pointer-events: ${({ isSelected }) => (isSelected ? 'auto' : 'none')};
  }

`;




const Box = ({ data, icon, handleClick, isSelected, isDisabled }) => {
    return (
      <Boxes isSelected={isSelected} isDisabled={isDisabled}>
        <div onClick={!isDisabled ? handleClick : undefined} className="box">
          {icon && <span>{icon}</span>}
          <p>{data}</p>
        </div>
      </Boxes>
    );
  };
  
  export default Box;