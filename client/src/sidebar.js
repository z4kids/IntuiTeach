import React from "react";
import dashicon from "./images/dashboard.svg";
import quizicon from "./images/quizicon.svg"
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { withRouter } from "react-router";
import './Dashboard.css'

const Side = props => {

    return (
        <>
            
            
            <Nav className="col-md-12 d-none d-md-block bg-dark sidebar"
                activeKey="/dashboard"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link className="img"  className="first-link" eventKey="link-1">
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
                    <Nav.Link className="img" eventKey="link-2">
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