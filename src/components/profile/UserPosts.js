import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaInfoCircle, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export const UserPosts = (props) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);
    const [username, setUsername] = useState('');
    useEffect(() => {
        setUsername(props.currentUser);
    }, [props.currentUser]);

    useEffect(() => {
        if (username)
        fetchPostsByUser(username);
    }, [username])

    const fetchPostsByUser = async (user) => {
        if (user === null)
            return;
        const url = `http://localhost:8089/forums/posts/users/${user}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.code === 200) {
                console.log(data.message);
                setPosts(data.data);
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('error --> ', error);
        }
    }

    const handleDeleteClick = async (postId) => {
        const url = `http://localhost:8089/forums/posts/${postId}`;
        const options = {
            method: 'DELETE',
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.code === 200) {
                fetchPostsByUser(username);
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
            <div className='mx-auto bg-dark text-white mt-1'>
                {posts &&
                    posts.map(post => (
                        <div
                            key={post.id}
                            className='mt-1'
                            style={
                                {
                                    borderBottom: '2px solid white',
                                    padding: '5px 10px'
                                }
                            }
                        >
                            <h5>{post.title} </h5>
                            <p>{post.content}</p>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FaTrash
                                    size={20}
                                    color={'red'}
                                    className='m-1'
                                    onClick={() => handleDeleteClick(post.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span> <strong>Details</strong> </span>
                                <FaInfoCircle
                                    size={24}
                                    color={'green'}
                                    className='m-1'
                                    onClick={() => navigate(`/forums/${post.id}`)}
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
