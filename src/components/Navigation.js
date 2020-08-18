import React,{useEffect} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {logoutUser,checkAuth} from '../ReduxStore/actions/authAction';

function Navigation(props) {
    let history = useHistory()
    useEffect(()=>{
       props.checkAuth()
    },[])
    return (
        <div>
            <Navbar bg="light" expand="md" className="px-4">
                <Navbar.Brand href="#">Sample</Navbar.Brand>
                <Navbar.Toggle aria-controls="navigation-bar"/>
                <Navbar.Collapse id="navigation-bar">
                    <Nav className="ml-auto">
                        { props.isLoggedIn ? (
                            <Nav.Item className="mx-sm-2"><button className="btn btn-sm btn-danger" 
                            onClick={
                                ()=>{
                                    props.logoutUser()
                                    history.push('/')
                                }
                            }>
                            Logout</button></Nav.Item>
                            ) :(
                            <Nav.Item className="mx-sm-2"><Link to="/"className="btn btn-sm btn-success">Log in</Link></Nav.Item>
                           )
                        }
                        <Nav.Item className="mx-sm-2"><Link to="/dashboard">Dashboard</Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}


const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps,{logoutUser , checkAuth})(Navigation)