import * as actionTypes from './actionType';
import {SERVER_REQUEST} from '../../shared/Backend'
import {ApiEndpoints} from '../../config/Config'
import {GET_TOKEN, GET_USER} from '../../shared/Storage'


export const tripMessage = (message) => {
    return{
        type: actionTypes.TRIP_MESSAGE,
        message,
    }
}

export const searchStart = () => {
    return{
        type: actionTypes.TRIP_START,
    }
}

export const bookingStart = () => {
    return{
        type: actionTypes.BOOK_TRIP_START,
    }
}

export const searchSuccess = (payload) => {
    return{
        type: actionTypes.TRIP_SUCCESS,
        payload: payload
    }
}

export const bookingSuccess = () => {
    return{
        type: actionTypes.BOOK_TRIP_SUCCESS,
        
    }
}

export const bookingFailed = () => {
    return{
        type: actionTypes.BOOK_TRIP_FAILED,
        
    }
}

export const getDetailSuccess = (payload) => {
    return{
        type: actionTypes.TRIP_GET_DETAILS,
        payload: payload
    }
}



export const searchFailed = (error) => {
    return{
        type: actionTypes.TRIP_FAILED,
        error:error
    }
}

export const tripUnload = () => {
    return{
        type: actionTypes.TRIP_UNLOAD,
        
    }
}


export const userTripStart = () => {
    return{
        type: actionTypes.USER_TRIP_START,
        
    }
}

export const userTripSuccess = (payload) => {
    return{
        type: actionTypes.USER_TRIP_SUCCESS,
        payload: payload
    }
}

export const userTripFailed = () => {
    return{
        type: actionTypes.USER_TRIP_FAILED,
        
    }
}








export const tripOnUnload = () => {
    return dispatch => {
        dispatch(tripUnload())
    }
}

export const bookTrip = (formData, id) => {

        return (dispatch) => {
            dispatch(bookingStart())
            const userData = {
                fullname: GET_USER().fullname,
                phonenumber: GET_USER().phonenumber
            }
          

            const formVal = {
                ...formData,
                ...userData
            }
            
            SERVER_REQUEST(ApiEndpoints.BOOK_TRIP(id), 'post', formVal).then((data) => {
                console.log(data);
                if(data.error){
                    // const error = {
                    //     type: "trip",
                    //     msg: data.message,
                    //     error: true
                    //   };
                    // dispatch(tripMessage(error));
                    dispatch(bookingFailed());
                }
                if(data.status === "OK"){
                    
                       
                    
                    dispatch(bookingSuccess());
                    
                }
    
                if(data.status === '99'){
                    // const error = {
                    //     type: "trip",
                    //     msg: data.message,
                    //     error: true
                    //   };
                    // dispatch(tripMessage(error));
                    dispatch(bookingFailed());
                }
            }).catch((error) => {
                console.log(error);
                //dispatch(searchFailed(error));
            })
        }
    
}


export const getUserTrip = () => {

    return (dispatch) => {
        dispatch(userTripStart())
        const userData = {
           
            phonenumber: GET_USER().phonenumber
        }
        
        SERVER_REQUEST(ApiEndpoints.FETCH_USER_TRIP, 'post', userData).then((data) => {
            console.log(data);
            if(data.error){
                // const error = {
                //     type: "trip",
                //     msg: data.message,
                //     error: true
                //   };
                // dispatch(tripMessage(error));
                dispatch(userTripFailed());
            }
            if(data.status === "OK" && data.error === null){
                
                   
                
                dispatch(userTripSuccess(data.response));
                
            }

            if(data.status === '99'){
                // const error = {
                //     type: "trip",
                //     msg: data.message,
                //     error: true
                //   };
                // dispatch(tripMessage(error));
                dispatch(userTripFailed());
            }
        }).catch((error) => {
            console.log(error);
            //dispatch(searchFailed(error));
        })
    }

}



export const updateSearch = (data) => {
    return(dispatch)=>{
        dispatch(searchStart())
        setTimeout(() => {
            dispatch({
                type: actionTypes.TRIP_UPDATE_SEARCH,
                payload:data
            })
        }, 200);
    }
}
export const findTrip = (formData) => {
    return (dispatch) => {
        dispatch(searchStart())
        SERVER_REQUEST(ApiEndpoints.FIND_TRIP, 'post', formData).then((data) => {
            console.log(data);
            if(data.error){
                // const error = {
                //     type: "trip",
                //     msg: data.message,
                //     error: true
                //   };
                // dispatch(tripMessage(error));
                dispatch(searchFailed(data.message));
            }
            if(data.error == null || !data.error){
                
                   
                dispatch(searchSuccess(data.response));
                
            }

            if(data.status === '99'){
                // const error = {
                //     type: "trip",
                //     msg: data.message,
                //     error: true
                //   };
                // dispatch(tripMessage(error));
                dispatch(searchFailed(data.message));
            }
        }).catch((error) => {
            console.log(error);
            //dispatch(searchFailed(error));
        })
    }
}
export const getTripDetails = (id) => {
    return (dispatch) => {
        dispatch(searchStart())
        SERVER_REQUEST(ApiEndpoints.GET_TRIP_DETAILS, 'post', id).then((data) => {
            console.log(data);
            if(data.error){
                // const error = {
                //     type: "trip",
                //     msg: data.message,
                //     error: true
                //   };
                // dispatch(tripMessage(error));
                dispatch(searchFailed(data.message));
            }
            if(data.error == null || !data.error){
                
                   
                dispatch(getDetailSuccess(data.response));
                
            }

            if(data.status === '99'){
                // const error = {
                //     type: "trip",
                //     msg: data.message,
                //     error: true
                //   };
                // dispatch(tripMessage(error));
                dispatch(searchFailed(data.message));
            }
        }).catch((error) => {
            console.log(error);
            //dispatch(searchFailed(error));
        })
    }
}