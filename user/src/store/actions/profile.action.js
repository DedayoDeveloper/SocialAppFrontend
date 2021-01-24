import * as actionTypes from './actionType';
import {SERVER_REQUEST} from '../../shared/Backend'
import {ApiEndpoints} from '../../config/Config'
import {GET_TOKEN, GET_USER} from '../../shared/Storage'


export const profileStart = () => {
    return{
        type: actionTypes.PROFILE_START,
    }
}

export const profileSuccess = (payload) => {
    return{
        type: actionTypes.PROFILE_SUCCESS,
        payload: payload
    }
}



export const profileFailed = (error) => {
    return{
        type: actionTypes.PROFILE_FAIL,
        error
        
    }
}

export const updateProfileStart = () => {
    return{
        type: actionTypes.UPDATE_PROFILE_START,
    }
}

export const updateProfileSuccess = (payload) => {
    return{
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
    }
}



export const updateProfileFailed = (error) => {
    return{
        type: actionTypes.UPDATE_PROFILE_FAIL,
        error
    }
}



// export const tripUnload = () => {
//     return{
//         type: actionTypes.TRIP_UNLOAD,
        
//     }
// }

// export const tripOnUnload = () => {
//     return dispatch => {
//         dispatch(tripUnload())
//     }
// }

export const fetchProfileDetails = () => {

        return (dispatch) => {
            dispatch(profileStart())
            const userData = {
                phonenumber: GET_USER().phonenumber
            }
            
            SERVER_REQUEST(ApiEndpoints.FETCH_USER_PROFILE, 'post', userData).then((data) => {
                console.log(data);
                if(data.error){
                    const error = {
                        
                        msg: data.message,
                        error: true
                      };
                    // dispatch(tripMessage(error));
                    dispatch(profileFailed(error));
                }
                if(data.status === "OK"){
                    
                       
                    
                    dispatch(profileSuccess(data.response));
                    
                }
    
                if(data.status === '99'){
                    const error = {
                        
                        msg: data.message,
                        error: true
                      };
                    // dispatch(tripMessage(error));
                    dispatch(profileFailed(error));
                }
            }).catch((error) => {
                console.log(error);
                //dispatch(searchFailed(error));
            })
        }
    
}



export const updateProfile = (formData) => {

    return (dispatch) => {
        dispatch(updateProfileStart())
    
        
        SERVER_REQUEST(ApiEndpoints.UPDATE_PROFILE, 'put', formData).then((data) => {
            console.log(data);
            if(data.error){
                const error = {
                    
                    msg: data.message,
                    error: true
                  };
                // dispatch(tripMessage(error));
                dispatch(updateProfileFailed(error));
            }
            if(data.status === "OK"){
                
                   
                
                dispatch(updateProfileSuccess());
                
            }

            if(data.status === '99'){
                const error = {
                    
                    msg: data.message,
                    error: true
                  };
                // dispatch(tripMessage(error));
                dispatch(updateProfileFailed(error));
            }
        }).catch((error) => {
            console.log(error);
            //dispatch(searchFailed(error));
        })
    }

}
