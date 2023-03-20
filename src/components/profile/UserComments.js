import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';

export const UserComments = (props) => {
    const navigate = useNavigate();
    const [comments, setComments] = useState(null);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [commentId, setCommentId] = useState();

    function handleChange(event) {
        setValue(event.target.value);
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    }
    
    const handleEditClick = (text, id) => {
        setValue(text);
        setCommentId(id);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    useEffect(() => {
        setUsername(props.currentUser);
    }, [props.currentUser]);

    useEffect(() => {
        if (username)
            fetchLikesByUser(username);
    }, [username])

    const fetchLikesByUser = async (user) => {
        if (user === null)
            return;
        const url = `http://localhost:8089/users/comments/${user}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.code === 200) {
                console.log(data.message);
                setComments(data.data);
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('error --> ', error);
        }
    }

    const handleDeleteClick = async (commentId) => {
        const url = `http://localhost:8089/forums/comments/${commentId}`;
        const options = {
            method: 'DELETE',
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.code === 200) {
                fetchLikesByUser(username);
                alert(data.message);
            }
            else{
                alert(data.message);   
            } 
            
        } catch (error) {
            alert('ERROR --> ',error.message);
            console.error('Error --> ', error);
            console.error('Error Message--> ', error.message);
        }
    }

    const editComment = async () => {
        const url = `http://localhost:8089/forums/comments/edit/${commentId}`;
        const formData = new FormData();
        formData.append('text', value);

        const options = {
            method: 'POST',
            body: formData,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.code === 200) {
                fetchLikesByUser(username);
                setShowModal(false);
                alert(data.message);
            }
            else{
                alert(data.message);   
            } 
            
        } catch (error) {
            alert('ERROR --> ',error.message);
            console.error('Error --> ', error);
            console.error('Error Message--> ', error.message);
        }
    }
    
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        as="textarea"
                        placeholder="Type something..."
                        style={{ resize: 'none', maxWidth: '25rem' }}
                        value={value}
                        onChange={handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editComment}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='mx-auto bg-dark text-white mt-1'>
                {comments &&
                    comments.map(comment => (
                        <div
                            key={comment.id}
                            className='mt-1'
                            style={
                                {
                                    borderBottom: '2px solid white',
                                    padding: '5px 10px'
                                }
                            }
                        >
                            <h5>{comment.post.title} Posted By: {comment.post.user.name} </h5>
                            <p> <strong>Your comment:</strong> {comment.text}</p>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FaEdit
                                    size={20}
                                    color={'green'}
                                    className='m-1'
                                    onClick={() => handleEditClick(comment.text, comment.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <FaTrash
                                    size={20}
                                    color={'red'}
                                    className='m-1'
                                    onClick={() => handleDeleteClick(comment.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span> <strong>View Post</strong> </span>
                                <FaInfoCircle
                                    size={24}
                                    color={'green'}
                                    className='m-1'
                                    onClick={() => navigate(`/forums/${comment.post.id}`)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
