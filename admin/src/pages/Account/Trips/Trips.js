import React, { Component } from 'react';
import classes from './Trips.module.css';
import { Tab } from '../../../components/UI/Tab/Tab';
import { SideBar } from '../../../components/SideBar/SideBar';
import * as actions from '../../../store/actions';
import TripList from '../../../components/Account/Trips/TripList';
import { connect } from 'react-redux';
import { NothingFound } from '../../../config/Config';



class Trips extends Component{

    state ={
        tabsettings :{
            tab1: {
                id:'upcoming',
                value: 'Upcoming'
            },
            tab2: {
                id:'past',
                value: 'Past'
            }
        },
        currentTab: 'upcoming'
    }

    toggleTab =  (tab) => {
        console.log('toggled '+tab);
        this.setState({ currentTab: tab });
    };

    componentDidMount(){
        this.props.getUserTrips()
    }


    render(){
        const tabSettings = {...this.state.tabsettings}

        let userTrip = null;
        

        const past = this.props.tripData.reverse().filter((data, i) =>{
            
            return(
                 new Date(data.departuredate) < new Date()
             )
        })
        const upcoming = this.props.tripData.reverse().filter((data, i) =>{
            
                    return(
                         new Date(data.departuredate) >= new Date()
                     )
                })

        if(this.props.loading){
            userTrip = (
                <TripList/>
            )
        }

        if(this.props.tripData && this.props.tripData.length !== 0){
            if(this.state.currentTab === 'upcoming'){
                
                userTrip = (
                    <>
                    {upcoming.length !== 0 ? 
                    upcoming.map((element,i) => (
                        <TripList 
                        key={i}
                        {...element} />
                    )):
                    <div style={{margin: '11px 0',
                background: '#fff',
                padding: '30px 0px',
                boxShadow: '0px 10px 20px #00000010'}}>
                    <div style={{height: '219px',width: '251px',margin: '0 auto'}}>
                    <img style={{width:'100%'}} src={NothingFound} alt="search" />
                    </div>
                    <h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '19px',fontWeight:'800'}}>You don't have any upcoming trip</h4>   
                </div>}
                    
                    </>
                )
            }
            if(this.state.currentTab === 'past'){
                
                userTrip = (
                    <>
                    {past.length !== 0 ? 
                    past.map((element,i) => (
                        
                        <TripList 
                        key={i}
                        {...element}/>
                        
                    )):
                    <div style={{margin: '11px 0',
                background: '#fff',
                padding: '30px 0px',
                boxShadow: '0px 10px 20px #00000010'}}>
                    <div style={{height: '219px',width: '251px',margin: '0 auto'}}>
                    <img style={{width:'100%'}} src={NothingFound} alt="search" />
                    </div>
                    <h4 style={{textAlign:'center',color: '#5a5a5a',fontSize: '19px',fontWeight:'800'}}>No past trips found</h4>   
                </div>}
                    
                    </>
                )
            }
        }

       



        console.log(`Upcoming --->`, upcoming)
        console.log(`Past --->`, past)


        return(
            <React.Fragment>
                <section className={classes.section2}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className={classes.Bookings}>
                                <div className={classes.header2}>
                                    <h1>All Trips</h1>
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
                                        this.state.currentTab === "upcoming" ? "active" : "",
                                        ].join(" ")}
                                        id=""
                                        role="tabpanel"
                                        aria-labelledby="upcoming-tab">
                                            <div className={classes.tripSingle}>
                                                {userTrip}
                                                
                                            </div>
                                        </div>

                                        <div className={[
                                        "tab-pane",
                                        "fade",
                                        "show",
                                        this.state.currentTab === "past" ? "active" : "",
                                        ].join(" ")}
                                        id=""
                                        role="tabpanel"
                                        aria-labelledby="past-tab">
                                            {userTrip}
                                        </div>
                                    </Tab>
                                </div>
                                
                            </div>      
                        </div>
                        <div className="col-md-4">
                            <SideBar
                            history={this.props.history}/>
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
        error: state.trip.userTripError,
        loading: state.trip.initiateUserTrip,
        tripData: state.trip.userTripData
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserTrips: () => dispatch(actions.getUserTrip())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Trips);