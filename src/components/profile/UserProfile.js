import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import ProfilePic from "./ProfilePic";
import { UserLikes } from "./UserLikes";
import { UserComments } from "./UserComments";
import { UserPosts } from "./UserPosts";

function UserProfile() {
    let defaultImageUrl = 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png';
    const BASE_URL = 'http://localhost:8089/files/readFile/';
    const [key, setKey] = useState('posts');
    const [currentUser, setCurrentUser] = useState(null);
    //const [userDetails, setUserDetails] = useState(null);

    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem('currentUser');
        if (username !== null) {
            setCurrentUser(username);
            fetchUserDetails(username);
        }
    }, []);
    const fetchUserDetails = async (username) => {
        const url = `http://localhost:8089/users/${username}`;
        const options = {
            method: 'GET',
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.code === 200) {
                //setUserDetails(data.data);
                const imageUrl = data.data.avatar;
                imageUrl === null ? setAvatar(null) : setAvatar(`${BASE_URL}${imageUrl}`);
                console.log('Image URL:', imageUrl);
            }
        } catch (error) {
            console.error('Error --> ', error);
        }
    }

    return (
        <>
            <Row className='mt-5'>
                <Col ></Col>
                <Col md={8}>
                    <div className='mt-5'>
                        <Card className='mx-auto bg-dark'>
                            <Card.Header> <h4>Your Feed</h4> </Card.Header>
                            <Card.Body>
                                <Tabs
                                    id="profile-tabs"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                >
                                    <Tab eventKey="posts" title="Posts">
                                        <Card>
                                            <Card.Body>
                                                <UserPosts  currentUser={currentUser} />
                                            </Card.Body>
                                        </Card>
                                    </Tab>
                                   
                                    <Tab eventKey="likes" title="Likes">
                                        <Card>
                                            <Card.Body>
                                                <UserLikes  currentUser={currentUser} />
                                            </Card.Body>
                                        </Card>
                                    </Tab>
                                    <Tab eventKey="comments" title="Comments">
                                        <Card>
                                            <Card.Body>
                                                <UserComments  currentUser={currentUser} />
                                            </Card.Body>
                                        </Card>
                                    </Tab>
                                    <Tab eventKey="change-profile" title="Change Profile Photo">
                                        <Card>
                                            <Card.Body>
                                                {
                                                    avatar === null ? <ProfilePic currentUser={currentUser} avatar={defaultImageUrl} /> :
                                                        <ProfilePic currentUser={currentUser} avatar={avatar} />
                                                }
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

export default UserProfile;
