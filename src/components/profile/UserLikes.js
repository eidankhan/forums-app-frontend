import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UserLikes = (props) => {
    const [posts, setPosts] = useState(null);
    const [username, setUsername] = useState('');
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
        const url = `http://localhost:8089/users/likes/${user}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
            if (data.code === 200) {
                console.log(data.message);
                const extractedPosts = data.data.map(obj => obj.post);
                setPosts(extractedPosts);
                //console.log('Extracted Posts:', extractedPosts);
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('error --> ', error);
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
                                    padding: '5px 10px',
                                }
                            }
                        >
                            <h5>{post.title} By: {post.user.name} </h5>
                            <p>{post.content}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
