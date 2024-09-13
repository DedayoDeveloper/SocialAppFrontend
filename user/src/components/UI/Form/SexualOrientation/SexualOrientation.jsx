import React, { useState } from 'react';
import styled from 'styled-components';




const Details = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    h1{
        font-size: 1.7rem;
        font-weight: 500;
        text-align: center;
    }

    p{
        font-size: 0.8rem;
        color: silver;
        text-align: center;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }
`;

const SaveButton = styled.button`
  width: 100%;
  margin: 10px auto;
  padding: 0.5rem 1rem;
  background-color: #ac0464;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  opacity: ${({ isSelected }) => (isSelected ? '1' : '0.5')};
  pointer-events: ${({ isSelected }) => (isSelected ? 'auto' : 'none')};
`;
const Span = styled.span`
  border-bottom: 1px solid rgb(114, 117, 128, 0.3);
  padding: 0.7rem;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#ac0464' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : 'silver')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  opacity: ${({ isDisabled }) => (isDisabled ? '0.6' : '1')};
  margin-bottom: 5px;
`;

const Check = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin: 9px 0;
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
        &:checked{
            background-color: #ac0464!important;
            
        }
        &:checked::after {
            content: '✓'; /* Unicode checkmark */
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            color: white; /* Color of the checkmark */
            position: absolute;
            top: -4px;
            left: 3.5px;
        }
    }
    p{
        margin: 0;
    }
   

`;

const SexualOrientation = ({modalClosed}) => {
    const [selectedBoxes, setSelectedBoxes] = useState([]); // State to keep track of selected box
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
      console.log("Checkbox checked:", event.target.checked); // To show current state in console
    };

    const handleClick = (index) => {
        if (selectedBoxes.includes(index)) {
          // Deselect if already selected
          setSelectedBoxes(selectedBoxes.filter((i) => i !== index));
        } else if (selectedBoxes.length < 3) {
          // Only allow adding if less than 3 are selected
          setSelectedBoxes([...selectedBoxes, index]);
        }
    };

    const handleSave = () => {
        // Handle the save action here
        console.log('Saved box indexes:', selectedBoxes);
        modalClosed();
        // You can perform further actions like submitting the selected box data
    };

      
    return (
        <Details>
          <h1>Your sexual orientation?</h1>
          <p>Select up to 3</p>
          <div className="info">
            {[
              { data: 'Straight'},
              { data: 'Gay'},
              { data: 'Lesbian'},
              { data: 'Bisexual'},
              { data: 'Asexual'},
              { data: 'Demisexual'},
              {data: 'Pansexual'}
            ].map((item, index) => (
                <Span
                key={index}
                onClick={() => handleClick(index)}
                isSelected={selectedBoxes.includes(index)}
                isDisabled={selectedBoxes.length === 3 && !selectedBoxes.includes(index)}
              >
                {item.data}
              </Span>            
            ))}
          </div>
            <Check>
                <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleCheckboxChange} 
                />
                <p> Show my orientation on my profile </p>
            </Check>
          
            <SaveButton className="save-btn" onClick={handleSave} isSelected={selectedBoxes.length > 0} >
                Save
            </SaveButton>
        
        </Details>
      );
};

export default SexualOrientation;