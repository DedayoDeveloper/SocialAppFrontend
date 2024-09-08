import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    margin: 0 0 5px 0;
    span{
        display: flex;
        flex-direction: column;
        flex: 0 0 12%; 
        min-width: 0;
        input{
            border-radius: 0.3rem;
            border: 1px solid #ccc;
            width: 100%;
            padding: 0.375rem 0.75rem; 
            text-align: center; 
            max-width: 80px;
        }
    }

`;


const Birthday = ({}) => {
  return (
    <Container>
            <span>
                {/* Day Input  */}
                <label htmlFor="day">Day</label>
                <input type="number" id="day" name="day" placeholder="DD" min="1" max="31" />
            </span>
            
            <span>
                {/* Month Input */}
                <label htmlFor="month">Month</label>
                <input type="number" id="month" name="month" placeholder="MM" min="1" max="12" />
            </span>
            
            <span>
                {/* Year Input  */}
                <label htmlFor="year">Year</label>
                <input type="number" id="year" name="year" placeholder="YYYY" min="1900" max="2024" />
            </span>
      
    </Container>
  )
}

export default Birthday
