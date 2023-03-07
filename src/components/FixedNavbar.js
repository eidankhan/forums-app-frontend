import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { FaSignOutAlt } from 'react-icons/fa';

export const FixedNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const userLoginStatus = localStorage.getItem('isUserLoggedIn');
    if (userLoginStatus || userLoginStatus !== null) {
      setIsUserLoggedIn(true);
      const username = localStorage.getItem('currentUser');
      setCurrentUser(capitalizeFirstLetter(username));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('currentUser');
    setIsUserLoggedIn(false);
    navigate('/login');
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


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
              {/* <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer> */}
              <Nav.Item>
                <Nav.Link disabled> <strong className='text-success'> {currentUser} </strong> </Nav.Link>
              </Nav.Item>
              {/* <Button
                variant='secondary'
                onClick={handleLogout}
              >
                Logout
              </Button> */}
              <Nav.Item className='mt-2'>
                {/* <Nav.Link disabled> */}
                  <FaSignOutAlt
                    size={24}
                    color='white'
                    onClick={handleLogout}
                    style={{ cursor: 'pointer' }}
                  />
                {/* </Nav.Link> */}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        }
      </Container>
    </Navbar>
  )
}
