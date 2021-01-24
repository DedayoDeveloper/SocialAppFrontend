import axios from 'axios';
import { BASE_URL } from '../config/Config';
import { GET_TOKEN } from './Storage';
import { LOGGER } from './Method';
import { store } from '../index';
import * as actions from '../store/actions';


const GET_HEADER = () => {
    const token = GET_TOKEN();

    if (token) {
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    };

    return { 'Content-Type': 'application/json' };
};

export const SERVER_REQUEST = async (endpoint, type, body) => {

    try {
            let response = '';
            response = type.toLowerCase() === 'post' ?
                await axios.post(`${BASE_URL}${endpoint}`, body, { headers: GET_HEADER() })
            :
            response = type.toLowerCase() === 'put' ?
                await axios.put(`${BASE_URL}${endpoint}`, body, { headers: GET_HEADER() })
            :
                await axios.get(`${BASE_URL}${endpoint}`, { headers: GET_HEADER() });

        LOGGER(endpoint, response);
        return response;
    } catch (error) {
        const {dispatch} = store; 
        //console.log(`MY ERROR:____`,error.response.status)
        if(error.response && (error.response.status === 403 || error.response.status === 401)){
            dispatch(actions.logout());
        }
        
        LOGGER(`${endpoint} error`, HANDLE_ERROR(error.response));
        return error.response.data;
    }
};

export const NEW_SERVER_REQUEST = async (endpoint, type, body) => {
    try {
        const response = type.toLowerCase() === 'post'
            ? await axios.post(`${BASE_URL}${endpoint}`, body, { headers: GET_HEADER() })
            : await axios.get(`${BASE_URL}${endpoint}`, { headers: GET_HEADER() });

        LOGGER(endpoint, response.data);
        return response;
    } catch (error) {
        LOGGER(`${endpoint} error`, HANDLE_ERROR(error));
        return HANDLE_ERROR(error.message);
    }
};

export const HANDLE_ERROR = (errorMessage) => ({
    data: null,
    message: errorMessage,
    status: '99'
});
