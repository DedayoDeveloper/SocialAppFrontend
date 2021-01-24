import React, { Component } from 'react';
import classes from './SideBar.module.css';
import Button from '../UI/Button/Button'
import { currency } from '../../config/Config';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { OverlaySpinner } from '../UI/Spinner/OverlaySpinner';
import { formatCurrency, formatDate } from '../../shared/Method';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import {states} from '../../config/Config'
 
import "react-datepicker/dist/react-datepicker.css";

 export class SideBar extends Component {
     
    constructor(props){
        super(props);
        this.state ={
            from: {},
            to: {},
            date: null,
            startDate: new Date(),
        }
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
        console.log(formData)

        this.props.history.push('/find-trips?departure='+formData.departure+'&destination='+formData.destination+'&date='+formData.date);
      }

    render(){
        console.log(this.props.history)
        let price = this.props.price;
        let disabled = true;
        if(this.props.bookingState){
            price = this.props.price;
            if(this.props.bookingState === 1){
                price = this.props.price
                disabled = false
            }

            if(this.props.bookingState === 2 && this.props.withOthers !== 0){
                price = this.props.price * (this.props.withOthers + 1);
                disabled = false
            }

            // if(this.props.bookingState === 3 && this.props.forOthers !== 0){
            //     price = this.props.price * (this.props.forOthers + 1);
            //     disabled = false
            // }

            if(this.props.bookingState === 3 && this.props.withOthers !== 0){
                price = this.props.price * this.props.withOthers;
                disabled = false
            }
        }
        
        let attachedClasses = classes.sidebarFixed;
        if(this.props.type === "filter" ){
            attachedClasses = classes.sidebarFixed2;
        }

        return(
            <div className={attachedClasses}>
                {this.props.type === "filter" ?
                
                <div className={classes.filter}>
                    <div style={{display:'flex',justifyContent: 'space-between'}}>
                    <h4>Advanced Filter</h4>
                    <i className="fa fa-filter"></i>
                    </div>
                    
                    <div className={classes.formWrapper}>
                        <div className={classes.tripForm}>
                            <label>Min Price {currency}</label>
                            <select value={this.props.minPrice} onChange={this.props.changed} name="minPrice" className={classes.input}  >
                                <option value="" disabled>select</option>
                                <option value="1000">1000</option>
                                <option value="1500">1500</option>
                                <option value="2000">2000</option>
                                <option value="2500">2500</option>
                                <option value="3000">3000</option>
                                <option value="3500">3500</option>
                                <option value="4000">4000</option>
                                <option value="4500">4500</option>
                                <option value="5000">5000</option>
                                <option value="5500">5500</option>
                                <option value="6000">6000</option>
                                <option value="6500">6500</option>
                                <option value="7000">7000</option>
                            </select>
                        </div>
                        <div className={classes.tripForm}>
                            <label>Max Price {currency}</label>
                            <select value={this.props.maxPrice}  onChange={this.props.changed} name="maxPrice" className={classes.input}  >
                                <option value="" disabled>select</option>
                                <option value="1000">1000</option>
                                <option value="1500">1500</option>
                                <option value="2500">2500</option>
                                <option value="3000">3000</option>
                                <option value="3500">3500</option>
                                <option value="4000">4000</option>
                                <option value="4500">4500</option>
                                <option value="5000">5000</option>
                                <option value="5500">5500</option>
                                <option value="6000">6000</option>
                                <option value="6500">6500</option>
                                <option value="7000">7000</option>
                            </select>
                        </div>
                        <div className={classes.tripForm}>
                            <label>Departure Park</label>
                            <select  value={this.props.departurePark} onChange={this.props.changed} name="departurePark" className={classes.input}  >
                                <option value="" disabled>select</option>
                                <option value="jibowu">jibowu</option>
                                <option value="Seriki">Seriki</option>
                                <option value="yaba">yaba</option>
                                <option value="ikpoba-hill">ikpoba-hill</option>
                                <option value="berger">berger</option>
                            </select>
                        </div>
                        <div className={classes.tripForm}>
                            <label>Arrival Park</label>
                            <select value={this.props.arrivalPark}   name="arrivalPark" className={classes.input} onChange={this.props.changed} >
                            <option value="" disabled>select</option>
                                <option value="jibowu">jibowu</option>
                                <option value="Seriki">Seriki</option>
                                <option value="edegbe">Edegbe</option>
                                <option value="ikpoba-hill">ikpoba-hill</option>
                                <option value="oluku">oluku</option>
                            </select>
                        </div>
                        <div className={classes.tripForm}>
                            <label>Time</label>
                            <input value={this.props.tripTime} name="tripTime" className={classes.input} onChange={this.props.changed} type="time" placeholder="Travelling To" />
                        </div>
                        
                        <div style={{display: 'flex',marginTop:'15%'}} className="">
                        <Button  btnType="filterCancel">Canel</Button>
                        <Button clicked={this.props.clicked} btnType="tripSearch2"> Apply filter</Button>
                        </div>
                    </div>
                </div>
                
                : 

                this.props.type === "payment" ?
                <SkeletonTheme color="#cacaca" highlightColor="#afaeae">
                <div className={classes.pay}>
                    <p>Total</p>
                    
                    <div>
                        <h4>{price ? currency + formatCurrency(price) : <Skeleton duration={0.6} width={100}  />}</h4>
                    </div>
                    {this.props.price ? 
                    <>
                    <Button disabled={disabled || this.props.bookingLoading} clicked={() => this.props.pay('cash')} btnType="paybutton2">Pay with cash</Button>
                    <Button disabled={disabled || this.props.bookingLoading} clicked={() => this.props.pay('online')} btnType="paybutton">Pay with card</Button>
                    
                    </>
                    : <Skeleton duration={0.6} height={50} width={300}  />}
                    
                </div>
                </SkeletonTheme>

                :

                <React.Fragment>
                <div className={classes.accountSummary}>
                    <h4>Account summary</h4>
                    <div className={classes.summaryGrid}>
                        <span>Total Trips</span>
                        <span>0</span>
                        <span>Total Bookings</span>
                        <span>0</span>
                        <span>Total Payments</span>
                        <span>0</span>
                    </div>
                </div>

                <div className={classes.bookTrip}>
                    <h4>Find & book trips easily</h4>
                    <div className={classes.formWrapper}>
                        <div className={classes.tripForm}>
                        <Select
                            placeholder="Departure"
                            value={this.state.from}
                            onChange={this.handleChange}
                            options={states}
                        />
                        </div>
                        <div className={classes.tripForm}>
                        <Select
                            placeholder="Destination"
                            value={this.state.to}
                            onChange={this.handleChangeTwo}
                            options={states}
                        />
                        </div>
                        <div className={classes.tripForm}>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChangeThree}
                            dateFormat="yyyy-MM-dd"
                            minDate={this.state.startDate}
                            placeholderText="Date"
                        />
                        </div>
                        <div className="">
                        <Button clicked={this.findTripHandler}  btnType="tripSearch2">Find Trip</Button>
                        </div>
                    </div>
                </div>
                </React.Fragment>
                }
                
                


            </div>
        )
    }
}