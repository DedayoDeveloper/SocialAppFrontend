import React, {Component} from 'react';
import classes from './Dashboard.module.css';
import { FindIcon, DownloadMobileIcon , UpdateProfileIcon, ApiEndpoints} from '../../../config/Config';
import { NavLink, Redirect } from 'react-router-dom';
import { SideBar } from '../../../components/SideBar/SideBar';
import { connect } from 'react-redux';
import TripList from '../../../components/Account/Trips/TripList/index'
import * as actions from '../../../store/actions';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import { SERVER_REQUEST } from '../../../shared/Backend';

class VerifyPayment extends Component {



    componentDidMount(){
        console.log("eer",this.props.userData.registrationPayment);

        if(this.props.userData.registrationPayment === true){
            console.log("TRUE")
            this.props.history.push("/dashboard");
        }
        
    }

  

    componentDidUpdate(prevProps, prevState) {
        // if(this.props.userData.registrationPayment === false){
        //     console.log("TRUE")
        //     this.props.history.push("/my-trips");
        // }else{
        //     console.log("FALSE")
        // }
        
    }


    render(){



        const config = {
            reference: (new Date()).getTime(),
            email: this.props.userData.email,
            amount: 100000,
            publicKey: 'pk_live_1bd142ee5490153e27e34f1ba23f402eda1517f5',
        };
        
        const componentProps = {
            ...config,
            text: 'Pay NGN1,000',
            onSuccess: (response) => {
                SERVER_REQUEST(ApiEndpoints.UPDATE_PAYMENT_STATUS(this.props.userData.id), 'post', {}).then((data) => {
            
        
                    if(data.status === 200){
                        this.props.updateUser(data.data)
                        this.props.history.push("/dashboard")
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
            
            <section className={classes.section}>
                <div className="container mt-5">
                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8 mt-5">
                            <div className={classes.welcomeText}>
                                <h4 className="text-center mt-5 text-dark">Hi {this.props.userData.firstname}, it's seems your account has not been activated</h4>
                                <p className="text-center mt-4">You have to pay a registration fee of NGN1,000 to access your account. Proceed to payment</p>

                                <PaystackButton className={classes.paymentButton} {...componentProps} />
                            </div>
                            
                            
                        </div>
                        
                    </div>
                    
                </div>
            </section>
           
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.auth.loading,
        userData: state.auth.userData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser : (userData) => dispatch(actions.updateUserDataAfterPayment(userData))  
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (VerifyPayment);