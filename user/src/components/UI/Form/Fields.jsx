import React, { useState } from 'react'
import classes from './Fields.module.css'
import ImageBox from '../Box/ImageBox';
import Modal from '../Modal/Modal';
import LookingForDetaiils from './LookingForDetails/LookingForDetails';
import SexualOrientation from './SexualOrientation/SexualOrientation';
import Interests from './Interests/Interests';

const Fields = ({type, label}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [clicked, setClicked] = useState(null);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
      console.log("Checkbox checked:", event.target.checked); // To show current state in console
    };

    const [showModal, setShowModal] = useState(false); // State to control Modal visibility

    // Function to open the Modal
    const openModalHandler = (event) => {
        const value = event.target.value;
        console.log(value);
        switch (value) {
            case 'lookingfor':
                console.log(value);
                setClicked(value);
                setShowModal(true);
                console.log(clicked);

                break;
            case 'interests':
                setClicked(value);
                setShowModal(true);
                break;
            case 'orientation':
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
        {type &&
            (
                <div className={classes.structure}>
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

        {
            label === 'Birthday' &&
            (
                <div className={classes.structure}>
                    
                    <label htmlFor={type}>{label}</label>
                    <div className={classes.birthdayContainer}>
                        <span className={classes.birthdaySpan}>
                            {/* Day Input  */}
                            <label htmlFor="day">Day</label>
                            <input type="number" id="day" name="day" placeholder="DD" min="1" max="31" className={classes.birthdayInput} />
                        </span>
                        
                        <span className={classes.birthdaySpan}>
                            
                            {/* Month Input */}
                            <label htmlFor="month">Month</label>
                            <input type="number" id="month" name="month" placeholder="MM" min="1" max="12" className={classes.birthdayInput} />
                        </span>
                        
                        <span className={classes.birthdaySpan}>
                            {/* Year Input  */}
                            <label htmlFor="year">Year</label>
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
                    <label htmlFor={type}>{label}</label>
                    <div className={classes.genderContainer}>
                        <span className={classes.gender}>Man</span>
                        <span className={classes.gender}>Woman</span>
                        <span className={classes.gender}>More &gt; </span>
                    </div>
                    
                    <div className={classes.checkbox}>
                        <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={handleCheckboxChange} 
                        />
                        <p> Show my gender on my profile </p>
                     </div>

                </div>

            )
        }

        {       
            label === 'Interested in' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                    <div className={`${classes.genderContainer}`}>
                        <span className={classes.gender}>Men</span>
                        <span className={classes.gender}>Women</span>
                        <span className={classes.gender}>Everyone </span>
                    </div>

                </div>

            )
        }

         {       
            label === 'Looking for' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                    <div className={classes.extras}>
                        <button value='lookingfor' className={classes.intent} onClick={openModalHandler}> + Add relationship intent</button>

                    </div>

                </div>

            )
        }

        {
            label === 'Optional' &&
            (
                <div className={classes.optional}>
                    <span></span>
                    {label}
                    <span></span>
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

        {       
            label === 'Interests' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                    <div className={classes.extras}>
                        <button value="interests" className={classes.intent} onClick={openModalHandler}> + Interests</button>
                        
                    </div>

                </div>

            )
        }

        {       
            label === 'Sexual Orientation' &&
            (
                <div className={classes.structure}>
                    <label htmlFor={type}>{label}</label>
                    <div className={classes.extras}>
                        <button value="orientation" className={classes.intent} onClick={openModalHandler}> + Sexual Orientation</button>
                    </div>

                </div>

            )
        }

    <Modal show={showModal} modalClosed={closeModalHandler}>
        {clicked === 'lookingfor' && <LookingForDetaiils modalClosed={closeModalHandler} />}
        {clicked === 'interests' && <Interests modalClosed={closeModalHandler} />}
        {clicked === 'orientation' && <SexualOrientation modalClosed={closeModalHandler} />}

        
    </Modal>

        
      
    </>
  )
}

export default Fields
