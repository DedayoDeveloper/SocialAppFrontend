import React, { useState } from 'react'
import classes from './Fields.module.css'
import ImageBox from '../Box/ImageBox';
import Modal from '../Modal/Modal';
import LookingForDetaiils from './LookingForDetails/LookingForDetails';
import SexualOrientation from './SexualOrientation/SexualOrientation';
import Interests from './Interests/Interests';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import styled from 'styled-components';
import Hobbies from './Interests/Hobbies';

const PassStyle = styled.div`

    position: relative;
    border: ${({ click }) => (click ? '1.5px solid #ac0464' : '1px solid rgb(114, 117, 128)')};
    display: flex;
    justify-content: space-between;
    

    input{
        border: none;
        width: 100%;
    }
    span{
        position: absolute;
        right: 0;
        background-color: #e9ebee;
        padding-right: 0.4rem;

    }
`;


const Fields = ({type, label}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [clicked, setClicked] = useState(null);
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


    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [showModal, setShowModal] = useState(false); // State to control Modal visibility

    // Function to open the Modal
    const openModalHandler = (event) => {
        const value = event.target.value;
        switch (value) {
            case 'lookingfor':
                setClicked(value);
                setShowModal(true);

                break;
            case 'interests':
                setClicked(value);
                setShowModal(true);
                break;
            case 'hobbies':
                setClicked(value);
                setShowModal(true);
              break;
            default:
                setClicked(null)
            ;
        }
    };

    // Function to close the Modal
    const closeModalHandler = () => {
        setShowModal(false);
    };
    
  return (
    <>
        {label === 'First name' &&
            (
                    <div className={classes.contain}>
                        <label htmlFor={type}>{label}</label>
                        <input
                            className={classes.input}
                            type={type}
                            id={type}
                            name={type}
                            placeholder={label}
                            required
                        />
                </div>
                

            )
        }

        {label === 'Last name' &&
            (
                    <div className={classes.contain}>
                        <label htmlFor={type}>{label}</label>
                        <input
                            className={classes.input}
                            type={type}
                            id={type}
                            name={type}
                            placeholder={label}
                            required
                        />
                </div>
                

            )
        }
        {label === 'Username' &&
            (
                <div className={classes.contain}>
                    <label htmlFor={type}>{label}</label>
                    <input
                        className={classes.input}
                        type={type}
                        id={type}
                        name={type}
                        placeholder={label}
                        required
                    />
                </div>
                

            )
        }

        {label === 'Email' &&
            (
                <div className={classes.contain}>
                    <label htmlFor={type}>{label}</label>
                    <input
                        className={classes.input}
                        type={type}
                        id={type}
                        name={type}
                        placeholder={label}
                        required
                    />
                </div>
                

            )
        }

        {label === 'Phone number' &&
            (
                <div className={classes.contain}>
                    <label htmlFor={type}>{label}</label>
                    <input
                        className={classes.input}
                        type={type}
                        id={type}
                        name={type}
                        placeholder={label}
                        required
                    />
                </div>
                

            )
        }
        
        {label === 'Password' &&
            (
                    <div className={classes.contain}>
                        <label htmlFor={type}>{label}</label>
                        <PassStyle click={passClick} >

                            <input
                                className={classes.input}
                                type={passwordVisible ? 'text' : 'password'}
                                id={type}
                                name={type}
                                placeholder={label}
                                onClick={handlePassClick}
                                onChange={handleInputChange}
                                required
                            />
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Conditionally render eye icons */}
                            </span>
                        </PassStyle>
                        
                </div>
                

            )
        }



        {
            label === 'Date of Birth' &&
            (
                <div className={classes.structure}>
                    
                    <label htmlFor={type}>{label}</label>
                    <div className={classes.birthdayContainer}>
                        <span className={classes.birthdaySpan}>
                            {/* Day Input  */}
                            <label htmlFor="day"></label>
                            <input type="number" id="day" name="day" placeholder="DD" min="1" max="31" className={classes.birthdayInput} />
                        </span>
                        
                        <span className={classes.birthdaySpan}>
                            
                            {/* Month Input */}
                            <label htmlFor="month"></label>
                            <input type="number" id="month" name="month" placeholder="MM" min="1" max="12" className={classes.birthdayInput} />
                        </span>
                        
                        <span className={classes.birthdaySpan}>
                            {/* Year Input  */}
                            <label htmlFor="year"></label>
                            <input type="number" id="year" name="year" placeholder="YYYY" min="1900" max="2024" className={classes.birthdayInput} />
                        </span>
                    </div>

                </div>            
            )
        }

        {
            label === 'Gender' &&
            (
                <div className={classes.structure}>
                    <div className={classes.labelContainer}>
                        <label htmlFor={type}>{label}</label>
                        <div className={classes.checkbox}>
                            <input 
                            type="checkbox" 
                            checked={isChecked} 
                            onChange={handleCheckboxChange} 
                            />
                            <p> Show my gender on my profile </p>
                        </div>

                    </div>
                    <div className={classes.genderContainer}>
                        <button className={classes.gender}>Man</button>
                        <button className={classes.gender}>Woman</button>
                        <button className={classes.gender}>More &gt; </button>
                    </div>
                    
                    
                </div>

            )
        }

        {/* {       
            label === 'Interested in' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                    <div className={`${classes.genderContainer}`}>
                        <button className={classes.gender}>Men</button>
                        <button className={classes.gender}>Women</button>
                        <button className={classes.gender}>Everyone </button>
                    </div>

                </div>

            )
        } */}

         {/* {       
            label === 'Looking for' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                    <button value="lookingfor" className={classes.intent} onClick={openModalHandler}> + Add relationship intent</button>

                </div>

            )
        } */}

   

        {       
            label === 'Interests' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                        <button value="interests" className={classes.intent} onClick={openModalHandler}> + Interests</button>
                        

                </div>

            )
        }

        {       
            label === 'Hobbies' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                        <button value="hobbies" className={classes.intent} onClick={openModalHandler}> + Hobbies</button>

                </div>

            )
        } 

        {
            label === 'Profile Photos' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                    <ImageBox amount={6} />

                    <p className={classes.imageP}>Upload 2 photos to start. Add 4 more to make <br/>your profile stand out </p>

                </div>

            )
        }

    <Modal show={showModal} modalClosed={closeModalHandler}>
        {clicked === 'lookingfor' && <LookingForDetaiils modalClosed={closeModalHandler} />}
        {clicked === 'interests' && <Interests modalClosed={closeModalHandler} />}
        {clicked === 'hobbies' && <Hobbies modalClosed={closeModalHandler} />}

        
    </Modal>

        
      
    </>
  )
}

export default Fields
