import React, { Component } from 'react';
import classes from './Bookings.module.css';
import {SideBar} from '../../../components/SideBar/SideBar';
import { BookingSingle } from '../../../components/Account/Bookings/BookingSingle';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import { Formik, Form, FieldArray, getIn, Field } from "formik";
import * as Yup from "yup";
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { GET_USER } from '../../../shared/Storage';
import Modal from '../../../components/UI/Modal/Modal';
import {VerifyIcon, ErrorIcon} from '../../../config/Config'
import {OverlaySpinner} from '../../../components/UI/Spinner/OverlaySpinner'
import { NavLink } from 'react-router-dom';
//import Input from '../../../components/UI/Input/Input';


const Input = (props) => {
    //const errorMessage = getIn(errors, field.name);
    return (
        <input disabled={props.issubmitting === 'true' ? true : false} style={{display:'block'}} {...props} />
    );
  };

const validatePhonenumber = (value) => {
    let error;

    var reg = new RegExp('^' +       // No leading content.
    '[-+]?' +                       // Optional sign.
    '(?:[0-9]{0,30}\\.)?' +         // Optionally 0-30 decimal digits of mantissa.
    '[0-9]{1,30}' +                 // 1-30 decimal digits of integer or fraction.
    '(?:[Ee][-+]?[1-2]?[0-9])?' +   // Optional exponent 0-29 for scientific notation.
    '$');
   
  if (!reg.test(value)) {
    error = 'Phone number is invaid';
  }
  return error;
}

const config = {
    reference: (new Date()).getTime(),
    email: "user@example.com",
    amount: 20000,
    publicKey: 'pk_test_0f36bfd602507a3a7647ef2cb0af827c178cd335',
};

const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
    onSuccess: (response) => {
        console.log(response);
    },
    onClose: () => null
};


class BookingSummary extends Component{


    state ={
        bookingState:0,
        withOthersForm:[
            {id:1,coridername:'',coriderphonenumber:''}
        ],
        withOthersData:[],
        forOthersData:[],
        modalState: false,
        
        
    }

    riderValidationSchema = Yup.object().shape({
        withOthers:Yup.array().of(
            Yup.object().shape({
                coridername: Yup.string().required("Co-rider Name is Required"),
                coriderphonenumber: Yup.string().required("Co-Rider Phonenumber is Required"),
            })
        )
      });

      othersValidationSchema = Yup.object().shape({
        forOthers:Yup.array().of(
            Yup.object().shape({
                coridername: Yup.string().required("Rider Name is Required"),
                coriderphonenumber: Yup.string().required("Rider Phonenumber is Required"),
            })
        )
      });

    componentDidMount(){
       
        const data ={
            id: this.props.match.params.id
        }
        this.props.getTripDetails(data);
    }
    static getDerivedStateFromProps(nextProps, prevState){
     
        if(nextProps.bookingError!==prevState.modalClosed && prevState.modalClosed){
          return { modalState: nextProps.bookingError};
        }
        else return null;
     }
     
     
    componentDidUpdate(prevProps, prevState){

        

        if(prevProps.bookingError!==this.props.bookingError){
            //Perform some operation here
            this.setState({
                modalState: this.props.bookingError
            })
        }
        if(prevProps.bookingStatus!==this.props.bookingStatus && this.props.bookingStatus === true){
            setTimeout(()=>{
                this.props.history.push("/my-trips")
            }, 5000)
        }
    }

    componentWillUnmount(){
        this.props.onUnload()
    }

    toggleStateHandler = (data) => {
        this.setState({
            bookingState: data,
            //withOthersData:[],
            //forOthersData:[]
         })
    }

    addWithOthers = (data) => {
        
        this.setState({ 
            withOthersData: data
        });
      };

      addForOthers = (data) => {
        console.log(data);
        this.setState({ 
            forOthersData: data 
        });
      };

      toggleModal = () => {
          
        this.setState(
            { modalState: false}
        );
        
     }
    


