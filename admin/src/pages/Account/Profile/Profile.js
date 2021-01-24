import React, { Component } from 'react';
import classes from './Profile.module.css';
import { Tab } from '../../../components/UI/Tab/Tab';
import { SideBar } from '../../../components/SideBar/SideBar';
import {checkValidity} from '../../../shared/Method'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import { ProfileIcon } from '../../../config/Config';
import Modal from '../../../components/UI/Modal/Modal';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { OverlaySpinner } from '../../../components/UI/Spinner/OverlaySpinner';

class Profile extends Component{

    state = {
        tabsettings :{
            tab1: {
                id:'personal',
                value: 'Personal Information'
            },
            // tab2: {
            //     id:'next-of-kin',
            //     value: 'Next Of Kin'
            // },
            tab3: {
                id:'password',
                value: 'Change Password'
            }
        },
        currentTab: 'personal',
        
        errorMsg: {},
        toggleForm: false,
        uploadState: false
    }

    profileSchema = Yup.object().shape({
        fullname: Yup.string().required("Full name is Required"),
        phonenumber: Yup.string().required("Phone Number is Required"),
        email: Yup.string()
          .email("enter a vaild email address")
          .required("email is Required"),
        kinname: Yup.string().required("Kin full name is Required"),
        kinphonenumber: Yup.string().required("Kin phone number  is Required"),
        kinemail: Yup.string()
          .email("enter a vaild email address")
          .required("email is Required"),

        kinaddress: Yup.string().required("Kin address is Required"),

      });

    componentDidMount(){
        this.props.fetchProfileDetails();
    }

    toggleTab =  (tab) => {
        this.setState({ currentTab: tab });
    };

    
    toggleUpload = () => {
        this.setState(prevState =>
            ({ uploadState: !prevState.uploadState}));
    }


