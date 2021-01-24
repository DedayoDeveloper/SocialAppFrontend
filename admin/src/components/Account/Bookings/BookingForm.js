import React from 'react';
import classes from './css/BookingForm.module.css'
import Button from '../../UI/Button/Button';
import Select from 'react-select';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const bookingForm = (props) => {
    const attachedClasses = ['row', classes.innerFormWrapper, 'justify-content-center']

    return(
        <div className={classes.formWrapper}>
            <div className="container">
                <div className={attachedClasses.join(' ')}>
                    <div className={["col-md-3",classes.formSearch,].join(" ")}>
                        {/* <input  className={classes.input}  type="text" placeholder="Travelling From" /> */}
                        <Select
                            placeholder="Departure"
                            value={props.selectedOptionOne}
                            onChange={props.handleChange}
                            options={props.options}
                        />
                    </div>
                    <div className={["col-md-3",classes.formSearch,].join(" ")}>
                        {/* <input className={classes.input}  type="text" placeholder="Travelling To" /> */}
                        <Select
                            placeholder="Destination"
                            value={props.selectedOptionTwo}
                            onChange={props.handleChangeTwo}
                            options={props.options}
                        />
                    </div>
                    <div className={["col-md-3",classes.formSearch,].join(" ")}>
                        {/* <input  className={classes.input} type="date" placeholder="Date" /> */}
                        <DatePicker
                            selected={props.date}
                            onChange={props.handleChangeThree}
                            dateFormat="yyyy-MM-dd"
                            minDate={props.startDate}
                            placeholderText="Date"
                        />
                    </div>
                    <div className={["col-md-2",classes.formSearch,].join(" ")}>
                       <Button clicked={props.clicked}  btnType="tripSearch">Find Trip</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default bookingForm;