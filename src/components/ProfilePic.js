import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ProfilePic = () => {
    const location = useLocation();
    const [selectedFile, setSelectedFile] = useState(null);
    let defaultImageUrl = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80';
    const [imagePreviewUrl, setImagePreviewUrl] = useState(defaultImageUrl);
    const [currentUser, setCurrentUser] = useState(null);

    const handleFileInputChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setSelectedFile(file);
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
        if(currentUser && selectedFile)
            changeProfilePicture();

    }

    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (user !== null || user !== undefined)
            setCurrentUser(user);
    }, [location, selectedFile]);

    const changeProfilePicture = async () => {
        debugger;
        const url = `http://localhost:8089/users/change-profile-photo`;
        const formData = new FormData();
        formData.append('username', currentUser);
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
        </Container>
    );
}

export default ProfilePic;
