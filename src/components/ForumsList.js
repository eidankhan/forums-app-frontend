import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap'
import { Forum } from './Forum'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ForumsList = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [forums, setForums] = useState();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadForums();
    let timer;
    if (showModal) {
      timer = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showModal]);

  useEffect(() => {
    const userLoginStatus = localStorage.getItem('isUserLoggedIn');
    if (userLoginStatus === null) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setCountdown(5);
      setShowModal(false);
    }
  }, [countdown]);

  const loadForums = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8089/forums');
      setForums(response.data.data);
    } catch (error) {
      console.error('error --> ', error);
    }
    finally {
      setIsLoading(false);
    }

  }

  const handleClose = () => setShowModal(false);
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Closing in {countdown} seconds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div>
              <Button variant="primary" onClick={() => navigate('/register')}>
                New User? Register Here
              </Button>
            </div>
            <div className='mt-3'>
              <Button variant="secondary" onClick={() => navigate('/login')}>
                Already Registered? Login Here
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className='mt-3'>
        <Col></Col>
        <Col md={8}>
          {
            isLoading ?
              (
                <div className="text-center mt-5">
                  <Spinner animation="border" role="status" size='xl'>
                    <span className="sr-only"></span>
                  </Spinner>
                </div>
              )
              :
              (

                forums === undefined ? <h3 className='mt-5'> No Posts Available </h3> :
                <div>
                  {forums.map(forum => (
                    <div key={forum.id}>
                      <Forum
                        id={forum.id}
                        title={forum.title}
                        content={forum.content}
                        tags={forum.tags}
                        user={forum.user}
                        likesCount={forum.likesCounter}
                        commentsCount={forum.commentsCounter}
                        avatar = {forum.user.avatar}
                      />
                    </div>
                  ))}
                </div>
              )
          }


        </Col>
        <Col></Col>
      </Row>
    </>
  )
}
