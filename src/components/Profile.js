
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap'
import ProfilePic from './ProfilePic';
import { RenderPostByUser } from './RenderPostByUser';

export const Profile = () => {
    const [key, setKey] = useState('posts');
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        const username = localStorage.getItem('currentUser');
        if (username !== null)
            setCurrentUser(username);
    }, []);

    return (
        <>
            <Row className='mt-5'>
                <Col ></Col>
                <Col md={8}>
                    <div className='mt-5'>
                        <Card>
                            <Card.Header> <h4>Your Profile</h4> </Card.Header>
                            <Card.Body>
                                <Tabs
                                    id="profile-tabs"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                >
                                    <Tab eventKey="posts" title="Posts">
                                        <RenderPostByUser currentUser={currentUser} />
                                    </Tab>
                                    <Tab eventKey="comments" title="Change Profile Photo">
                                        <Card>
                                            <Card.Body>
                                                <ProfilePic />
                                            </Card.Body>
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}
