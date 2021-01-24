import React, { Component } from 'react';
import classes from './Trips.module.css';
import BookingForm from '../../../components/Account/Bookings/BookingForm'
import BookingList from '../../../components/Account/Bookings/BookingList/index'
import { SideBar } from '../../../components/SideBar/SideBar';
// import { Pagination } from '../../../components/UI/Pagination/Pagination';
import Button from '../../../components/UI/Button/Button'
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {formatDate, paginator} from '../../../shared/Method'
import {Pagination} from '../../../components/UI/Pagination/Pagination';
import queryString from 'query-string'
import {Searchvector, NothingFound, states} from '../../../config/Config'







class FindTrips extends Component{

    constructor(props){
        super(props)
        this.searchRef = React.createRef()
    }

    state = {
        from: '',
        to: '',
        date: null,
        startDate: new Date(),
        paginate:false,
        page:1,
        searchDetails: [],
        minPrice:'',
        maxPrice:'',
        departurePark: '',
        arrivalPark:'',
        tripTime:'',
        filterState:false
      };

      componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        if(values.departure && values.destination && values.date){
            console.log("didupdate", values)
            const newDate = formatDate(values.date)

            const formData =  {
                departure: values.departure,
                destination: values.destination,
                date: newDate
            }

            this.props.findTrip(formData);
        }
      }


      componentWillUnmount(){
          this.props.onUnload();
      }

      handle = ()=>{
        this.setState({ 
                searchDetails: this.props.search
            });
      }

      static getDerivedStateFromProps(nextProps, prevState){
         
     }
     componentDidUpdate(prevProps, prevState){
        // if(prevProps.search!==this.props.search){
        //     //Perform some operation here
        //     console.log('props search',this.state.searchDetails)
        //     const searchDetails = this.props.search.slice();
        //     this.setState(prevState =>
        //         ({ 
        //             searchDetails: [...prevState.searchDetails,searchDetails]
        //         }));

        //     console.log('props search',this.state.searchDetails)
        // }
        // const values = queryString.parse(this.props.location.search)
        // if(values.departure && values.destination && values.date){
        //     console.log("didupdate", values)
        //     const newDate = formatDate(values.date)

        //     const formData =  {
        //         from: values.departure,
        //         to: values.destination,
        //         date: newDate
        //     }

        //     this.props.findTrip(formData);
        // }
     }

      

      handleChange = from => {
        this.setState({ from });
      };

      

      handleChangeTwo = to => {
        this.setState({ to });
      };
      handleChangeThree = date => {
        this.setState({
          date: date
        });
      };
      handleChangePrice = (event) => {
        const searchDetailState = [
            ...this.props.search
        ]
        if(event.target.value === "low"){
            searchDetailState.sort((a, b) => Number(a.price) - Number(b.price));
            this.props.updateSearch(searchDetailState);
        }
        if(event.target.value === "high"){
            searchDetailState.sort((a, b) => Number(b.price) - Number(a.price));
            this.props.updateSearch(searchDetailState);
        }
      }

      filterInputChangeHandler = (event) => {
        const nam = event.target.name;
        const val = event.target.value;
        this.setState({[nam]: val});

        
        
      }

      applyFilterHandler =(event) =>{
        event.preventDefault();
        if(!this.state.minPrice || !this.state.maxPrice || !this.state.arrivalPark || !this.state.departurePark || !this.state.tripTime ){
            alert('All fields are important')
            return
        }
        const filterValue = this.props.search.filter((data, i) =>{
            
            return(
                (data.price >= this.state.minPrice && data.price <= this.state.maxPrice)
             && data.departurepark == this.state.departurePark
             && data.arrivalpark == this.state.arrivalPark
             &&data.time == this.state.tripTime+':00'
             )
        })
        this.searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' , inline: 'nearest'})
   
        this.setState({
            filterState:true
        })
        this.props.updateSearch(filterValue);
      }

      reloadInitial = () =>{
        this.setState({
            filterState:false
        })
        const newDate = formatDate(this.state.date)

        const formData =  {
            departure: this.state.from.value,
            destination: this.state.to.value,
            date: newDate
        }

        this.props.findTrip(formData);
      }

      findTripHandler = (event) => {
        event.preventDefault();
        if(!this.state.from || !this.state.to || !this.state.date ){
            alert('All fields are important')
            return
        }

        const newDate = formatDate(this.state.date)

        const formData =  {
            departure: this.state.from.value,
            destination: this.state.to.value,
            date: newDate
        }

        this.props.findTrip(formData);
      }

      paginateData =(data)=>{

        const paginate = paginator( this.props.search, 2 );
        return paginate(data);
        
      }

      paginateOtherData = (data)=>{
          this.setState({
              paginate:true,
              page: data
          })
          this.searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' , inline: 'nearest'})
      }

      


    render(){

       
        let searchData = (
            <div className={classes.notification}>
                            <h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '19px',fontWeight:'800'}}>Begin Your Search</h4>
                            <img style={{width:'100%'}} src={Searchvector} alt="search" />
                            
                
                
            </div>
        
        );

        const values = queryString.parse(this.props.location.search)

        if(this.props.search && this.props.search.length === 0 && this.state.filterState){
             searchData = (
                 <>
                <div className={classes.notification}>
                    <div style={{height: '219px',width: '251px',margin: '0 auto', textAlign:'center'}}>
                    <img style={{width:'100%'}} src={NothingFound} alt="search" />
                    </div>
                    <h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '19px',fontWeight:'800'}}>{this.props.error}</h4>
                    <button style={{
                        textAlign:'center',color: '#fff',fontSize: '17px',fontWeight:'600', 
                        padding: '6px 14px',
                        background: '#2391d5',
                        border: 'none',
                        borderRadius: '6px'
                    }} 
                        onClick={this.reloadInitial}>Reload initial search</button>
                </div>
                
                
            
            </>
            );
        }
       
        
        
        
        
        
        
  

        if(this.props.search && this.props.search.length !== 0){
            let newData = this.paginateData(this.state.page);
            let pageLength = Math.ceil(this.props.search.length / 2);
            let pre_page = this.state.page - 1 ? this.state.page - 1 : null;
            let next_page = (pageLength > this.state.page) ? this.state.page + 1 : null;

            searchData = 
                
                (
                <React.Fragment>
                <div className={classes.header}>
                <h1>{this.state.filterState ? 'Filtered Search: ':''} {this.state.from.value || values.departure} - {this.state.to.value || values.destination}: {this.props.search.length} trips found</h1>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <p style={{margin:'0'}}>Sort by price</p>
                        <select onChange={this.handleChangePrice}>
                            <option disabled selected="selected"></option>
                            <option value="low">Lowest</option>
                            <option value="high">Highest</option>
                        </select> 
                    </div>
                </div>
                {newData.map(data =>
                        <BookingList 
                            key={data.id}
                            departure={data.departure}
                            departurepark={data.departurepark}
                            destination={data.destination}
                            arrivalpark={data.arrivalpark}
                            date={data.date}
                            id={data.id}
                            price={data.price}
                            time={data.time}
                            tcomp={data.transportcompany}
                            seats={data.seats}
                        />
                   
                )}
                <Pagination 
                length={pageLength}
                prev={pre_page}
                next={next_page}
                click={this.paginateOtherData}
                currentPage={this.state.page}/>
                </React.Fragment>)
               
                
            
        }

        if(this.props.search && this.props.search === null && this.props.search.length === 0){
            searchData = (<div className={classes.notification}>
                <div>
                <img style={{width:'100%'}} src={NothingFound} alt="search" />
                </div>
                <h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '19px',fontWeight:'800'}}>No trips available for this search.</h4>   
            </div>)
        }

        if(this.props.loading){
            var myArray = ["one", "two", "three"];
            searchData = ( myArray.map((data, i) => <div className={classes.notification}><BookingList key={i} /></div> ))
        }

        if(this.props.error){
            
            searchData = (
                <div className={classes.notification}>
                    <div style={{height: '219px',width: '251px',margin: '0 auto'}}>
                    <img style={{width:'100%'}} src={NothingFound} alt="search" />
                    </div>
                    <h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '19px',fontWeight:'800'}}>{this.props.error}</h4>   
                </div>
                )
        }




        return(
            <React.Fragment>
                <div className={classes.Banner}>
                <h1 ref={this.searchRef} >Find and book trips</h1>
                
                    <BookingForm
                    options={states} 
                    handleChange={this.handleChange}
                    selectedOptionOne={this.state.from}
                    handleChangeTwo={this.handleChangeTwo}
                    selectedOptionTwo={this.state.to}
                    handleChangeThree={this.handleChangeThree}
                    startDate={this.state.startDate} 
                    date={this.state.date}
                    clicked={this.findTripHandler}/>
            </div>
            
                <section className={classes.section}>
                <div className="container">
                    <div className="row row flex-column-reverse flex-md-row">
                        <div className="col-md-4">
                            <SideBar
                             type="filter"
                             changed={(event) => this.filterInputChangeHandler(event)}
                             clicked={(event) => this.applyFilterHandler(event)}
                             minPrice={this.state.minPrice}
                             maxPrice={this.state.maxPrice}
                             departurePark={this.state.departurePark}
                             arrivalPark={this.state.arrivalPark}
                             tripTime={this.state.tripTime}
                              />
                        </div>
                        <div  className="col-md-8 ">
                            <div className={classes.Bookings}>
                                
                                {searchData}
                               
                                
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
        error: state.trip.error,
        loading: state.trip.loading,
        userData: state.auth.userData,
        search: state.trip.searchData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        findTrip: (formData) => dispatch(actions.findTrip(formData)),
        updateSearch: (data) => dispatch(actions.updateSearch(data)),
        onUnload: () => dispatch(actions.tripOnUnload())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (FindTrips);