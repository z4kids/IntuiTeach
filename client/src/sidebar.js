import React from "react";
import dashicon from "./images/dashboard.svg";
import quizicon from "./images/quizicon.svg"
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import './Dashboard.css'

const Side = props => {

    return (
        <>

            <Nav className="col-md-8 d-none d-md-block bg-dark sidebar"
                activeKey="/dashboard"
                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link className="img"  className="first-link" eventKey="link-1"><img src={dashicon}></img></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="img" eventKey="link-2"><img src={quizicon}></img></Nav.Link>
                </Nav.Item>
            </Nav>

        </>
    );
};
const Sidebar = withRouter(Side);
export default Sidebar