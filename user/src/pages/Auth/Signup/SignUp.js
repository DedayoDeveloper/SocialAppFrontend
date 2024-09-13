import React, { Component } from 'react';
import classes from './SignUp.module.css';
import {SignUpBg, ApiEndpoints} from '../../../config/Config';
import {checkValidity} from '../../../shared/Method'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";
import { OverlaySpinner } from '../../../components/UI/Spinner/OverlaySpinner';
import {NavLink} from 'react-router-dom'
import {OTPIcon, VerifyIcon} from '../../../config/Config'
import { SERVER_REQUEST } from '../../../shared/Backend';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import { dataOne, dataTwo } from './data';


const bgLeft = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${SignUpBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}



class SignUp extends Component{

    state = {
        formOne: dataOne,
        formTwo: dataTwo,

        formOneIsValid: false,
        formTwoIsValid: false,
        errorMsg: {},
        toggleForm: 0,
        authSuccess:true
    }

    

    componentDidMount(){

        // if (this.props.setOTP && !this.props.loading) {
        //     this.props.history.push("/verify-otp");
            
        //   } 
  
          if (this.props.isAuth && !this.props.loading) {
              this.props.history.push("/dashboard");
              
          }

          this.getCategories();
    }

    getCategories = () => {
        SERVER_REQUEST(ApiEndpoints.GET_ESCORT_CATEGORIES, 'get').then((data) => {
           
            if(data.error == null && !data.error){
                console.log(data)
            }

        }).catch((error) => {

        })
    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.props.setOTP && !this.props.loading) {
        //   this.props.history.push("/verify-otp");
          
        // } 

        if (this.props.isAuth && !this.props.loading) {
            this.props.history.push("/dashboard");
            
        }

        

        if(prevProps.registerSuccess!==this.props.registerSuccess){
            //Perform some operation here
            this.setState({toggleForm: 3})
        }

      }

      componentWillUnmount(){
        
        this.props.onUnload();

    }

    inputChangedHandler = (event, inputIdentifier, type)=> {

        let updatedLoginForm = {}
        if(type === 1){
            updatedLoginForm = {
                ...this.state.formOne
            };
        }
        if(type === 2){
            updatedLoginForm = {
                ...this.state.formTwo
            };
        }
        
        const updatedFormElement = { 
            ...updatedLoginForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        let check = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        
        updatedFormElement.errorMsg = check[0]; 
        updatedFormElement.valid = check[1]; 
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }

        if(type === 1){
            this.setState({formOne: updatedLoginForm, formOneIsValid: formIsValid});
        }
        if(type === 2){
            this.setState({formTwo: updatedLoginForm, formTwoIsValid: formIsValid});
        }
        
    }

