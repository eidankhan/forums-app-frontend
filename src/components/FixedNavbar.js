import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export const FixedNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      setIsUserLoggedIn(true);
    }
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsUserLoggedIn(false);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
      <Container>
        <Navbar.Brand > Forums App |</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>Forums List</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        {isUserLoggedIn &&
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <LinkContainer to="/add-forum">
                <Nav.Link>Add Forum</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <Button
                variant='secondary'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        }
      </Container>
    </Navbar>
  )
}
