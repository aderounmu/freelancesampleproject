import React, { useState, useEffect } from 'react'
import { Row , Col , Form, Button, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {loginUser, removeError} from '../ReduxStore/actions/authAction.js';
import {useHistory} from 'react-router-dom'


function LoginForm(props) {

    const [email , setEmail] = useState("testuser@zybisys.com");
    const [password, setPassword] = useState("Testuser@123");
    let history = useHistory()
    
    function submitForm(event){
        event.preventDefault();
        props.loginUser({email,password})
           
    }

    useEffect(()=>{
       if(props.isLoggedIn){
            history.push('/dashboard')
        }
    },[props.isLoggedIn])

   
    
    return (
        <div>
           <Row className="mx-3 my-5">
               <Col>
                    <div className="text-center mb-4">
                        {/* company Logo */}
                        <div className="h4">Sample Logo</div>
                        {/* Welcome statement */}
                        <div className="mt-3">
                            Welcome to Sample logo 
                        </div>
                    </div>
                    {/* Login Error */}
                    {
                        
                        props.error ? (
                        <Alert variant="danger" onClose={()=> props.removeError()} dismissible>
                            <p>{props.message}</p>
                        </Alert>
                        ) : ' '
                             
                    }
                    

                    {/* Login form */}
                    <Form className="mt-3" onSubmit={submitForm}>
                        <Form.Group controlId="Email" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={e=>setEmail(e.target.value)} size="xs"  type="" placeholder="Enter Email"></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={e=>setPassword(e.target.value)} size="sm" type="password" placeholder="Password"></Form.Control>
                            <Form.Text className="text-danger text-right my-2"> Forget Password ? </Form.Text>
                        </Form.Group>
                        <Button disabled={props.logging} block variant="primary" type="submit" size="sm"> 
                            { props.logging ? 'Loggining...': 'Log in'  }
                        </Button>
                    </Form>
                    {/* Alternative login  */}
                    <div className="my-3 text-center">
                        <div className="my-2">
                            Or
                        </div>
                        <div>
                            Login with facebook
                        </div>
                    </div>
               </Col>
           </Row>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.isError,
    message: state.auth.errorMessage,
    logging: state.auth.loggingRequest,
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps,{loginUser , removeError})(LoginForm)