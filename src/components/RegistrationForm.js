import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [variant, setVariant] = useState('danger');
    const [count, setCount] = useState(5); // initial counter value is 5

    const handleUserRegistration = async () => {
        if(username === '' || password === '' || name === ''){
            setResponse('Please fill all fields');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8089/users', { name, username, password })
            console.log('Response from server --> ', response.data);
            const data = response.data;
            if (data.code === 200) {
                setName('');
                setUsername('');
                setPassword('');
                setResponse('You are successfully registered!');
                setVariant('success');
            }
            else {
                setResponse('You are not registered!');
            }
        }
        catch (err) {
            alert('Internal Server Error occurred: ');
            console.error('Error ', err);
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
            navigate('/login');
        }
    }, [count, navigate]);

    return (
        <>
            <Row className='mt-5'>
                <Col ></Col>
                <Col md={8}>
                    <Card className='mx-auto bg-dark text-white mt-5'
                        style={{ maxWidth: '35rem' }}>
                        <Card.Header> <h3>Registration Form</h3> </Card.Header>
                        <Card.Body>
                            {
                                response &&
                                <Alert variant={variant}>
                                    {
                                        variant === 'danger' ? response :
                                            `You are registered now! Redirecting to login page in ${count} seconds...`
                                    }
                                </Alert>
                            }
                            <Form.Group controlId="formBasicUsername" className='mt-2'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Form.Group>
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
                                <Button
                                    variant="primary"
                                    onClick={handleUserRegistration}
                                >
                                    Register
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
