import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const FixedNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
      {/* <Container> */}
        <Navbar.Brand > Forums App |</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/">
              <Nav.Link>Forums List</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  )
}
