import { LOGIN_USER, ERROR_LOGIN, LOGOUT_USER,REMOVE_ERROR, LOGIN_REQUEST,LOGIN_REQUEST_END } from '../actions/types.js'

const initialState = {
    isLoggedIn: false,
    token: null,
    isError: false,
    errorMessage: null,
    loggingRequest: false,
}

export default function(state= initialState , action){

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload
            };
        case ERROR_LOGIN:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                isError: true,
                errorMessage: action.payload
            };
        case LOGOUT_USER:
            return{
                ...state,
                isLoggedIn: false,
                token: null,
            };
        case REMOVE_ERROR:
            return{
                ...state,
                isError: false,
                errorMessage: null
            }
        case LOGIN_REQUEST:
            return{
                ...state,
                loggingRequest: true
            }
        case LOGIN_REQUEST_END:
        return{
            ...state,
            loggingRequest: false
        }
        default:
            return state;
    }

}