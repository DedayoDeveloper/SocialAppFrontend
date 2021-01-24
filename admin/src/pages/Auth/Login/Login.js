import React, { Component } from 'react';
import classes from './Login.module.css';
import {LoginBg} from '../../../config/Config';
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import {checkValidity} from '../../../shared/Method'
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";
import {OverlaySpinner} from '../../../components/UI/Spinner/OverlaySpinner'
import {NavLink} from 'react-router-dom';


const bgLeft = {
    backgroundImage: `linear-gradient(rgb(0 0 0), rgb(0 0 0 / 73%)), url(${LoginBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
}

class Login extends Component{

    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ''
                },
                label: 'Email Address',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: ''
                },
                label: 'Password',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
            },
        },
        formIsValid: false,
        errorMsg: {}
    }

    componentDidMount(){
       
        this.componentCheckAuth();
    }


    componentDidUpdate(prevProps) {
        this.componentCheckAuth();
    }

    componentWillUnmount(){
        
        this.props.onUnload();

    }

      componentCheckAuth = () =>{
        
  
        if (this.props.isAuth && !this.props.loading) {
            this.props.history.push("/dashboard");
              
        }
      }

    inputChangedHandler = (event, inputIdentifier)=> {
        const updatedLoginForm = {
            ...this.state.loginForm
        };
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
        this.setState({loginForm: updatedLoginForm, formIsValid: formIsValid});
    }

    loginHandler = (event) => {
        event.preventDefault();
        if(!this.state.formIsValid){
            alert('All fields are important')
            return
        }

        const formData = {};
        for( let key in this.state.loginForm){
            formData[key]=this.state.loginForm[key].value;
        }

        //alert("Feature Disabled. Check back Later")
        this.props.onAuth(formData);
        
    }


    render(){
        let message = '';
        if(this.props.message && this.props.message.type === "login"){
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // });
            message = <p style={{color:'red'}}>{this.props.message.msg}</p>
        }

        let formElementsArray = [];
        for(let key in this.state.loginForm){
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
            <React.Fragment>
                <form onSubmit={this.loginHandler}>
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
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                        //addon = {element.config.inputAddon}
                        />
                       
                        </React.Fragment>
                    ))}
            {/* <div style={{margin:'0 0 18px 0'}}><NavLink to="/reset-password">Forget Password?</NavLink></div> */}
             {message ? <div className="app-error">{message}</div> : ''}
            <Button btnType="btnFull" clicked={this.loginHandler} disabled={!this.state.formIsValid || this.props.loading}>Login</Button>
            </form>
            </React.Fragment>
            );
        return(
        <React.Fragment>
            <div  style={bgLeft} className={classes.Login}>
                <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-md-5">
                            <div className={classes.formArea}>
                                <div className={classes.formHeader}> 
                                    <h3>Admin Login</h3>
                                    <p>Login securely to your accout!</p>
                                </div>
                                
                                <div style={{width:'100%',position:'relative'}}>

                                {form}
                                <OverlaySpinner loading={this.props.loading} />
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
      message: state.auth.message,
      isAuth: state.auth.token !== null,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
  
      onAuth: (formData) => dispatch(actions.auth(formData)),
      onUnload: () => dispatch(actions.onUnload())
  
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Login);