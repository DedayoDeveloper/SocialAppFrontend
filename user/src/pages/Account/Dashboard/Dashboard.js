import React, {Component} from 'react';
import classes from './Dashboard.module.css';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {WelcomeBg, ApiEndpoints} from '../../../config/Config';
import { EscortProfileCard } from '../../../components/Account/EscortCards/EscortCard';

const bannerStyle = {

    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${WelcomeBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    padding: '60px 0'

}

class Dashboard extends Component {



    componentDidMount(){
    

        if(this.props.userData.registrationPayment === false){
            this.props.history.push("/make-payment");
        }

        this.props.fetchEscorts(this.props.userData.category)
        
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


    render(){


      

        

    
        return(
            <React.Fragment>
            
            <section className={classes.section}>
                <div style={bannerStyle}>
                    <div className="container ">
                        <div className="row justify-content-center ">
                            <div className="col-md-8 ">
                                <div className={classes.welcomeText}>
                                    <h2>It's time to meet your favourite escort</h2>
                                    <h4 className="text-center">Hi {this.props.userData.firstname}, it's nice to see you.</h4>
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        
                    </div>
                </div>

                <div className="container mt-5">

                        <div>
        <h2 className={classes.profileText}>Profiles related to your Category: "{this.props.userData.category}"</h2>
                        </div>
                        <div className="row justify-content-center">
                            
                                {
                                    this.props.loading ?

                                    [1,2,3,4].map((index) => (
                                        <div  key={index} className="col-md-3 mt-3">
                                            
                                            <EscortProfileCard/>
                                        </div>
                                    ))

                                    :

                                    this.props.escortDetails && this.props.escortDetails.length !== 0 ?
                                        this.props.escortDetails.map((item, index) => (
                                            <div key={index} className="col-md-3 mt-2 d-flex mb-2">
                                                <EscortProfileCard
                                                {...item}
                                                />
                                            </div>
                                        ))
                                        

                                    :

                                    <div className="alert alert-info mt-5 mb-5">
                                        <p>No Profiles matching your selected category. Please keep check back for more profiles. </p>
                                        <p className="mt-3">- Thanks</p>
                                    </div>
                                    
                                }
                            
                        </div>
                        
                    </div>



                
            </section>
           
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loading: state.escort.loading,
        userData: state.auth.userData,
        tripData: state.trip.userTripData,
        tripLoading: state.trip.initiateUserTrip,
        escortDetails: state.escort.escortDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEscorts : (category) => dispatch(actions.fetchEscortDetails(category)),
        onUnload: () => dispatch(actions.escortOnUnload())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);