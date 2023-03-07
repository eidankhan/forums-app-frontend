import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Col, Row, Image, Badge, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaComment, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';



export const Forum = (props) => {
    const navigate = useNavigate();
    let imageUrl = 'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png';
    const [currentUser, setCurrentUser] = useState('');
    const [likesCounter, setLikesCounter] = useState(props.likesCount);
    const [commentsCounter, setCommentsCounter] = useState(props.commentsCount);
    const [comments, setComments] = useState([]);
    const [isLoadCommentsButtonClicked, setIsLoadCommentsButtonClicked] = useState(false);
    const [value, setValue] = useState('');
    const [likeIconColor, setLikeIconColor] = useState('white');

    useEffect(() => {
        console.log('currentUser', currentUser);
        const user = localStorage.getItem('currentUser');
        if (user !== undefined || user !== null) {
            setCurrentUser(user);
        }
    }, [currentUser, likesCounter]);

    const handleLikedButton = async () => {
        if (currentUser === null || currentUser === undefined) {
            alert('Please login first to like this post');
        }
        else {
            const url = 'http://localhost:8089/forums/post/like';
            const formData = new FormData();
            formData.append('username', currentUser);
            formData.append('postId', props.id);

            const options = {
                method: 'POST',
                body: formData,
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();

                if (data.code === 200) {
                    const totalLikes = likesCounter + 1;
                    setLikesCounter(totalLikes);
                    setLikeIconColor('red');
                }
                else {
                    dislikePost(currentUser);
                }
            } catch (error) {
                console.error('Error --> ', error);
                console.error('Error Message--> ', error.message);
            }
        }
    }

    const dislikePost = async (username) => {
        debugger;
        const url = `http://localhost:8089/forums/posts/dislike/${username}/${props.id}`;
        try {
            const response = await axios.delete(url);
            const data = await response.data;
            if (data.code === 200) {
                const totalLikes = likesCounter - 1;
                setLikesCounter(totalLikes);
                setLikeIconColor('white');
            }
            else {
                alert(data.message);
            }
        }
        catch (error) {
            alert(error.message);
            console.error('Error --> ', error);
        }
    }

    const handleCommentButton = async () => {
        if (currentUser === null || currentUser === undefined) {
            alert('Please login first to read/write comments');
        }
        else {
            const url = `http://localhost:8089/forums/post/comments/${props.id}`;
            const options = {
                method: 'GET',
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setComments(data.data);
                setIsLoadCommentsButtonClicked(true);
            } catch (error) {
                console.error('Error --> ', error);
            }
        }
    };

    const renderComments = () => {
        if (!comments) {
            return null;
        }

        if (comments.length === 0) {
            return <p>No comments yet</p>;
        }

        return comments.map((comment) => {
            return (
                <Alert key={comment.id} variant='dark' style={{ maxWidth: '25rem' }}>
                    <p> <strong className='text-success'> {comment.commentator} </strong> {comment.text} </p>
                </Alert>
            );
        });
    };


    function handleChange(event) {
        setValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    }

    const handleCommentSubmit = async () => {
        const url = 'http://localhost:8089/forums/post/comment';
        const formData = new FormData();
        formData.append('username', currentUser);
        formData.append('postId', props.id);
        formData.append('text', value);

        const options = {
            method: 'POST',
            body: formData,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.code === 200) {
                const totalComments = commentsCounter + 1;
                setCommentsCounter(totalComments);
                setValue('');
                setComments([...comments, data.data]);
            }
        } catch (error) {
            console.error('Error --> ', error);
            console.error('Error Message--> ', error.message);
        }
    };

    const viewDetails = () => {
        console.log('View Details by id : ', props.id);
        if (currentUser === null || currentUser === undefined) {
            alert('Please login first to view this post');
        }
        else {
            const postId = props.id;
            navigate(`/forums/${postId}`);
        }
    }

    return (
        <div className='mt-3'>
            <Card className='mx-auto bg-dark text-white'
                style={{ maxWidth: '50rem' }}>
                <Card.Body>
                    <Card.Title> {props.title} </Card.Title>
                    <Row className="align-items-center mt-3">
                        <Col md={4}>
                            <Image src={imageUrl} roundedCircle style={{ width: '70px' }} />
                            <div className='d-inline-block'>
                                <p> &nbsp; <strong>{props.user.name}</strong> </p>
                            </div>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={6}>
                            <div className="d-flex">
                                {
                                    props.tags &&
                                    props.tags.map(tag => (
                                        <Badge key={tag} pill bg="success" className="me-2">
                                            {tag}
                                        </Badge>
                                    ))
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Card.Text>
                                {props.content} <br />
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col md={4}>
                            <div className='d-flex'>
                                <FaHeart
                                    size={24}
                                    color={likeIconColor}
                                    className='m-1'
                                    onClick={handleLikedButton}
                                    style={{ cursor: 'pointer' }}
                                />
                                <FaComment
                                    size={24}
                                    className='m-1'
                                    onClick={handleCommentButton}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </Col>
                        <Col md={7}></Col>
                        <Col md={1}>
                            <FaInfoCircle
                                size={24}
                                color={'green'}
                                className='m-1'
                                onClick={viewDetails}
                                style={{ cursor: 'pointer' }}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-0'>
                        <Col md={3}>
                            {
                                likesCounter > 0 ? <strong style={{ marginLeft: '10px', color: 'white' }}> {likesCounter} </strong> :
                                    <strong style={{ marginLeft: '10px' }}>0</strong>

                            }
                            {
                                commentsCounter > 0 ? <strong style={{ marginLeft: '15px', color: 'white' }}> {commentsCounter} </strong> :
                                    <strong style={{ marginLeft: '10px' }}>0</strong>

                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col>
                            {isLoadCommentsButtonClicked && renderComments(comments)}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={1}></Col>
                        <Col>
                            {
                                isLoadCommentsButtonClicked &&
                                <div>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Type something..."
                                        style={{ resize: 'none', maxWidth: '25rem' }}
                                        value={value}
                                        onChange={handleChange}
                                    />
                                    <Badge bg="success" text="white"
                                        className='m-1'
                                        onClick={handleCommentSubmit}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Post
                                    </Badge>{' '}
                                </div>

                            }
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </div>
    )
}