      PaymentHandler = (type) => {
          let price = this.props.tripDetails.price
        if(this.state.bookingState === 0){
            alert('please select booking type');
            return
        }

        let formData = {}



        if(this.state.bookingState === 1){

            

            if(type === "cash"){
                formData = {
                    numberofseats:1,
                    paymentreferenceid:"",
                    usergoing:true,
                    corider: []
                }
                console.log(`1`, formData)
                this.props.bookTrip(formData, this.props.match.params.id);
                
                
            }

            if(type === "online"){

                formData = {
                    numberofseats:1,
                    paymentreferenceid:"",
                    usergoing:true,
                    corider: []
                }
                
                console.log(formData)
                //this.props.bookTrip(formData, this.props.match.params.id);
            }
            
        }

        if(this.state.bookingState === 2 && this.state.withOthersData.length !== 0){
            price = this.props.tripDetails.price * (this.state.withOthersData.length + 1);

            if(type === "cash"){
                formData = {
                    numberofseats:this.state.withOthersData.length + 1,
                    paymentreferenceid:"",
                    usergoing:true,
                    corider: this.state.withOthersData
                }
                console.log(`2`,formData)
                this.props.bookTrip(formData, this.props.match.params.id);
            }
           
        }

        if(this.state.bookingState === 3 && this.state.withOthersData.length !== 0){
            

            if(type === "cash"){
                formData = {
                    numberofseats:this.state.withOthersData.length,
                    paymentreferenceid:"",
                    usergoing:false,
                    corider: this.state.withOthersData
                }
                console.log(`3`,formData)
                this.props.bookTrip(formData, this.props.match.params.id);
            }
            
        }

        


        
      }


