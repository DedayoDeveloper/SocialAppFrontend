import * as actionTypes from '../actions/actionType';
 
const initialState = {
    initialising:false,
    error:null,
    loading:false,
    initiateBooking: false,
    initiateUserTrip: false,
    searchData:[],
    message: null,
    tripDetails: [],
    bookingStatus: false,
    bookingError: false,
    userTripData:[],
    userTripError:false
    
    


};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.TRIP_START:
            return{
                ...state,
                error:null,
                message: null,
                loading:true,
                // tripDetails:[],
                // searchData:[],
            };
        case actionTypes.BOOK_TRIP_START:
            return{
                ...state,
                initiateBooking:true,
                bookingStatus:false,
                bookingError:false
            };
        case actionTypes.USER_TRIP_START:
            return{
                ...state,
                initiateUserTrip:true,
                userTripData:[],
                userTripError:false
            };
        case actionTypes.USER_TRIP_SUCCESS:
            return{
                ...state,
                initiateUserTrip:false,
                userTripData:action.payload,
                userTripError:false
            };
        case actionTypes.USER_TRIP_FAILED:
            return{
                ...state,
                initiateUserTrip:false,
                userTripData: [],
                userTripError: true
            };
        case actionTypes.BOOK_TRIP_SUCCESS:
            return{
                ...state,
                initiateBooking:false,
                bookingStatus: true,
                bookingError:false
            };
        case actionTypes.BOOK_TRIP_FAILED:
            return{
                ...state,
                initiateBooking:false,
                bookingStatus: false,
                bookingError: true
            };
        case actionTypes.TRIP_SUCCESS:
            return{
                ...state,
                error:null,
                loading:false,
                searchData: action.payload,
            };
        case actionTypes.TRIP_GET_DETAILS:
            return{
                ...state,
                error:null,
                loading:false,
                tripDetails: action.payload,
            };
        case actionTypes.TRIP_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false,
                searchData: [],
                tripDetails: []
            }
        case actionTypes.TRIP_MESSAGE:
            return{
                ...state,
                message: action.message,
                loading: false,
                
            }
        case actionTypes.TRIP_UPDATE_SEARCH:
                return{
                    ...state,
                    loading:false,
                    searchData: action.payload,
                    
                }
        case actionTypes.TRIP_UNLOAD:
            return{
                ...state,
                message: null,
                error: null,
                searchData:[],
                tripDetails: [],
                initiateBooking: false,
                bookingStatus: false,
                bookingError: false

            }
        
        default:
            return state
    }


}
export default reducer;