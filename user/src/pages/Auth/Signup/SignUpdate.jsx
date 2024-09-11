import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './SignUp.module.css';
import { SignUpBg, ApiEndpoints } from '../../../config/Config';
import { checkValidity } from '../../../shared/Method';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as actions from "../../../store/actions";
import { OverlaySpinner } from '../../../components/UI/Spinner/OverlaySpinner';
import { NavLink } from 'react-router-dom';
import { OTPIcon, VerifyIcon } from '../../../config/Config';
import { SERVER_REQUEST } from '../../../shared/Backend';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import {dataOne, dataTwo} from './data'
import Fields from '../../../components/UI/Form/Fields';
import SmallScreens from './SmallScreens/SmallScreens';


const SignUp = (props) => {
    const dispatch = useDispatch();

    const {
        error, loading, setOTP, isAuth, userRegId, registerSuccess
    } = useSelector(state => ({
        error: state.auth.error,
        loading: state.auth.loading,
        setOTP: state.auth.setOTP,
        isAuth: state.auth.token !== null,
        userRegId: state.auth.userRegId,
        registerSuccess: state.auth.registerSuccess
    }));

    const [formOne, setFormOne] = useState(dataOne);

    const [formTwo, setFormTwo] = useState(dataTwo);

    const [formOneIsValid, setFormOneIsValid] = useState(false);
    const [formTwoIsValid, setFormTwoIsValid] = useState(false);
    const [toggleForm, setToggleForm] = useState(0);

    useEffect(() => {
        if (isAuth && !loading) {
            props.history.push("/dashboard");
        }
        getCategories();
    }, [isAuth, loading, props.history]);

    useEffect(() => {
        if (registerSuccess) {
            setToggleForm(3);
        }
    }, [registerSuccess]);

    const getCategories = () => {
        SERVER_REQUEST(ApiEndpoints.GET_ESCORT_CATEGORIES, 'get')
            .then((data) => {
                if (data.error == null && !data.error) {
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const inputChangedHandler = (event, inputIdentifier, type) => {
        const updateForm = type === 1 ? { ...formOne } : { ...formTwo };
        const updatedFormElement = { ...updateForm[inputIdentifier] };
        updatedFormElement.value = event.target.value;
        const check = checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.errorMsg = check[0];
        updatedFormElement.valid = check[1];
        updatedFormElement.touched = true;
        updateForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updateForm) {
            formIsValid = updateForm[inputIdentifier].valid && formIsValid;
        }

        if (type === 1) {
            setFormOne(updateForm);
            setFormOneIsValid(formIsValid);
        }
        if (type === 2) {
            setFormTwo(updateForm);
            setFormTwoIsValid(formIsValid);
        }
    };

    const nextHandler = (event) => {
        event.preventDefault();
        if (!formOneIsValid) {
            alert('All form fields are required!');
            return;
        }
        setToggleForm(2);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const prevHandler = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setToggleForm(1);
    };

    const signUpHandler = (event) => {
        event.preventDefault();
        if (!formTwoIsValid) {
            alert('All form fields are required!');
            return;
        }

        const formData = {};
        for (let key in formOne) {
            formData[key] = formOne[key].value;
        }

        const formTwoData = {};
        for (let key in formTwo) {
            formTwoData[key] = formTwo[key].value;
        }

        const formValue = { ...formData, ...formTwoData };
        dispatch(actions.signUp(formValue));
    };

    const renderContent = (step, componentProps) => {
        let formElementsArray = [];
        for (let key in formOne) {
            formElementsArray.push({ id: key, config: formOne[key] });
        }

        let preForm = (
            <>
                <div className={classes.darkOverlay}>
                    <h4>Terms and conditions</h4>
                    <p>Before signing up, you must agree to the following rules:</p>
                    <ul>
                        <li> If I see profile pictures of someone I know, I will not reveal their identity.</li>
                        <li> I will respect the sexual desires of my fellow members.</li>
                    </ul>
                    <button onClick={() => setToggleForm(1)}> I agree</button>
                </div>
            </>
        );

        let formOneContent = (
            <>
                <form onSubmit={nextHandler}>
                    {formElementsArray.map(element => (
                        <React.Fragment key={element.id}>
                            <Input
                                label={element.config.label}
                                elementType={element.config.elementType}
                                elementConfig={element.config.elementConfig}
                                value={element.config.value}
                                invalid={!element.config.valid}
                                errorMsg={element.config.errorMsg}
                                shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                changed={(event) => inputChangedHandler(event, element.id, 1)} />
                        </React.Fragment>
                    ))}
                    <Button btnType="Success" disabled={!formOneIsValid}>NEXT</Button>
                </form>
            </>
        );

        return step === 0 ? preForm : formOneContent;
    };

    return (
        <>

            <div className={classes.smallDisplay}>
                <SmallScreens />
                

            </div>


            <div className={classes.largeDisplay}>
                <h1 className={classes.h1}>Create account</h1>
                <div className={classes.container}>
                    <div className={classes.topHalf}>   
                        <div className={classes.formContent}>
                            <Fields type={'name'} label='First name' />
                            <Fields type={'name'} label={'Last name'}/>
                            <Fields type={'name'} label={'Username'}/>
                            <Fields type={'email'} label='Email' />
                            <Fields type={'phone'} label='Phone number' />
                            <Fields type={'password'} label='Password'/>
                            <Fields label={'Date of Birth'} />
                            <Fields label={'Gender'} />
                            <Fields label={'Interested in'}/>
                            <Fields label={'Looking for'}/>
                            <Fields label={'Interests'} />
                            <Fields label={'Hobbies'} />
                        </div>

                        <div className={classes.imageContent}>
                            <Fields label={'Profile Photos'}/>

                        </div>
                    </div>

            
                </div>

            </div>
           




        </>
    );
};

export default SignUp;