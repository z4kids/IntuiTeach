import React from "react";
import dashicon from "../images/dashboard.svg";
import quizicon from "../images/quizicon.svg"
import { Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import '../style/Dashboard.css'

const Side = props => {

    return (
        <>
            
            
            <Nav className="col-md-12 d-none d-md-block bg-dark sidebar">
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link as={NavLink} className="img"  className="first-link" to='/dashboard'>
                        <OverlayTrigger
                            key='right'
                            placement='right'
                            overlay={
                                <Tooltip id={`tooltip-right`}>
                                    Dashboard
                        </Tooltip>
                            }
                        >
                            <img src={dashicon}></img>
                        </OverlayTrigger>
                    </Nav.Link>
                    
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} className="img" to='/quizmaker'>
                            <OverlayTrigger
                                key='right'
                                placement='right'
                                overlay={
                                    <Tooltip id={`tooltip-right`}>
                                        Manage quizzes
                                    </Tooltip>
                                }
                            >
                                <img src={quizicon}></img>
                            </OverlayTrigger>
                    </Nav.Link>
                </Nav.Item>
            </Nav>

        </>
    );
};


const Sidebar = withRouter(Side);
export default Sidebar