import { LOGIN_USER, ERROR_LOGIN, LOGOUT_USER,REMOVE_ERROR, LOGIN_REQUEST,LOGIN_REQUEST_END } from '../actions/types.js'

//Login action
export const loginUser = (item) => dispatch =>{
    
    /**
    * NOTICE
    * NOTE DUE TO CORS NOT ENABLED BY THE BACKEND:
    * the code below with not work unless a chrome 
    * plugin Moesif Orign & CORS Changer Offered by: https://www.moesif.com
    * is used.
    */

    let Authdata = {
        email:"testuser@zybisys.com",
        password:"Testuser@123"
    }
    
    dispatch({
        type: LOGIN_REQUEST,
        payload: 'Loggining'
    })

    return fetch('http://128.199.0.16:3000/users/login',{
        method: 'POST',
        headers:{
            "Content-Type":'application/json',
        },
        body: JSON.stringify(Authdata)
    })
    .then(response => response.json())
    .then( data => {
        localStorage.setItem('token', data.message.token)
    })
    .then(token => dispatch({
        type: LOGIN_USER,
        payload: localStorage.getItem('token')
    })
    )
    .catch(
        err => dispatch({
            type: ERROR_LOGIN,
            payload: err.message
        })
    )
    .finally(()=>{
        dispatch({
            type: LOGIN_REQUEST_END,
            payload: 'Loggiining end'
        })
    })
    
}

//logout action
export const logoutUser = () => dispatch =>{
    localStorage.removeItem('token')
    dispatch({
        type: LOGOUT_USER,
        payload: 'logged out'
    })

}


//CHECK for token in localstorage
export const checkAuth = () => dispatch =>{
    let token = localStorage.getItem('token');
    if(token !== null && token !== ''){
        dispatch({
            type: LOGIN_USER,
            payload: token
        })
    }else{
        dispatch({
            type: LOGOUT_USER,
        })   
    }
}

//Remove Error 
export const removeError = () => dispatch =>{
    dispatch({
        type: REMOVE_ERROR,
        payload: null,
    })
}