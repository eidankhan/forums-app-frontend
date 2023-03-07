// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Alert } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

export const AddForum = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [response, setResponse] = useState('');
    const [variant, setVariant] = useState('danger');
    const [count, setCount] = useState(5); // initial counter value is 5

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user !== null || user !== undefined)
            setCurrentUser(user);
    }, [location]);

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


    const savePost = async () => {
        const username = currentUser;
        const url = `http://localhost:8089/forums/create/${username}`;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);

        const options = {
            method: 'POST',
            body: formData,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if(data.code === 200){
                setResponse(data.message);
                setVariant('success'); // set the alert variant to success
                setCount(5); // reset the counter
            }
            else{
                setResponse(data.message);
            }
            
        } catch (error) {
            setResponse(error.message);
            console.error('Error --> ', error);
        }
    };



    return (
        <>
            <Row className='mt-5'>
                <Col></Col>
                <Col md={8}>
                    <Card className='mx-auto bg-dark text-white mt-5' style={{ maxWidth: '60rem' }}>
                        <Card.Header> <h3> Post Forum </h3> </Card.Header>
                        <Card.Body>
                            {
                                response &&
                                <Alert variant={variant}>
                                    {
                                        variant === 'danger' ? 'Error occurred while posting this forum' :
                                            `New Post updated successfully! Redirecting to forums pags in ${count} seconds`
                                    }
                                </Alert>
                            }
                            <Row>
                                <Col>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Post title"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Upload File</Form.Label>
                                    <Form.Control
                                        type="file" accept="image/*,video/*" onChange={handleFileChange}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={10}
                                        placeholder="Post content"
                                        value={content}
                                        onChange={(event) => setContent(event.target.value)}
                                    /></Col>
                                <Col>
                                    {
                                        previewUrl && <Form.Label>Preview</Form.Label>
                                    }
                                    {previewUrl && (
                                        <div>
                                            {file.type.includes('image') ? (
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    style={{ maxHeight: '16rem' }}

                                                />
                                            ) : (
                                                <video
                                                    src={previewUrl}
                                                    controls
                                                    style={{ maxWidth: '28rem' }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </Col>
                                <Row className='mt-3'>
                                    <Col>
                                        <Form.Group controlId="formBasicPassword">
                                            <Button
                                                variant="primary"
                                                onClick={savePost}
                                            >
                                                Add Forum
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Row>

                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>


        </>
    )
}
