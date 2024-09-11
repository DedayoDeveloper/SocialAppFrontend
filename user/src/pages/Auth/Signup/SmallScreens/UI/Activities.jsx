import React, { useState } from 'react';
import styled from 'styled-components';

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
  cursor: pointer;
`;

const Activities = ({ activitiesData, selectedActivities, onSelectActivity, type }) => {
  const handleClick = (index) => {
    onSelectActivity(index, type); // Call parent function to manage selection
  };


  return (
    <Container>
      <Items>
        {activitiesData.map((item, index) => (
          <Span
            key={index}
            onClick={() => handleClick(index)}
            isSelected={selectedActivities.includes(index)}
            isDisabled={selectedActivities.length >= 4 && !selectedActivities.includes(index)}
          >
            {item.data}
          </Span>
        ))}
      </Items>
    </Container>
  );
};

export default Activities;
