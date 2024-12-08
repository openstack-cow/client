import React from 'react';
import { Row, Col, Card, Button, Dropdown } from "react-bootstrap";

interface VMConfig {
    cpu: number;
    ram: number; // in GB
    disk: number; // in GB
    os: string;
    instanceId: string,
    publicIPv4: string,
    instanceState: string,
    privateIPv4: string,
    publicDns: string,
    instanceType: string,
    vpcId: string
}

const VMConfigCard = ({config, websiteInfo}) => {
    return (
          <Card className="shadow-sm p-3 mb-5 bg-white rounded">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5>Website Summary for {config.instanceId}</h5>
              <div>
                <Button variant="primary" className="me-2">
                  Connect
                </Button>
              
              </div>
              <div>
              <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Actions
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Start</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Stop</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Website Information</h6>
                  <p>
                    <strong>Name:</strong> {websiteInfo.name}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={`http://${websiteInfo.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {websiteInfo.url}
                    </a>
                  </p>
                  <p>
                    <strong>Created At:</strong> {new Date(websiteInfo.createdAt).toLocaleDateString()}
                  </p>
                </Col>
                <Col md={6}>
                  <h6>Instance Details</h6>
                  <p>
                    <strong>Instance ID:</strong> {config.instanceId}
                  </p>
                  <p>
                    <strong>Public IPv4 Address:</strong>{" "}
                    <a
                      href={`http://${config.publicIPv4}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.publicIPv4}
                    </a>
                  </p>
                  <p>
                    <strong>Instance State:</strong>{" "}
                    <span className="text-success">{config.instanceState}</span>
                  </p>
                  <p>
                    <strong>Instance Type:</strong> {config.instanceType}
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <h6>Network Details</h6>
                  <p>
                    <strong>Private IPv4 Address:</strong> {config.privateIPv4}
                  </p>
                  <p>
                    <strong>Public DNS:</strong>{" "}
                    <a
                      href={`http://${config.publicDns}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.publicDns}
                    </a>
                  </p>
                  <p>
                    <strong>VPC ID:</strong> {config.vpcId}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
      );
}

export default VMConfigCard;
