import React from 'react'
import { Card, Col, Row, Image, Badge } from 'react-bootstrap';

export const Forum = () => {
    let imageUrl = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80';
    return (
        <div className='mt-5'>
            <Row className="justify-content-center">
                <Col xs={2}></Col>
                <Col xs={8}>
                    <Card className='bg-dark text-white' style={{ width: '40rem' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Row className="align-items-center mt-3">
                                <Col md={4}>
                                    <Image src={imageUrl} roundedCircle style={{ width: '60px' }} />
                                    <div className='d-inline-block'>
                                        <p> &nbsp; Eidan Khan</p>
                                    </div>
                                </Col>
                                <Col md={6}></Col>
                                <Col md={2}>
                                    <Badge pill bg="primary">
                                        Primary
                                    </Badge>{' '}
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <div className='d-flex'>
                                        <Badge bg="secondary" text="white"
                                            className='m-1'
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Like
                                        </Badge>{' '}
                                        <Badge bg="secondary" text="white"
                                            className='m-1'
                                            style={{ cursor: 'pointer' }}
                                        >
                                            Share
                                        </Badge>{' '}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                
            </Row>
        </div>
    )
}