    nextHandler = (event) => {
        event.preventDefault();
        if(!this.state.formOneIsValid){
            alert('hhe')
            return
        }

        this.setState({toggleForm: 2})
        
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
          

        // const formData = {};
        // for( let key in this.state.loginForm){
        //     formData[key]=this.state.loginForm[key].value;
        // }

        // alert(formData)
        
    }
    prevHandler = ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        this.setState({toggleForm: 1})
    }

    signUpHandler = (event) => {
        event.preventDefault();
        if(!this.state.formTwoIsValid){
            alert('All form fields are important!')
            return
        }

        const formData = {};
        for( let key in this.state.formOne){
            formData[key]=this.state.formOne[key].value;
        }

        const formTwoData = {};
        for( let key in this.state.formTwo){
            formTwoData[key]=this.state.formTwo[key].value;
        }

        const formValue = {
            ...formData,
            ...formTwoData
        }
        console.log(formValue);
        
        this.props.onAuth(formValue);
        // alert("Feature Disabled. Check back Later")
    }

    renderContent = (step, componentProps) => {
        

        let formElementsArray = [];
        for(let key in this.state.formOne){
            formElementsArray.push({
                id: key,
                config: this.state.formOne[key]
            })
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
                    <button onClick={() => this.setState({toggleForm: 1})}> I agree</button>
                </div>
            </>
        )

        

        let formOne = (
            <React.Fragment>
                <form onSubmit={this.nextHandler}>
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
                        changed={(event) => this.inputChangedHandler(event, element.id, 1)}/>
                       
                        </React.Fragment>
                    ))}
            
            <Button btnType="btnFull" clicked={this.loginHandler} disabled={!this.state.formOneIsValid}>Next</Button>
            </form>
            </React.Fragment>
            );


        let formElementsArrayTwo = [];
        for(let key in this.state.formTwo){
            formElementsArrayTwo.push({
                id: key,
                config: this.state.formTwo[key]
            })
        }

        let formTwo = (
            <React.Fragment>
                <form style={{transition: 'transform 0.3s ease-out'}} onSubmit={this.signUpHandler}>
                    {formElementsArrayTwo.map(element => (
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
                        changed={(event) => this.inputChangedHandler(event, element.id, 2)}/>
                       
                        </React.Fragment>
                    ))}
                   
                    <div className={classes.nextPrev}>
                    <Button btnType="btnPrev" clicked={this.prevHandler} disabled={!this.state.formOneIsValid || this.props.loading}>Previous</Button>
                    <Button btnType="btnFull" clicked={this.signUpHandler} disabled={!this.state.formTwoIsValid || this.props.loading}>Sign Me Up!</Button>
                    </div>
            
            </form>
            </React.Fragment>
        );


        let paymentForm = (
            <>
    
                <div style={{width:'100%',position:'relative', background:'#fff', padding:'20px'}}>
                        <div className={classes.Otp}>
                            <h1>Success</h1>
                                <>
                                <img src={VerifyIcon} alt="verify success" />
                                <p style={{color:'#000'}}>Registration Successful !!!</p>

                                <p>Proceed to pay registration fee of NGN1000 to access your account</p>

                                <small style={{color:'red'}}>NOTE: You can pay now or when you login to your account</small>

                                <PaystackButton className={classes.paymentButton} {...componentProps} />
                                <p>OR</p>
                                <NavLink to="/login">Login</NavLink>
                                </>
                            
                            

                        </div>
                </div>
            </>
        )

        let paymentSuccess = (
            <>
    
                <div style={{width:'100%',position:'relative', background:'#fff', padding:'20px'}}>
                        <div className={classes.Otp}>
                            <h1>Success</h1>
                                <>
                                <img src={VerifyIcon} alt="verify success" />
                                <p style={{color:'#000', fontSize:'20px'}}>Payment Successful !!!</p>

                                
                                <NavLink to="/login">Login</NavLink>
                                </>
                            
                            

                        </div>
                </div>
            </>
        )


        switch (step) {
            case 0:
                return preForm;
            case 1:
                return formOne;
            case 2:
                return formTwo;
            case 3:
                return paymentForm;
            case 4:
                return paymentSuccess;
            default:
                break;
        }


    }

    

    render(){

        const config = {
            reference: (new Date()).getTime(),
            email: this.state.formTwo.email.value,
            amount: 100000,
            publicKey: 'pk_live_1bd142ee5490153e27e34f1ba23f402eda1517f5',
        };
        
        const componentProps = {
            ...config,
            text: 'Pay NGN1,000',
            onSuccess: (response) => {
                SERVER_REQUEST(ApiEndpoints.UPDATE_PAYMENT_STATUS(this.props.userRegId), 'post', {}).then((data) => {
            
        
                    if(data.status === 200){
                       
                        this.setState({toggleForm: 4})
                    }
        
                    if(data.status === 500 || data.status !== 200){
                       
                      
                        toast.error('Error Occured while trying to update your payment status. Contact Administator if unable to login', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });
                    }
                    
                    
                    
                }).catch((error) => {
                    
                    
                    toast.error('Error Occured while trying to update your payment status. Contact Administator if unable to login', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                })
                
            },
            onClose: () => alert('Are you sure you want to stop payment session?')
        };
        

        

        return(
        <React.Fragment>
            <div style={bgLeft} className={classes.SignUp}>
                <div className="container">
                        <div className="row justify-content-lg-center">
                            <div className="col-md-5">
                            <div  className={classes.rightItem}>
                                <div className={classes.formArea}>
                                    <div className={classes.formHeader}> 
                                        <h3>Create your account</h3>
                                    </div>
                                        
                                        
                                    <div style={{width:'100%',position:'relative'}}>
                                    
                                        {this.renderContent(this.state.toggleForm, componentProps)}
                                    
                                
                                    
                                    <OverlaySpinner loading={this.props.loading} />
                                    </div>

                                    <div style={{margin:'30px 0', textAlign:'center'}}>
                                        <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
                                    </div>
                                   
                                    
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                </div>

                
            </div>
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      error: state.auth.error,
      loading: state.auth.loading,
      setOTP: state.auth.setOTP,
      isAuth: state.auth.token !== null,
      userRegId: state.auth.userRegId,
      registerSuccess: state.auth.registerSuccess
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
      onAuth: (formData) => dispatch(actions.signUp(formData)),
      onUnload: () => dispatch(actions.onUnload())
  
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);