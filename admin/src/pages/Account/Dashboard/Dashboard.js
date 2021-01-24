import React, {Component} from 'react';
import classes from './Dashboard.module.css';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {WelcomeBg, ApiEndpoints} from '../../../config/Config';
import { EscortProfileCard } from '../../../components/Account/EscortCards/EscortCard';
import { Pagination } from '../../../components/UI/Pagination/Pagination';
import { formatCurrency, paginator } from '../../../shared/Method';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import { SERVER_REQUEST } from '../../../shared/Backend';

const bannerStyle = {

    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.28)), url(${WelcomeBg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    padding: '60px 0'

}

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.searchRef = React.createRef()
    }

    state={
        paginate:false,
        page:1,
        escortCategories: []
    }



    componentDidMount(){
    

        this.props.fetchEscorts();
        this.fetchCategories()        
    }

  

    componentDidUpdate(prevProps, prevState) {
        // if(this.props.userData.registrationPayment === false){
        //     console.log("TRUE")
        //     this.props.history.push("/my-trips");
        // }else{
        //     console.log("FALSE")
        // }
        
    }

    paginateData =(data)=>{

        const paginate = paginator( this.props.escortDetails, 10 );
        return paginate(data);
        
      }

      paginateOtherData = (data)=>{
          this.setState({
              paginate:true,
              page: data
          })
          this.searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' , inline: 'nearest'})
      }


    componentWillUnmount(){
        
        //this.props.onUnload();

    }

    deleteHandler = (id) => {

        if (window.confirm("Are you sure you want to delete this escort?")) {
            this.props.deleteEscorts(id);
          }
    }

    fetchCategories = () => {
        SERVER_REQUEST(ApiEndpoints.FETCH_CATEGORIES, 'get').then((data) => {
          
            
            if(data.status === 200){
                this.setState({
                    escortCategories: data.data
                })
            }

            if(data.status !== 200){
          

                toast.error("An Error occured while fetching Categories! Try again", {
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

        console.log(this.state.escortCategories)

        let escortData = null

    if(this.props.loading){
        escortData = <>
            <Skeleton width="100%" height={20}/>
            <Skeleton width="100%" height={20}/>
            <Skeleton width="100%" height={20}/>
            <Skeleton width="100%" height={20}/>
            <Skeleton width="100%" height={20}/>
            <Skeleton width="100%" height={20}/>
        </>
    }

      if(this.props.escortDetails && this.props.escortDetails.length !== 0){
        let newData = this.paginateData(this.state.page);
        let pageLength = Math.ceil(this.props.escortDetails.length /10);
        let pre_page = this.state.page - 1 ? this.state.page - 1 : null;
        let next_page = (pageLength > this.state.page) ? this.state.page + 1 : null;

            escortData = (
                <>
                <p>Page {this.state.page} of {pageLength}</p>
                {newData.map((item) => <div  key={item.id}  className={classes.escortItem}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-2 text-center">
                                <div className={classes.profileimgWrapper}>
                                    <img src={item.imagePath} alt="profile-img" />
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className={classes.escortList}>
                                    <h4>{item.name}</h4>
                                    <p><b>Email:</b> {item.email}</p>
                                    <p><b>Phone Number:</b> {item.phoneNumber}</p>
                                    <p><b>Description:</b> {item.description}</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className={classes.escortCatSection}>
                                    <p><span>{item.category}</span></p>
                                    <button onClick={() => this.deleteHandler(item.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                   </div>)}

                   <Pagination 
                    length={pageLength}
                    prev={pre_page}
                    next={next_page}
                    click={this.paginateOtherData}
                    currentPage={this.state.page}/>
                   </>
            )
      }

      let categories = null

      if(this.state.escortCategories && this.state.escortCategories.length !== 0){
        categories = (
            this.state.escortCategories.map((item) => (
                <div className={classes.categoryWrapper}>
                <h5>{item.categoryName}</h5>
                <p>{formatCurrency(item.price)}</p>
                </div>
            ))
        )
      }

        

    
        return(
            <React.Fragment>
            
            <section className="container mt-5">

               <div ref={this.searchRef} className={classes.header}>
                   <p>All Categories - ({this.state.escortCategories.length})</p>
                  
               </div>
               <div className="container ">
                   {categories}
               </div>
            </section>

            <section className="container mt-5">

               <div ref={this.searchRef} className={classes.header}>
                   <p>All Escorts - ({this.props.escortDetails.length})</p>
                   <NavLink to="add-escort"><i className="fa fa-plus"></i> Add Escort</NavLink>
               </div>
               <div className="container mt-5">
                    {escortData}
                 
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
        escortDetails: state.escort.escortDetails.reverse(),
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEscorts : () => dispatch(actions.fetchEscortDetails()),
        onUnload: () => dispatch(actions.escortOnUnload()),
        deleteEscorts: (id) => dispatch(actions.deleteEscort(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);