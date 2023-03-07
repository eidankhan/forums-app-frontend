import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export const PostDetails = () => {

  const BASE_URL = 'http://localhost:8089/files/readFile';
  const { postId } = useParams();
  const [mediaUrl, setMediaUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [post, setPost] = useState();

  useEffect(() => {
    console.log('Finding post by id: ' + postId);
    if (!post) {
      loadPostById(postId);
    }
  }, [postId, post]);

  const loadPostById = async (id) => {
    setIsLoading(true);
    const url = `http://localhost:8089/forums/post/${id}`;
    try {
      const response = await axios.get(url);
      const loadedPost = response.data.data;
      setPost(loadedPost);
      console.log('Post Details', loadedPost);
      if (loadedPost.files && loadedPost.files.length > 0) {
        setMediaUrl(`${BASE_URL}/${loadedPost.files[0].name}`);
      }
    } catch (error) {
      console.error('error --> ', error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const renderMedia = () => {
    const photoExtensions = ['jpg', 'jpeg', 'png'];
    const videoExtensions = ['mp4', 'avi', 'mov', 'webm'];

    if(mediaUrl === '' || mediaUrl === undefined)
      return ( "" )

    if (photoExtensions.some(ext => mediaUrl.toLowerCase().endsWith(ext))) {
      return (
        <div className="d-flex justify-content-center align-items-center h-100">
          <img className="w-100 h-100" src={mediaUrl} alt={"filename"} />
        </div>
      );
    } else if (videoExtensions.some(ext => mediaUrl.toLowerCase().endsWith(ext))) {
      return (
        <div className="d-flex justify-content-center align-items-center h-100">
          <video className="w-100 h-100" controls>
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return <div>Invalid file type</div>;
    }

  }

  return (
    <>
      {
        isLoading ?
          (
            <div className="text-center mt-5">
              <Spinner animation="border" role="status" size='xl'>
                <span className="sr-only"></span>
              </Spinner>
            </div>
          )
          :
          (
            post &&
            <Row className='mt-5'>
              <Col ></Col>
              <Col md={8}>
                <Card className='mx-auto bg-dark text-white mt-5'
                  style={{ maxWidth: '50rem' }}>
                  <Card.Header>
                    <Card.Title>
                      <h3> {post.title} </h3>
                    </Card.Title>
                    {/* <h3 className="m-0">Forum Details</h3> */}
                    <div className="d-flex justify-content-center align-items-center h-100">
                      {/* <img className="w-100 h-100" src={mediaUrl} alt={"filename"} /> */}
                      {renderMedia()}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {post.content}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col></Col>
            </Row>
          )
      }
    </>

  )
}
