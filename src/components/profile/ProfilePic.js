import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ProfilePic = (props) => {
    const location = useLocation();
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(props.avatar);

    useEffect(() => {
        setImagePreviewUrl(props.avatar);
    }, [props.avatar]);

    const handleFileInputChange = async (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setSelectedFile(file);
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        console.log('Current User --> ' + props.currentUser);
        console.log('Avatar URL:' + props.avatar);
    }, [location, selectedFile, props.currentUser, props.avatar]);

    const changeProfilePicture = async () => {
        debugger;
        if (props.currentUser && selectedFile) {
            const url = `http://localhost:8089/users/change-profile-photo`;
            const formData = new FormData();
            formData.append('username', props.currentUser);
            formData.append('file', selectedFile);
            const options = {
                method: 'POST',
                body: formData,
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                if (data.code === 200)
                    alert(data.message);
                else
                    alert(data.message);
            } catch (error) {
                alert(error.message);
                console.error('Error --> ', error);
            }
        }
        else {
            alert('Unable to update profile pic');
        }
    }


    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Change Profile
        </Tooltip>
    );

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                        <label htmlFor="fileInput">
                            <Image
                                src={imagePreviewUrl}
                                className="profile-pic"
                                roundedCircle
                                style={{ width: '250px' }}
                                onMouseOver={(e) => e.currentTarget.style.cursor = "pointer"}
                            />
                            <input
                                id="fileInput"
                                type="file"
                                accept='image/*'
                                style={{ display: "none" }}
                                onChange={handleFileInputChange}
                            />
                        </label>
                    </OverlayTrigger>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                    <Button
                        variant='success'
                        onClick={changeProfilePicture}
                    >
                        Update
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePic;
