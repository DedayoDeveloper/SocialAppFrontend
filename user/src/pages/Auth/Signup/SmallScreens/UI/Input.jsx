import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components'

const Container = styled.div``;

const PassStyle = styled.div`
    position: relative;
    border: ${({ click }) => (click ? '1.5px solid #ac0464' : '1px solid rgb(114, 117, 128)')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    

    input{
        border: none;
        width: 100%;
    }
    span{
        position: absolute;
        right: 0;
        padding-right: 0.4rem;
        

    }
`;


const Input = ({id, name, type, onChange, value}) => {
    const [password, setPassword] = useState(''); // State to manage password input value
    const [passClick, setPassClick] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setPassword(value);

        // Change border color when typing
    };
    const handlePassClick = () => {
        setPassClick(!passClick) 
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    


  return (
    <Container>
        {
            id !== 'password' && <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required
            />
        }

{
            id === 'password' && (
                <PassStyle click={passClick} >

                            <input
                                type={passwordVisible ? 'text' : type}
                                placeholder={'Password'}
                                id={id}
                                name={name}
                                value={value}
                                onChange={onChange}
                                required
                            />
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Conditionally render eye icons */}
                            </span>
                        </PassStyle>
            
        )
        }
        
    </Container>
  )
}

export default Input
