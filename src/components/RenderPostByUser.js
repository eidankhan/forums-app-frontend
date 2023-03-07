import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Forum } from './Forum';

export const RenderPostByUser = (props) => {
  const [posts, setPosts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = props.currentUser
    if (username !== null)
    {
      setCurrentUser(username);
      // fetchPostsByUser();
    }
}, [currentUser]);

  const fetchPostsByUser = async () => {
    if (currentUser === null)
      return;

    const url = `http://localhost:8089/forums/posts/users/${currentUser}`;
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

  return (
    <>
      {
        posts &&
        posts.map(forum => (
          <div key={forum.id}>
            <Forum
              id={forum.id}
              title={forum.title}
              content={forum.content}
              tags={forum.tags}
              user={forum.user}
              likesCount={forum.likesCounter}
              commentsCount={forum.commentsCounter}
              avatar = {forum.user.avatar}
            />
          </div>
        ))
      }
    </>
  );
}
