import React, { useState } from 'react'
import styled from 'styled-components'
import Box from '../../../../../components/UI/Box/Box';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center items vertically (along the column direction) */
    align-items: center;     /* Center items horizontally (cross-axis) */
    p{
        font-size: 0.8rem;
        color: silver;
        text-align: center;
    }

    .boxes{
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
        gap: 10px; /* Space between the boxes */
        justify-content: space-evenly;
        width: 100%;    

    }
`;


const LookingFor = () => {
    const [selectedBox, setSelectedBox] = useState(null); // State to keep track of selected box

    const handleClick = (index) => {
        // Only allow setting the selected box if no box is selected yet
        if (selectedBox === null) {
          setSelectedBox(index); // Update the selected state
        }
    };
  return (
    <Container>
          <div className="boxes">
            {[
              { data: 'Long-term Partner', icon: '💘' },
              { data: 'Long-term or short-term Partner', icon: '😍' },
              { data: 'Short-term fun', icon: '🎉' },
              { data: 'New friends', icon: '👋' },
              { data: 'Good vibes', icon: '😎' },
              { data: 'Undecided', icon: '🤔' },
            ].map((item, index) => (
              <Box
                key={index}
                handleClick={() => handleClick(index)} // Pass the index to the click handler
                data={item.data}
                icon={item.icon}
                isSelected={selectedBox === index} // Pass whether this box is selected or not
                isDisabled={selectedBox !== null && selectedBox !== index} // Disable other boxes if one is selected
              />
            ))}
          </div>
          
        
      
    </Container>
  )
}

export default LookingFor
