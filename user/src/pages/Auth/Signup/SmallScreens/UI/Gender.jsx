import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0 0 5px 0;

  span {
    border-radius: 1rem;
    border: 1px solid #ccc;
    width: 100%;
    padding: 0.375rem 0.75rem;
    text-align: center;
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.4rem;
    margin: 0 0 9px 0;

    input {
      width: 20px; /* Adjust width as needed */
      height: 20px;
      appearance: none;
      outline: none;
      cursor: pointer;
      border: 1px solid #ccc;
      color: #fff;
      position: relative;
      border-radius: 7px;

      &:checked {
        background-color: #ac0464 !important;
      }

      &:checked::after {
        content: '✓';
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: white; /* Color of the checkmark */
        position: absolute;
        top: -4px;
        left: 3.5px;
      }
    }
  }
`;

const Gender = ({ selectedGender, showGender, onGenderChange, onShowGenderChange }) => {
  const genderOptions = ['Man', 'Woman', 'More >'];

  const handleGenderSelect = (index) => {
    onGenderChange(genderOptions[index]); // Update parent component's state
  };

  const handleCheckboxChange = (event) => {
    onShowGenderChange(event.target.checked); // Update parent component's state for checkbox
  };

  return (
    <Container>
      {genderOptions.map((gender, index) => (
        <span
          key={index}
          onClick={() => handleGenderSelect(index)}
          style={{
            backgroundColor: selectedGender === gender ? '#ac0464' : 'transparent',
            color: selectedGender === gender ? '#fff' : '#000',
          }}
        >
          {gender}
        </span>
      ))}

      <div>
        <input
          type="checkbox"
          checked={showGender}
          onChange={handleCheckboxChange}
        />
        <p>Show my gender on my profile</p>
      </div>
    </Container>
  );
};

export default Gender;
