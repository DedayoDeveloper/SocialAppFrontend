import * as actionTypes from './actionType';
import {SERVER_REQUEST} from '../../shared/Backend'
import {ApiEndpoints} from '../../config/Config'
import {SAVE_TOKEN_USER_DETAILS, UPDATE_USER_DATA} from '../../shared/Storage'
import {  toast } from 'react-toastify';

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    }
}

export const updateUserData = (user) => {
    return {
        type: actionTypes.AUTH_UPDATE,
        user: user
    }
}

export const authSetRegSuccess = (id) => {
    return {
        type: actionTypes.AUTH_REG_SUCCESS,
        userRegId: id

    }
}

export const authRemoveOTP = () => {
    return {
        type: actionTypes.AUTH_REMOVE_OTP,
        
    }
}

export const authFailed = () => {
    return{
        type: actionTypes.AUTH_FAILED
    }
}

// export const authMessage = (message) => {
//     return{
//         type: actionTypes.AUTH_MESSAGE,
//         message,
//     }
// }


export const authStart = () =>{
    return {
        type: actionTypes.AUTH_START
    }
}

export const authInit = () => {
    return {
      type: actionTypes.AUTH_INIT,
    };
};

export const authUnload = () =>{
    return {
        type: actionTypes.AUTH_UNLOAD
    }
}


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');


    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = timeout =>{
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, timeout * 1000);
    }
}


export const auth = (authData) => {
    return (dispatch) => {
        dispatch(authStart());
        SERVER_REQUEST(ApiEndpoints.USER_LOGIN, 'post', authData).then((data) => {
           
            if(data.status === 200){
                if(data.data.jwt){
                    localStorage.removeItem('confirmOTP');
                    localStorage.removeItem('userDetailsOTP');
                    SAVE_TOKEN_USER_DETAILS(data.data.jwt, data.data.user);
                    dispatch(authSuccess(data.data.jwt, data.data.user));
                }
            }

            if(data.status === 500 || data.status !== 200){
                dispatch(authFailed());
                toast.error(data.message, {
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
            dispatch(authFailed(error));
        })
    };
};

export const signUp = (data) => {
    return dispatch =>{
        dispatch(authStart());
        const authData = data
        
        SERVER_REQUEST(ApiEndpoints.USER_REGISTER, 'post', authData).then((data) => {
            
        
            if(data.status === 200){
               
                dispatch(authSetRegSuccess(data.data.id));
            }

            if(data.status === 500 || data.status !== 200){
                console.log("ERRROR--->DATA",data)
               
                dispatch(authFailed());
                toast.error(data.message, {
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
            
            
            dispatch(authFailed());
          
        })
    }
}


export const updateUserDataAfterPayment = (data) => {
    return dispatch => {
        UPDATE_USER_DATA(data)
        dispatch(updateUserData(data))
    }
}




export const onUnload = () => {
    return dispatch => {
        dispatch(authUnload())
    }
}



export const checkAuthState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        const userDetails = JSON.parse(localStorage.getItem('userData'));
        dispatch(authInit());
        
        
        if(!token){
            dispatch(logout());
        }else{
            dispatch(authSuccess(token, userDetails));
        }
            
        
        //else{
        //     const expirationDate =  new Date(localStorage.getItem('expirationDate'));

        //     if(expirationDate > new Date()){
        //         const userId = localStorage.getItem('userId');
        //         dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000));
        //         dispatch(authSuccess(token, userId));
        //     }else{
        //         dispatch(logout())
        //     }
        // }
    }
}
