import React, { useState } from 'react';
import {data} from './data';
import styled from 'styled-components';


const Details = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 1.7rem;
        font-weight: 500;
        text-align: center;
    }

    p{
        font-size: 0.8rem;
        color: silver;
        margin-bottom: 1rem;
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
const Items = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 10px;
`;

const Span = styled.span`
    width: fit-content;
    border: 1px solid silver;
    padding: 0.2rem;
    border-radius: 0.4rem;
    color: ${({ isSelected }) => (isSelected ? '#fff' : 'silver')};

`;

const Interests = ({modalClosed}) => {
    const [count, setCount] = useState(0);
    const [selectedInterests, setSelectedInterests] = useState([]); 

    const handleClick = (index) => {
        if (selectedInterests.includes(index)) {
          // Deselect if already selected
          setSelectedInterests(selectedInterests.filter((i) => i !== index));
        } else if (selectedInterests.length < 5) {
          // Only allow adding if less than 5 are selected
          setCount(count+1)
          setSelectedInterests([...selectedInterests, index]);
        }
    };

    const handleSave = () => {
        // Handle the save action here
        console.log('Saved box indexes:', selectedInterests);
        modalClosed();
        // You can perform further actions like submitting the selected box data
    };
    
  return (
    <Details>
        <h1>What are you into?</h1>
        <p>Give us up to 5 of your interests, let's personalise things for you</p>

        <Items>
            {data.map((item,index)=>
            (
                <Span 
                key={index}
                onClick={() => handleClick(index)}
                isSelected={selectedInterests.includes(index)}
                isDisabled={selectedInterests.length === 3 && !selectedInterests.includes(index)}
                >{item.data}</Span>
            )
        )}
        </Items>
        

        <SaveButton className="save-btn" onClick={handleSave} isSelected={selectedInterests.length === 5} >
            Save {`${count}/5`}
        </SaveButton>
      
    </Details>
  )
}

export default Interests
