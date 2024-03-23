import { faCartShopping, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className = "pt-4">
      <Container fluid>
        <Navbar.Brand href="#home" className='nav-brand'>the<span style={{color : "#606C5A"}}>JAPANDI</span>store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <div style={{}}></div>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav variant = "underline">
            <Nav.Link className='nav-menu' >Living</Nav.Link>
            <Nav.Link className='nav-menu' >Bedroom</Nav.Link>
            <Nav.Link className='nav-menu' >Kitchen</Nav.Link>
            <Nav.Link className='nav-menu' >Bathroom</Nav.Link>
            <Nav.Link className='nav-menu' >
                <FontAwesomeIcon icon = {faSearch} />
            </Nav.Link >
            <Nav.Link className='nav-menu'>
                <FontAwesomeIcon icon = {faUser} />
            </Nav.Link>
            <Nav.Link className='nav-menu'>
                <FontAwesomeIcon icon = {faCartShopping} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar