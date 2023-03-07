import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock,  } from 'react-icons/fa';


export const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [variant, setVariant] = useState('danger');
    const [count, setCount] = useState(5); // initial counter value is 5

    const handleUserLogin = async () => {
        if(username === '' || password === ''){
            setResponse('Please fill all fields');
            return;
        }
        const url = 'http://localhost:8089/users/authentication';
        try {
            const response = await axios.post(url, { username, password });
            const data = response.data;
            if (data.code === 200) {
                localStorage.setItem('isUserLoggedIn', true);
                localStorage.setItem('currentUser', username);
                setResponse(data.message);
                setVariant('success'); // set the alert variant to success
                setCount(5); // reset the counter
            } else {
                console.info('Error: ' + data);
                setResponse(data.message);
            }
        } catch (err) {
            alert('Internal Server error occurred while processing request')
            console.error('Internal Server error', err);
        }
    }

    // start the counter when response changes
    useEffect(() => {
        let intervalId;
        if (response && variant === 'success' && count > 0) {
            intervalId = setInterval(() => {
                setCount(count - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [response, variant, count]);

    // redirect to home page when counter reaches 0
    useEffect(() => {
        if (count === 0) {
            navigate('/');
        }
    }, [count, navigate]);
    return (
        <>
            <Row className='mt-5'>
                <Col ></Col>
                <Col md={8}>
                    <Card className='mx-auto bg-dark text-white mt-5'
                        style={{ maxWidth: '35rem' }}>
                        <Card.Header> <h3>Login Form</h3> </Card.Header>
                        <Card.Body>
                            {
                                response &&
                                <Alert variant={variant}>
                                    {
                                        variant === 'danger' ? response :
                                            `Authenticated Successfully! Redirecting to homepage in ${count} seconds...`
                                    }
                                </Alert>
                            }

                            <Form.Group controlId="formBasicUsername" className='mt-2'>
                                <Row>
                                    <Col md={1}> <FaUser size={25} color='green' />  </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className='mt-3'>
                                <Row>
                                    <Col md={1}> <FaLock size={25} color='green' /> </Col>
                                    <Col>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                    </Col>
                                </Row>

                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className='mt-3'>
                                <Row>
                                    <Col md={4}></Col>
                                    <Col md={4}>
                                        <Button
                                            variant="success"
                                            onClick={handleUserLogin}
                                        >
                                            Login
                                        </Button>
                                    </Col>
                                    <Col md={4}></Col>
                                </Row>

                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}