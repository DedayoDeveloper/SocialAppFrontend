import * as actionTypes from '../actions/actionType';
 
const initialState = {
    error:null,
    loading:false,
    escortDetails:[],
    singleEscortDetails:null,
    escortCategories: []
    
    
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ESCORT_START:
            return{
                ...state,
                error:null,
                loading: true,
            };
        case actionTypes.ESCORT_SUCCESS:
            return{
                ...state,
                loading:false,
                escortDetails:action.payload,
                
            };
        case actionTypes.SINGLE_ESCORT_SUCCESS:
            return{
                ...state,
                loading:false,
                singleEscortDetails:action.payload,
                
            };
        case actionTypes.ESCORT_UNLOAD:
            return{
                ...state,
                loading:false,
                escortDetails:[],
                singleEscortDetails:null,
                escortCategories:[]
            }
        case actionTypes.ESCORT_FAIL:
            return{
                ...state,
                loading:false,
                escortDetails:[],
            };
        default:
            return state
    }


}
export default reducer;