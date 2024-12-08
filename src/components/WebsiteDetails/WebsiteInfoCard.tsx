import React from 'react';
import { Card, Table, Container, Row, Col } from 'react-bootstrap';

interface WebsiteInfo {
    name: string;
    url: string;
    createdAt: string;
    owner: string;
}

const WebsiteInfoCard = ({ website }) => {
    return (
            <Row>
                <Col md={8} lg={6} className="mx-auto">
                    <Card className="mb-4 shadow-sm">
                        <Card.Header className="bg-primary text-white text-center">
                            <h5 className="mb-0">Website Information</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table borderless className="mb-0">
                                <tbody>
                                    <tr>
                                        <td><strong>Name:</strong></td>
                                        <td>{website.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>URL:</strong></td>
                                        <td>
                                            <a 
                                                href={website.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="text-decoration-none"
                                            >
                                                {website.url}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>Owner:</strong></td>
                                        <td>{website.owner}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Created At:</strong></td>
                                        <td>{new Date(website.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
    );
};

export default WebsiteInfoCard;
