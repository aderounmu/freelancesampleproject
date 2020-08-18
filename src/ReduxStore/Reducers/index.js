import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import dataReducer from './dataReducer.js';

export  default combineReducers({
    auth :  authReducer,
    apiData : dataReducer
})