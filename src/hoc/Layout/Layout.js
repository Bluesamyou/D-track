import React from "react";
import EntryForm from "../../containers/Form/Form";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./Layout.css";
import { BrowserRouter, Route } from "react-router-dom";
import Pending from "../../containers/Pending/Pending";
import Dashboard from "../../containers/Dashboard/Dashboard";
const Layout = props => (
  <div>
    <div>
      <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">D-track</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown.Item href="/">Entry Form</NavDropdown.Item>
            <NavDropdown.Item href="/pending">Pending Loans</NavDropdown.Item>
            <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
            <div
              style={{
                width: "100%",
                display: "grid",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <NavDropdown.Item onClick={props.logout} id="logout" href="#">
                Logout
              </NavDropdown.Item>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    <div>
      <BrowserRouter>
        <Route path="/pending" component={Pending} />
        <Route path="/" exact component={EntryForm} />
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    </div>
  </div>
);

export default Layout;