    render(){

        console.log('profile data',this.props.profileData)

        let uploadForm = (
            <div className={classes.uploadDiv}>
                <div className={classes.item1}>
                    <img src={ProfileIcon} alt="profile img" />
                </div>
                <div className={classes.item2}> 
                    <div>
                        <p>Select a file to upload below</p>
                        <input type="file"  />
                    </div>
                    <Button btnType="saveUpload">Save</Button>
                </div>
            </div>
        )
        

        


        let formik = null

        if(this.props.loading && this.props.profileData.length === 0){
            formik =(<h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '17px'}}>Fetching your profile details....</h4>)
        }

        if(this.props.error){
            formik =(<h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '17px'}}>{this.props.error.msg}</h4>)
        }
        
        if(this.props.profileData.length !== 0){
        formik = (
            <>
            <div className={classes.profileUpload}>
                <div><img src={ProfileIcon} alt="profile" /></div>
                <Button clicked={this.toggleUpload} btnType="photoUpload">Change Photo</Button>
            </div>
                    <Formik 
                         initialValues={{ 
                             fullname: this.props.profileData.fullname,
                             phonenumber: this.props.profileData.phonenumber,
                             email: this.props.profileData.email,
                             kinname : this.props.profileData.kinname,
                            kinphonenumber : this.props.profileData.kinphonenumber,
                            kinemail : this.props.profileData.kinemail,
                            kinaddress : this.props.profileData.kinaddress
                          }}
                          onSubmit={(values, actions) => {
                            // same shape as initial values
                            console.log(values, "update");
                            this.props.updateProfile(values);
                            actions.setValues(values);
                          }}
                         validationSchema={this.profileSchema}
                     >

                        {({ errors, touched, isValid, isSubmitting, values }) => (
                                <React.Fragment>
                                    <Form>
                                    <label className={classes.Label}>Fullname </label>
                                    <Field
                                        name="fullname"
                                        as={Input}
                                        placeholder="Full name"
                                    />
                                    {errors.fullname && touched.fullname ? (
                                        <div className={classes.validationError}>
                                        {errors.fullname}
                                        </div>
                                    ) : null}
                                    <label className={classes.Label}>Phone Number</label>
                                    <Field name="phonenumber" as={Input} placeholder="Phone number" />
                                    {errors.phonenumber && touched.phonenumber ? (
                                        <div className={classes.validationError}>{errors.phonenumber}</div>
                                    ) : null}
                                    <label className={classes.Label}>Email</label>
                                    <Field name="email" as={Input} placeholder="Email" />
                                    {errors.email && touched.email ? (
                                        <div className={classes.validationError}>
                                        {errors.email}
                                        </div>
                                    ) : null}
                                     <label className={classes.Label}>Next of kin fullname</label>
                                    <Field name="kinname" as={Input} placeholder="Kin fullname" />
                                    {errors.kinname && touched.kinname ? (
                                        <div className={classes.validationError}>
                                        {errors.kinname}
                                        </div>
                                    ) : null}
                                    <label className={classes.Label}>Next of kin email address</label>
                                    <Field name="kinemail" as={Input} placeholder="Kin email address" />
                                    {errors.kinemail && touched.kinemail ? (
                                        <div className={classes.validationError}>
                                        {errors.kinemail}
                                        </div>
                                    ) : null}
                                    <label className={classes.Label}>Next of kin phone number</label>
                                    <Field name="kinphonenumber" as={Input} placeholder="Kin phone number" />
                                    {errors.kinphonenumber && touched.kinphonenumber ? (
                                        <div className={classes.validationError}>
                                        {errors.kinphonenumber}
                                        </div>
                                    ) : null}
                                    <label className={classes.Label}>Next of kin address</label>
                                    <Field name="kinaddress" as={Input} placeholder="Kin Address" />
                                    {errors.kinaddress && touched.kinaddress ? (
                                        <div className={classes.validationError}>
                                        {errors.kinaddress}
                                        </div>
                                    ) : null}
                                   
                                    
                                    {this.props.updateError && !this.props.updating ? (
                                       <div className="app-error"><p style={{color:'red',margin:'0'}}> {this.props.updateError.msg}</p></div>
                                    ) : null}

                                    {this.props.updateStatus && !this.props.updating ? (
                                        <div className="app-success"><p style={{color:'green',margin:'0'}}> Profile Updated successfully</p></div>
                                       
                                    ) : null}

                                    <button
                                        type="submit"
                                        className={["btn", "mb-5", classes.btnUpdate].join(" ")}
                                        disabled={this.props.updating || !isValid}
                                    >
                                        {this.props.updating ? 'updating your profile...': 'Update'}
                                    </button>

                                    </Form>
                                    
                                    
                                </React.Fragment>
                                )}

                    </Formik>
                    
                    </>
        )

       }
        
        const tabSettings = {...this.state.tabsettings}
        return(
            <React.Fragment>
                <Modal show={this.state.uploadState} modalClosed={this.toggleUpload}> 
                    {uploadForm}
                </Modal>

                <section className={classes.section2}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className={classes.Bookings}>
                                <div className={classes.header}>
                                    <h1>Profile Settings</h1>
                                </div>

                                <div className={classes.tab}>
                                    <Tab 
                                    currentTab={this.state.currentTab} 
                                    settings={tabSettings}
                                    toggleTab={(id) => this.toggleTab(id)}>
                                        <div className={[
                                        "tab-pane",
                                        "fade",
                                        "show",
                                        this.state.currentTab === "personal" ? "active" : "",
                                        ].join(" ")}
                                       
                                        role="tabpanel"
                                        aria-labelledby="personal-tab">
                                            <div className={classes.form}>
                                                
                                                {formik}
                                               
                                            </div>
                                        </div>
{/* 
                                        <div className={[
                                        "tab-pane",
                                        "fade",
                                        "show",
                                        this.state.currentTab === "next-of-kin" ? "active" : "",
                                        ].join(" ")}
                                        
                                        role="tabpanel"
                                        aria-labelledby="next-of-kin-tab">
                                            <div className={classes.form}>
                                                
                                            </div>
                                        </div> */}


                                        <div className={[
                                        "tab-pane",
                                        "fade",
                                        "show",
                                        this.state.currentTab === "password" ? "active" : "",
                                        ].join(" ")}
                                        
                                        role="tabpanel"
                                        aria-labelledby="password-tab">
                                            <div className={classes.form}>
                                               
                                            </div>
                                        </div>
                                    </Tab>
                                </div>
                                
                            </div>      
                        </div>
                        <div className="col-md-4">
                            <SideBar history={this.props.history}/>
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
        error: state.profile.error,
        loading: state.profile.loading,
        profileData: state.profile.profileDetails,
        updating: state.profile.updating,
        updateStatus: state.profile.updateStatus,
        updateError: state.profile.updateError,

        
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        fetchProfileDetails: () => dispatch(actions.fetchProfileDetails()),
        updateProfile: (formData) => dispatch(actions.updateProfile(formData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Profile);