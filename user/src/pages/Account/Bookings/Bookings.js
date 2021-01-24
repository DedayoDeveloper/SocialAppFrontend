import React, { Component } from 'react';
import classes from './Bookings.module.css';
import BookingList from '../../../components/Account/Bookings/BookingList';
import {SideBar} from '../../../components/SideBar/SideBar'

class Bookings extends Component{


    render(){
        return(
            <React.Fragment>
                
                <section className={classes.section}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ">
                            <div className={classes.Bookings}>
                                <div className={classes.header}>
                                    <h1>My Bookings</h1>
                                    <a href="sdme"></a>
                                </div>
                                <BookingList />
                                <BookingList />
                                <BookingList />
                                <BookingList />
                                <BookingList />
                            </div>      
                        </div>
                        <div className="col-md-4">
                            <SideBar />
                        </div>
                    </div>
                    
                </div>
            </section>
            </React.Fragment>
        )
    }
}
export default Bookings;