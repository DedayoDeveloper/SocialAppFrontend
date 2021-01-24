import React, {Component} from 'react';
import classes from './Escort.module.css';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {WelcomeBg, ApiEndpoints} from '../../../config/Config';
import { EscortProfileCard } from '../../../components/Account/EscortCards/EscortCard';
import { NavLink } from 'react-router-dom';
import { SingleEscortCard } from '../../../components/Account/EscortCards/SingleEscort';
import { PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import { SERVER_REQUEST } from '../../../shared/Backend';


const bannerStyle = {

    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${WelcomeBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    padding: '40px 0'

}

export const PayInfoSection = (props) => {
    return(
        <div>
            <p>Some Escort details are hidden until payment is made. Click button below to pay</p>
            <PaystackButton className={classes.paybtn} {...props}>Pay Now</PaystackButton>
        </div>
    )
}

class EscortDetails extends Component {

    state = {
        amount: null,
        loading: false,

    }





    componentDidMount(){
    

        if(this.props.userData.registrationPayment === false){
            this.props.history.push("/make-payment");
        }

        const data ={
            escort: this.props.match.params.id,
            user: this.props.userData.id
        }
        this.getCategoryPrice();
         this.props.fetchSingleEscorts(data)
        
    }

  

    componentDidUpdate(prevProps, prevState) {
        // if(this.props.userData.registrationPayment === false){
        //     console.log("TRUE")
        //     this.props.history.push("/my-trips");
        // }else{
        //     console.log("FALSE")
        // }
        
    }

    componentWillUnmount(){
        
        this.props.onUnload();

    }

    getCategoryPrice = () => {
        const payload = {
            "categoryName": this.props.userData.category
        }
        SERVER_REQUEST(ApiEndpoints.GET_CATEGORY_DETAILS, 'post', payload).then((data) => {
            
        
            if(data.status === 200){
                this.setState({
                    amount: data.data.price
                })
            }

            if(data.status === 500 || data.status !== 200){
               
              
                toast.error('Error Occured while trying to fetch price. Reload the page if payment does not work', {
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
            
            
            toast.error('Error Occured while trying to fetch price. Reload the page if payment does not work', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }




    render(){

        const escort = this.props.singleEscortDetails;

        const config = {
            reference: (new Date()).getTime(),
            email: this.props.userData.email,
            amount: this.state.amount*100,
            publicKey: 'pk_live_1bd142ee5490153e27e34f1ba23f402eda1517f5',
        };
        
        const componentProps = {
            ...config,
            text: 'Make Payment',
            onSuccess: (response) => {
                const data ={
                    escort: parseInt(this.props.match.params.id),
                    user: this.props.userData.id
                }

                SERVER_REQUEST(ApiEndpoints.UPDATE_USER_ESCORT_PAYMENT, 'post', data).then((data) => {
            
        
                    if(data.status === 200){
                        toast.success('Pament Successful. Reloading page...', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });

                            setTimeout(()=>{
                                window.location.reload();
                            },2000)
                    }
        
                    if(data.status === 500 || data.status !== 200){
                       
                      
                        toast.error('Error Occured while trying to update your payment status. Contact Administator if unable to view escort profile', {
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
                    
                    
                    toast.error('Error Occured while trying to update your payment status. Contact Administator if unable to view escort profile', {
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
                <div style={bannerStyle}>
                    <div className="container ">
                        <div className="row justify-content-center ">
                            <div className="col-md-8 ">
                                <div className={classes.welcomeText}>
                                    <p>Escort Details</p>

                                    <NavLink to="/dashboard"> <i className="fa fa-arrow-left"></i> Go Back</NavLink>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                {
                this.props.loading ?
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <SingleEscortCard />
                        </div>
                    </div>
                </div>
                :
                this.props.singleEscortDetails !== null ?
                <div className="container mt-5">
                        {this.props.singleEscortDetails !==null ?
                        
                        this.props.singleEscortDetails.escortDetails.email == null  
                        &&
                         this.props.singleEscortDetails.escortDetails.phone == null ?
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-8 alert alert-info">
                                <PayInfoSection
                                {...componentProps}
                                />
                            </div>
                        </div>
                        :
                        null
                        :
                        null
                        }
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <SingleEscortCard {...escort.escortDetails}/>
                            </div>
                        </div>
                        
                </div>
                : 
                null
                }



                
            </section>
           
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.escort.loading,
        userData: state.auth.userData,
        singleEscortDetails: state.escort.singleEscortDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleEscorts : (id) => dispatch(actions.fetchSingleEscortDetails(id)),
        onUnload: () => dispatch(actions.escortOnUnload())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (EscortDetails);