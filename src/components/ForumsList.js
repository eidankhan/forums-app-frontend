import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Forum } from './Forum'

export const ForumsList = () => {
    return (
        <>
            <Row className='mt-3'>
                <Col></Col>
                <Col xs={12} md={8} lg={6}>
                    <Forum />
                    <Forum />
                </Col>
                <Col></Col>
            </Row>
        </>
    )
}
