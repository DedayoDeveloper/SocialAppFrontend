import React, { useState } from 'react'
import styled from 'styled-components'
import { formOne } from '../data';
import Birthday from './UI/Birthday';
import Gender from './UI/Gender';
import Orientation from './UI/Orientation';
import Interests from './UI/Interests';
import LookingFor from './UI/LookingFor';
import Activities from './UI/Activities';
import Photos from './UI/Photos/Photos';
import Input from './UI/Input';


const ProgressTracker = styled.div`
    background-color: #ac0464;
    height: 15px;
    width:  ${({ width }) => width}%;

`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
    height: calc(100vh - 120px); /* Adjust the height to fit the screen */
    justify-content: space-between; /* Ensures button is at the bottom */
    padding-bottom: 1rem; /* Add some padding at the bottom */

    .cancel{
        font-size: 1.8rem;
        font-weight: 600;
        color: rgb(114, 117, 128);
    }
    h2{
        font-size: 1.7rem;
    }
    input{
        width: 100%;
        border: 1px solid rgb(114, 117, 128);
        padding: 0.4rem;
    }
    input:focus{
        border: 1.5px solid #ac0464;
    }
    p{
        margin: 0.8rem 0;
        font-size: small;
    }

`;

const ContentWrapper = styled.div`
  flex-grow: 1; /* Allows this section to grow and take available space */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align the content to the top */
  margin-top: 1rem; /* Add some margin from the top */
 
`;

const Button = styled.button`
    align-items: flex-end;
    width: 100%;
    margin: 10px auto;
    padding: 0.5rem 1rem;
    background-color: ${({ isComplete, disabled }) =>
    disabled ? 'rgb(114, 117, 128)' : isComplete ? '#ac0464' : 'rgb(114, 117, 128)'};    color: white;
    border: none;
    cursor: pointer;
    &:focus{
        outline: none
`;

const SmallScreens = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
        gender: '',
        orientation: '',
        interests: '',
        lookingfor: '',
        activities: '',
        photos: ''

    });

    const formFields = [
        { name: 'firstname', label: formOne.firstname.title, type: 'name', description: formOne.firstname.info },
        { name: 'lastname', label: formOne.lastname.title, type: 'name', description: formOne.lastname.info },
        { name: 'email', label: formOne.email.title, type: 'email', description: formOne.email.info },
        { name: 'password', label: formOne.password.title, type: 'password', description: formOne.password.info },
        { name: 'birthday', label: formOne.birthday.title, description: formOne.birthday.info },
        { name: 'gender', label: formOne.gender.title, description: formOne.gender.info },
        { name: 'orientation', label: formOne.orientation.title, description: formOne.orientation.info },
        { name: 'interests', label: formOne.interests.title, description: formOne.interests.info },
        { name: 'lookingfor', label: formOne.lookingfor.title, description: formOne.lookingfor.info },
        { name: 'activities', label: formOne.activities.title, description: formOne.activities.info },
        { name: 'photos', label: formOne.photos.title, description: formOne.photos.info },

    ];

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };
    

    const handleNext = () => {
        if (!formData[currentField.name]) {
            alert(`Please fill in the ${currentField.label}.`);
            return;
          }
          
          if (step < formFields.length - 1) {
            setStep(step + 1);
          } else {
            alert('Form Submitted');
          }
    };

    const handlePrevious = () => {
        if (step > 0) {
          setStep(step - 1);
        }
    };

    const currentField = formFields[step];
    const progressPercentage = ((step + 1) / formFields.length) * 100;
    const isCurrentFieldEmpty = !formData[currentField.name]; // Check if the current field is empty

    
  return (
    <>
           
        <ProgressTracker width={progressPercentage}  />
        <Container>
            <span className='cancel' onClick={step > 0 ? handlePrevious : null}>
            {step > 0 ? '<' : 'X'}
            </span>
            <ContentWrapper>
                <div>
                    <h2 htmlFor={currentField.name}>{currentField.label}</h2>
                    {currentField.type && <Input
                    id={currentField.name}
                    name={currentField.name}
                    type={currentField.type}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    required
                    />}
                    {currentField.name === 'birthday' && 
                    <Birthday
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}

                    />}

                    {currentField.name === 'gender' && 
                    <Gender
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}

                    />}

                    {currentField.name === 'orientation' && 
                    <Orientation
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}

                    />}

                    {currentField.name === 'interests' && 
                    <Interests
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    />}

                    {currentField.name === 'lookingfor' && 
                    <LookingFor
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    />}

                    {currentField.name === 'activities' && 
                    <Activities
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    />}

                    {currentField.name === 'photos' && 
                    <Photos 
                    amount={6}
                    id={currentField.name}
                    name={currentField.name}
                    value={formData[currentField.name]}
                    onChange={handleChange}
                    />}


                    {currentField.description && <p>{currentField.description}</p>}
                </div>

            </ContentWrapper>
            
           

            <Button onClick={handleNext} isComplete={step === formFields.length - 1}  disabled={isCurrentFieldEmpty} >
                {step < formFields.length - 1 ? 'Next' : 'Submit'}
            </Button>

        </Container>
        

      
    </>
  )
}

export default SmallScreens
