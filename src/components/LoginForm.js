import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <Row className='mt-5'>
                <Col ></Col>
                <Col md={8}>
                    <Card className='mx-auto bg-white text-dark mt-3'
                        style={{ maxWidth: '50rem' }}>
                        <Card.Header> <h3>Login Form</h3> </Card.Header>
                        <Card.Body>
                            <Form.Group controlId="formBasicUsername" className='mt-2'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className='mt-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className='mt-3'>
                                <Button variant="primary" >
                                    Login
                                </Button>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}
