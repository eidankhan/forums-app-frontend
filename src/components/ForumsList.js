import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Forum } from './Forum'
import { useNavigate } from 'react-router-dom'

export const ForumsList = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(5);
    useEffect(() => {
      let timer;
      if (showModal) {
        timer = setInterval(() => {
          setCountdown(countdown => countdown - 1);
        }, 1000);
      }
      return () => clearInterval(timer);
    }, [showModal]);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);
  
      return () => clearTimeout(timer);
    }, []);
  
    useEffect(() => {
      if (countdown === 0) {
        setCountdown(5);
        setShowModal(false);
      }
    }, [countdown]);
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
                    <Forum />
                    <Forum />
                    <Forum />
                    <Forum />
                    <Forum />
                    <Forum />
                    <Forum />
                    <Forum />
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}
