import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: grid;
    grid-template-columns:  repeat(3, 1fr);
    span{
        display: flex;
        flex-direction: column;
        min-width: 0;
        input{
            border: 1px solid rgb(114, 117, 128);
            width: 100%;
            text-align: center; 
        }
    }

`;


const Birthday = ({}) => {
  return (
    <Container>
            <span>
                {/* Day Input  */}
                <input type="number" id="day" name="day" placeholder="DD" min="1" max="31" />
            </span>
            
            <span>
                {/* Month Input */}
                <input type="number" id="month" name="month" placeholder="MM" min="1" max="12" />
            </span>
            
            <span>
                {/* Year Input  */}
                <input type="number" id="year" name="year" placeholder="YYYY" min="1900" max="2024" />
            </span>
      
    </Container>
  )
}

export default Birthday
