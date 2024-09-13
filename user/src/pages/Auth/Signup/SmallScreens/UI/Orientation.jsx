import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    p{
        font-size: 0.8rem;
        text-align: center;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

    }   

`;

const Check = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin: 9px 0;
    input {
        width: 20px!important; /* Adjust width as needed */
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

const Span = styled.span`
  border-bottom: 1px solid rgb(114, 117, 128, 0.3);
  padding: 0.7rem;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? '#ac0464' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#000')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  opacity: ${({ isDisabled }) => (isDisabled ? '0.6' : '1')};
  margin-bottom: 5px;
`;

const Orientation = () => {
    const [selectedBoxes, setSelectedBoxes] = useState([]); // State to keep track of selected box
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
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

  return (
    <Container>
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
      
    </Container>
  )
}

export default Orientation
