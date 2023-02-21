import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Forum } from './Forum'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ForumsList = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [forums, setForums] = useState();

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
    const token = sessionStorage.getItem('token');
    console.log('Token: ' + token);
    if (token === null) {
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
      const response = await axios.get('http://localhost:8089/forums');
      //const data = response.data;
      setForums(response.data.data);
      //console.log('Data --> ', forums);
    } catch (error) {
      console.error('error --> ', error);
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
            forums !== undefined &&
            <div>
              {forums.map(forum => (
                <div key={forum.id}>
                  <Forum 
                    title={forum.title}
                    content={forum.content}
                    user={forum.user}
                   />
                </div>
              ))}
            </div>
          }
        </Col>
        <Col></Col>
      </Row>
    </>
  )
}
