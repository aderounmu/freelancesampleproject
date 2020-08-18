import {GET_PIE_DATA, GET_LINE_DATA, GET_TABLE_DATA} from '../actions/types'
import {REQUEST_PIE_DATA, REQUEST_LINE_DATA, REQUEST_TABLE_DATA} from '../actions/types'
import {FAILED_PIE_DATA,  FAILED_LINE_DATA, FAILED_TABLE_DATA} from '../actions/types'
import {REQUEST_END_PIE_DATA, REQUEST_END_LINE_DATA, REQUEST_END_TABLE_DATA} from '../actions/types'
import {REMOVE_PIE_FAILURE, REMOVE_LINE_FAILURE, REMOVE_TABLE_FAILURE } from '../actions/types'



const initialState = {
    request:{
        pie_data : false,
        line_data : false,
        table_data : false,
    },

    isError:{
        pie_data : false,
        line_data : false,
        table_data : false,
    },

    errorMessage:{
        pie_data : null,
        line_data : null,
        table_data : null,
    },

    data:{
        pie_data : null,
        line_data : null,
        table_data : null,
    }
    
}


export default function(state= initialState, action){
    switch (action.type) {
        case GET_PIE_DATA: 
            return {
                ...state,
                data:{
                    ...state.data,
                    pie_data : action.payload
                }
            };
        case GET_LINE_DATA: 
            return {
                ...state,
                data:{
                    ...state.data,
                    line_data : action.payload
                }
            };
        case GET_TABLE_DATA: 
            return {
                ...state,
                data:{
                    ...state.data,
                    table_data : action.payload
                }
            };

        case REQUEST_PIE_DATA: 
            return {
                ...state,
                request:{
                    ...state.request,
                    pie_data : true
                }
            };
            
        case REQUEST_LINE_DATA: 
            return {
                ...state,
                request:{
                    ...state.request,
                    line_data : true
                }
            };
        case REQUEST_TABLE_DATA: 
            return {
                ...state,
                request:{
                    ...state.request,
                    table_data : true
                }
            };

        case FAILED_PIE_DATA: 
            return {
                ...state,
                isError:{
                    ...state.isError,
                    pie_data : true
                },
                errorMessage:{
                    ...state.errorMessage,
                    pie_data : action.payload
                }
            };
        case FAILED_LINE_DATA: 
            return {
                ...state,
                isError:{
                    ...state.isError,
                    line_data : true
                },
                errorMessage:{
                    ...state.errorMessage,
                    line_data : action.payload
                }

            };
        case FAILED_TABLE_DATA: 
            return {
                ...state,
                isError:{
                    ...state.isError,
                    table_data : true
                },
                errorMessage:{
                    ...state.errorMessage,
                   table_data : action.payload
                }
            };
        case REQUEST_END_PIE_DATA :
            return {
                ...state,
                request:{
                    ...state.request,
                    pie_data : false
                }
            };
        case REQUEST_END_LINE_DATA :
            return {
                ...state,
                request:{
                    ...state.request,
                    line_data : false
                }
            };
        case REQUEST_END_TABLE_DATA :
            return {
                ...state,
                request:{
                    ...state.request,
                    table_data : false
                }
            };

        case REMOVE_PIE_FAILURE :
            return {
                ...state,
                isError:{
                    ...state.isError,
                    pie_data : false
                },
                errorMessage:{
                    ...state.errorMessage,
                   pie_data : null
                }
            };
        case REMOVE_LINE_FAILURE :
            return {
                ...state,
                isError:{
                    ...state.isError,
                    line_data : false
                },
                errorMessage:{
                    ...state.errorMessage,
                   line_data : null
                }
            };
        case REMOVE_TABLE_FAILURE :
            return {
                ...state,
                isError:{
                    ...state.isError,
                    table_data : false
                },
                errorMessage:{
                    ...state.errorMessage,
                   table_data : null
                }
            };
        default:
            return state;
    }
}