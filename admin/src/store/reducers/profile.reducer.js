import * as actionTypes from '../actions/actionType';
 
const initialState = {
    error:null,
    loading:false,
    profileDetails:[],
    updating:false,
    updateError:null,
    updateStatus:false
    
    


};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.PROFILE_START:
            return{
                ...state,
                error:null,
                loading: true,
                // tripDetails:[],
                // searchData:[],
            };
        case actionTypes.PROFILE_SUCCESS:
            return{
                ...state,
                loading:false,
                profileDetails:action.payload,
                
            };
        case actionTypes.PROFILE_FAIL:
            return{
                ...state,
                loading:false,
                profileDetails:[],
                error:action.error
            };
        case actionTypes.UPDATE_PROFILE_START:
            return{
                ...state,
                updateError:null,
                updating: true,
                updateStatus: false
              
            };
        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                updateError:null,
                updating: false,
                updateStatus: true
                
            };
        case actionTypes.UPDATE_PROFILE_FAIL:
            return{
                ...state,
                updateError:action.error,
                updating: false,
                updateStatus: false
            };
        default:
            return state
    }


}
export default reducer;