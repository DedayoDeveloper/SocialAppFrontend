import React, {Component} from 'react';
import classes from './AddEscort.module.css';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {WelcomeBg, ApiEndpoints} from '../../../config/Config';
import { EscortProfileCard } from '../../../components/Account/EscortCards/EscortCard';
import { Pagination } from '../../../components/UI/Pagination/Pagination';
import { checkValidity, paginator } from '../../../shared/Method';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { SERVER_REQUEST } from '../../../shared/Backend';
import { toast } from 'react-toastify';

const bannerStyle = {

    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${WelcomeBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    padding: '60px 0'

}

class AddEscort extends Component {
    constructor(props){
        super(props)
        this.searchRef = React.createRef()
    }

    state = {
        
        addform:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e.g john'
                },
                label: 'Escort Name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            
            phoneNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'e.g 08067278197'
                },
                label: 'Phone Number',
                value: '',
                validation: {
                    required: true,
                    isNumber: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e.g myemail@gmail.com'
                },
                label: 'Email Address',
                value: '',
                validation: {
                    required: true,
                    email:true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            location: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    options: [
                        {value:'', displayValue:'Select Options', defaultValue:true, disabled:''},
                        {value:'lagos', displayValue:'Lagos'},
                        {value:'abuja', displayValue:'Abuja'}
                    ]
                    
                },
                label: 'Select location',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            category: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                    options: [
                        {value:'', displayValue:'Select Options', defaultValue:true, disabled:''},
                        {value:'Relationship', displayValue:'Relationship'},
                        {value:'FriendWithBenefit', displayValue:'Friends with Benefits'},
                        {value:'SexHookUp', displayValue:'Sex Hookup'},
                        {value:'SugarMummy', displayValue:'Sugar Mummy'},
                        {value:'SugarDaddy', displayValue:'Sugar Daddy'},
                        {value:'Strippers', displayValue:'Strippers'},
                        {value:'PartyStarters', displayValue:'Party Starters'}
                    ]
                    
                },
                label: 'Category.',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Write a description'
                },
                label: 'Description',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMsg:null
                
            },

            // image: {
            //     elementType: 'input',
            //     elementConfig: {
            //         type: 'file'
            //     },
            //     label: 'Select Image',
            //     value: null,
            //     validation: {
            //         isFile: true
            //     },
            //     valid: false,
            //     touched: false,
            //     errorMsg:null
                
            // },
            

        },

        addformIsValid: false,
        errorMsg: {},
        toggleForm: 0,
        authSuccess:true,
        selectedFile: null,
        imagePreviewUrl: null,
        loading: false
    }



    componentDidMount(){
        this.fetchStates();
    }

  

    componentDidUpdate(prevProps, prevState) {
        // if(this.props.userData.registrationPayment === false){
        //     console.log("TRUE")
        //     this.props.history.push("/my-trips");
        // }else{
        //     console.log("FALSE")
        // }
        
    }

    fetchStates = () => {
        SERVER_REQUEST(ApiEndpoints.FETCH_STATES, 'get').then((data) => {
            
            if(data.status === 200){
                

               

                let stateOptions = data.data.map((item, index) => {
                    return {
                        value: item,
                        displayValue: item
                    }
                })
                let stateValues = JSON.parse(JSON.stringify(this.state.addform))
                stateValues["location"].elementConfig.options = [
                    ...stateOptions
                ]

                    
            

                console.log(stateValues);
                this.setState({addform: stateValues})
                
            }

            if(data.status !== 200){
                this.setState({loading: false})

                toast.error("An Error occured while loading states! Try again", {
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
            this.setState({loading: false})
            toast.error("Unable to fetch states! Try again", {
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

    fileChangeHandler=event=>{

        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        if(file){
            if (file.size > 6291456  ){
                alert("Image file should be less than 5mb");
            }else{
                reader.onloadend = () => {
                    this.setState({
                        selectedFile: file,
                        imagePreviewUrl: reader.result
                    });
                    }
            }
            reader.readAsDataURL(file);
        }
        


      }


    inputChangedHandler = (event, inputIdentifier, type)=> {

        let updatedLoginForm = {}
       

        updatedLoginForm = {
            ...this.state.addform
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

        this.setState({addform: updatedLoginForm, addformIsValid: formIsValid});

        
        
    }
    

    


    componentWillUnmount(){
        
        //this.props.onUnload();

    }

    deleteHandler = (id) => {

        if (window.confirm("Are you sure you want to delete this escort?")) {
            this.props.deleteEscorts(id);
          }
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        if(!this.state.addformIsValid){
            alert('All form fields are important!')
            this.setState({loading: false})
            return
        }

        if(this.state.selectedFile === null){
            alert('Image cannot be null')
            this.setState({loading: false})
            return
        }

        const myformData = {};
        for( let key in this.state.addform){
            myformData[key]=this.state.addform[key].value;
        }

        console.log("form", myformData)

        const formData = new FormData();
        formData.append("name", myformData.name);
        formData.append("location", myformData.location);
        formData.append("phoneNumber", myformData.phoneNumber);
        formData.append("email", myformData.email);
        formData.append("category", myformData.category);
        formData.append("description", myformData.description);
        formData.append("image", this.state.selectedFile);

        SERVER_REQUEST(ApiEndpoints.CREATE_ESCORTS, 'post', formData).then((data) => {
            console.log(data);
            
            if(data.status === 200){
                this.setState({loading: false})
                toast.success("Escort Added Successfully. Redirecting...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });


                    setTimeout(() => {
                        this.props.history.push("/dashboard")
                    }, 2000)
                   
               
            }

            if(data.status !== 200){
                this.setState({loading: false})

                toast.error("An Error occured while adding Escorts! Try again", {
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
            this.setState({loading: false})
            toast.error("Unable to process request! Try again", {
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

    
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
        $imagePreview = (<div className={classes.imagePreviewDiv}><img src={imagePreviewUrl} /></div>);
        } else {
        $imagePreview = (<div className="mt-2 previewText mb-4">Please select an Image for Preview</div>);
        }

        let formElementsArray = [];
        for(let key in this.state.addform){
            formElementsArray.push({
                id: key,
                config: this.state.addform[key]
            })
        }

        let formOne = (
            <React.Fragment>
                <form className={classes.AddForm} onSubmit={this.submitHandler}>
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

                    <label>Select Escort image</label>
                    <input
                    type="file"
                    onChange={(e) => this.fileChangeHandler(e)}
                    />
                    {$imagePreview}
        
            <Button loading={this.state.loading} btnType="btnFull" disabled={!this.state.addformIsValid || this.state.selectedFile===null}>Submit</Button>
            </form>
            </React.Fragment>
            );

      

        

    
        return(
            <React.Fragment>
            
            <section className="container mt-5">

               
               <div className="mt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mb-5">

                            <div ref={this.searchRef} className={classes.header}>
                            <NavLink className="mt-5" to="add-escorts"><i className="fa fa-arrow-left"></i> Go back</NavLink>

                                <p className="mt-3">Add Escort </p>
                                
                            </div>
                            {formOne}
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
        loading: state.escort.loading,
        userData: state.auth.userData,
        tripData: state.trip.userTripData,
        tripLoading: state.trip.initiateUserTrip,
        escortDetails: state.escort.escortDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEscorts : () => dispatch(actions.fetchEscortDetails()),
        onUnload: () => dispatch(actions.escortOnUnload()),
        deleteEscorts: (id) => dispatch(actions.deleteEscort(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (AddEscort);