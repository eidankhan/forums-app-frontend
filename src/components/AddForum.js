import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

export const AddForum = () => {
    const [title, setTitle] = useState();
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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
    return (
        <>
            <Row className='mt-5'>
                <Col></Col>
                <Col md={8}>
                    <Card className='mx-auto bg-white text-dark mt-3' style={{ maxWidth: '60rem' }}>
                        <Card.Header> <h3> Post Forum </h3> </Card.Header>
                        <Card.Body>
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
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
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
