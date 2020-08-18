import React, { useState , useEffect } from 'react'
import { Route , Redirect } from 'react-router-dom'
//import {connect, useSelector,useDispatch} from 'react-redux';
import {checkAuth} from './ReduxStore/actions/authAction.js';


function PrivateRoute({component: Component , ...rest}) {
    const [islogin, setIsLogin] = useState(null)
    const [awaitLogin,setAwaitLogin] = useState(true)

    


   //Done becuase of redux trace -issue
    function awaitAuth(){
        let token = localStorage.getItem('token');
        if(token !== null & token !== ''){
            setIsLogin(true) 
        }else{
            setIsLogin(false)        
        }
        setAwaitLogin(false)
    }

    // check if user is Authenticated
    //for redirection if user is not loggedin or use logs in
    function componentFunction(props,Component){
        if(!islogin && awaitLogin){
            return <div>Loading ...</div>
        }else if(islogin){
            return <Component {...props}/>
        }else if(!islogin && !awaitLogin){
            return <Redirect 
                to={{
                    pathname: '/',
                    state:{from: props.location},
                }}
            />
        }else{
            return ''
        }
    }

      
    useEffect(() => {
        awaitAuth()
    },[islogin])

    return (
        <Route
        {...rest}
        render = {
        (props) =>{
            return componentFunction(props,Component)
        }  
        }
        />
    )
}
// const mapStateToProps = state => ({
//     isLoggedIn: state.auth.isLoggedIn,
// });

// export default connect(mapStateToProps,{checkAuth})(PrivateRoute)
export default PrivateRoute