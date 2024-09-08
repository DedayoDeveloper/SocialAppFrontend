import React, { useState } from 'react'
import styled from 'styled-components'
import { data } from '../../../../../components/UI/Form/Interests/data';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

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
    background-color: ${({ isSelected }) => (isSelected ? '#ac0464' : 'transparent')};

`;

const Activities = () => {
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
  return (
    <Container>
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
        
      
    </Container>
  )
}

export default Activities
