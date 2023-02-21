import React from 'react'
import { Card, Col, Row, Image, Badge } from 'react-bootstrap';

export const Forum = (props) => {
    let imageUrl = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80';
    return (
        <div className='mt-3'>
            <Card className='mx-auto bg-white text-dark'
                style={{ maxWidth: '50rem' }}>
                <Card.Body>
                    <Card.Title> {props.title} </Card.Title>
                    <Row className="align-items-center mt-3">
                        <Col md={4}>
                            <Image src={imageUrl} roundedCircle style={{ width: '60px' }} />
                            <div className='d-inline-block'>
                                <p> &nbsp; {props.user.name} </p>
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
                                {props.content}
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
        </div>
    )
}
