import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faCalendarDay, faCalendarWeek, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './navbar-styles.css';

export default function NavbarComponent(){
    return (
        <Navbar className="menu-desplegable" expand="lg">            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className="nav-element" as={Link} to="/">
                  <FontAwesomeIcon icon={faList} />Todas
                </Nav.Link>
                <Nav.Link className="nav-element" as={Link} to="/hoy">
                    <FontAwesomeIcon icon={faCalendarDay} />Hoy
                </Nav.Link>
                <Nav.Link className="nav-element" as={Link} to="/proxima-semana">
                    <FontAwesomeIcon icon={faCalendarWeek} />Próxima Semana
                </Nav.Link>
                <Nav.Link className="nav-element" as={Link} to="/completadas">
                    <FontAwesomeIcon icon={faCalendarCheck} /> Completadas
                </Nav.Link>                
              </Nav>        
            </Navbar.Collapse>
        </Navbar>
    )
}