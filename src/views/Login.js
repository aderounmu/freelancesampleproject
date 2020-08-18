import React , { useLayoutEffect , useState } from 'react';
import LoginForm from '../components/LoginForm.js';
import { Container, Row, Col, Image,Alert } from 'react-bootstrap';
import logo from '../logo.svg';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {checkAuth} from '../ReduxStore/actions/authAction.js';

function Login(props) {

    const [islogin, setIsLogin] = useState(null)
    const [awaitAuth,setawaitAuth] = useState(true)

    //made to work asynchronously to fix bug of setting login before checking for auth
    function awaitingAuth(){
        props.checkAuth();
        setIsLogin(props.isLoggedIn)
        setawaitAuth(false) 
    }

    let history = useHistory()
     //for redirection if user is already loggedin or use logs in 
    useLayoutEffect(() => {
        props.checkAuth();
        setIsLogin(props.isLoggedIn)
        setawaitAuth(false) 
        if(islogin === true && awaitAuth === false){
            history.push('/dashboard')
        }       
    },[islogin])

    // useEffect(()=>{
        
    // },[islogin])

    const [showAlert , setShowAlert] = useState(true);
    

    return (
        <div>
            {/* Login Page */}
            <div className="body mx-2 mx-md-5 my-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col sm={12} md={9}>
                            <div className="mb-3">
                               {showAlert ?(<Alert variant="info"
                                   onClose={()=>setShowAlert(false)}
                                   dismissible
                                   >
                                    Please Note you dont need to put in the log Credentials 
                                    you can just click the login button to continue
                                </Alert>):''}
                            </div>
                            <div className="shadow LoginCard rounded">
                                <Row className="justify-content-center align-items-center">
                                    <Col sm={12} md={6} className="d-none d-md-block align-self-stretch">
                                        <div className=" bg-dark h-100">
                                            <Row className=" h-100 align-items-center">
                                                <Col><Image fluid src={logo}/></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col sm={12} md={6}>
                                        <LoginForm />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
});


export default connect(mapStateToProps,{checkAuth})(Login)