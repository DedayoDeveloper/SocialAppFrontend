import React, { useState } from 'react';
import Box from '../../Box/Box';
import styled from 'styled-components';




const Details = styled.div`
display: flex;
flex-direction: column;
justify-content: center; /* Center items vertically (along the column direction) */
align-items: center;     /* Center items horizontally (cross-axis) */
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

.boxes{
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
    gap: 10px; /* Space between the boxes */
    justify-content: space-evenly;
    width: 100%;    

}
.save-btn {
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
  }

`;

const LookingForDetaiils = ({modalClosed}) => {
    const [selectedBox, setSelectedBox] = useState(null); // State to keep track of selected box

    const handleClick = (index) => {
        // Only allow setting the selected box if no box is selected yet
        if (selectedBox === null) {
          setSelectedBox(index); // Update the selected state
        }
      };

      const handleSave = () => {
        // Handle the save action here
        console.log("Saved box index:", selectedBox);
        modalClosed();
        // You can perform further actions like submitting the selected box data
      };

      
    return (
        <Details isSelected={selectedBox !== null}>
          <h1>What are you looking for?</h1>
          <p>There's something for everyone, should you need adjustments.</p>
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
          
            <button className="save-btn" onClick={handleSave}>
                Save
            </button>
        
        </Details>
      );
};

export default LookingForDetaiils;