    render(){

        let trip = null
        
       
           
        

        if(this.props.loading){
            
            trip = (<div className="row">
            <div className="col-md-8 ">
                   <BookingSingle />
            </div>
            <div className="col-md-4">
                <SideBar type="payment" />
            </div>
            </div>)
        }

        if(this.props.error){
            trip = (<p>{this.props.error}</p>)
        }

        if(this.props.tripDetails && this.props.tripDetails.length !== 0){
            trip = (
                <div className="row">
            <div className="col-md-8 ">

                   <BookingSingle 
                   {...this.props.tripDetails}
                   toggleState={this.toggleStateHandler}
                   bookingState = {this.state.bookingState}
                   />
                   <OverlaySpinner loading={this.props.bookingLoading} />

                   
                        <Formik 
                         initialValues={{ 
                             withOthers: [{ id: new Date().getUTCMilliseconds(), coridername:"", coriderphonenumber:""}],
                             forOthers: [{ id: new Date().getUTCMilliseconds(), coridername:"", coriderphonenumber:""}]
                          }}
                         onSubmit={(values, actions) => {
                            
                            // alert(JSON.stringify(values.withOthers, null, 2));
                            this.addWithOthers(values.withOthers)
                            
                          }}
                         validationSchema={this.riderValidationSchema}
                     >
                         {({ values, errors, touched, isSubmitting,initialValues }) => (
                             <React.Fragment>
                             <Form>
                             {this.state.bookingState === 2 || this.state.bookingState === 3 ?
                                 <FieldArray name="withOthers">
                                     {({push, remove}) => (
                                         <div className={classes.wrapperDiv}>
                                             <h4 style={{margin:'6px 0 26px 0', fontSize:'17px'}}> {this.state.bookingState === 2 ? 'Kindly enter the details of co-riders:' : 'Kindly enter the details of Passengers'}</h4>
                                             {values.withOthers.map((p, index) => {
                                                 const nameco = `withOthers[${index}].coridername`;
                                                 const errorMessageName = getIn(errors, nameco);
                                                 const errorMessageNameTouch = getIn(touched, nameco);
                                                 const numberco = `withOthers[${index}].coriderphonenumber`;
                                                 const errorMessageNumber = getIn(errors, numberco);
                                                 const errorMessageNumberTouch = getIn(touched, numberco);
                                                 const idd = `withOthers[${index}].id`;

                                                 return (
                                                     <div className={classes.formDiv} key={p.id}>
                                                            <div className={classes.subWrap}>
                                                            <input
                                                                type="text"
                                                                style={{ display: "none" }}
                                                                value={initialValues.withOthers.id}
                                                                name={idd}
                                                                
                                                            />
                                                            <Field name={nameco} as={Input} placeholder="Name" issubmitting={this.state.withOthersData.filter(vendor => vendor.id === p.id).length === 0 ? 'false' : 'true'} />
                                                            {errorMessageName && errorMessageNameTouch? (
                                                                <p style={{ color: "red",fontSize:'12px' }} >{errorMessageName}</p>
                                                            ) : null}

                                                            <Field name={numberco}  as={Input} placeholder="Phonenumber" issubmitting={this.state.withOthersData.filter(vendor => vendor.id === p.id).length === 0 ? 'false' : 'true'} validate={validatePhonenumber} />
                                                            {errorMessageNumber && errorMessageNumberTouch ? (
                                                                <p style={{ color: "red",fontSize:'12px' }} >{errorMessageNumber}</p>
                                                            ) : null}
                                                            </div>
                                                            {this.state.withOthersData.filter(vendor => vendor.id === p.id).length === 0  ? <button className={classes.add}  type="submit">Add </button>
                                                            :
                                                            <button className={classes.remove} onClick={() => {
                                                                console.log(p.id)
                                                                

                                                                this.setState({
                                                                    withOthersData: this.state.withOthersData.filter(
                                                                      (c) => c.id !== p.id
                                                                    ),
                                                                  });
                                                
                                                                  remove(index)
                                                                
                                                                }} >Remove </button>
                                                            }
                                                            
                                                            
                                                     </div>
                                                 )
                                             })}
                                            <button
                                            className={classes.addMore} 
                                            type="button"
                                            onClick={() => push({
                                                id:  new Date().getUTCMilliseconds(), coridername:"", coriderphonenumber:""
                                            })}><i className="fa fa-plus" aria-hidden="true"></i> Add More Rider</button>
                                         </div>
                                     )}
                                 </FieldArray>
                                 
                                 : ''
                                 }
                                 {/* <pre>
                                     {JSON.stringify(errors, null, 2)}
                                 </pre> */}
                             </Form>
                             </React.Fragment>
                         )}

                    </Formik>
                   
            </div>
            <div className="col-md-4">
                <SideBar 
                price={this.props.tripDetails.price} 
                type="payment"
                bookingState = {this.state.bookingState}
                withOthers= {this.state.withOthersData.length}
                forOthers= {this.state.forOthersData.length}
                bookingLoading = {this.props.bookingLoading}
                pay={this.PaymentHandler}  />
            </div>
            </div>
            )
        }


        let modal =  null
        if(this.props.bookingStatus === true){
            modal = <Modal show={this.props.bookingStatus} modalClosed={this.toggleUpload}>
            <div style={{textAlign:'center'}}>
                <img style={{width:'70px'}} src={VerifyIcon} alt="verify success" />
                <h5 style={{margin:'23px 0'}}>Booking was successful</h5>
                <p>Redirecting you to trips bookings page...</p>
                <p style={{fontSize:'11px'}}>If this page does not redirect in 5secs, click the <NavLink to="/my-trips">link to redirect</NavLink></p>
            </div>
        </Modal>
        }

        if(this.props.bookingError === true){
            
            modal = <Modal show={this.state.modalState} modalClosed={this.toggleModal}>
            <div style={{textAlign:'center'}}>
                <img style={{width:'70px'}} src={ErrorIcon} alt="verify error" />
                <h5 style={{margin:'23px 0'}}>An error occured! Please try again later</h5>
                
            </div>
        </Modal>
        }

        


        return(
            <React.Fragment>
                
                <section className={classes.section}>
                <div className="container">
                {trip}
                {modal}
            {/* <PaystackButton {...componentProps} /> */}
            {/* <PaystackConsumer {...componentProps} >
                {({ initializePayment }) => <button onClick={() => initializePayment() }>Paystack Consumer Implementation</button> }
            </PaystackConsumer> */}
                </div>
            </section>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        error: state.trip.error,
        loading: state.trip.loading,
        userData: state.auth.userData,
        tripDetails: state.trip.tripDetails,
        bookingLoading: state.trip.initiateBooking,
        bookingStatus: state.trip.bookingStatus,
        bookingError: state.trip.bookingError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTripDetails: (id) => dispatch(actions.getTripDetails(id)),
        onUnload: () => dispatch(actions.tripOnUnload()),
        bookTrip: (formData, id) => dispatch(actions.bookTrip(formData, id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (BookingSummary);