import React from 'react';
import { useParams } from 'react-router-dom';
import { useWebsiteDetails } from './hooks/useWebsiteDetails';
import VMConfigCard from '@components/WebsiteDetails/VMConfigCard';
import { Container, Spinner, Alert } from 'react-bootstrap';
import WebsiteTab from '@components/WebsiteDetails/WebsiteTab';
import Sidebar from '../components/Sidebar';

const WebsitePage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useWebsiteDetails(id);

    if (isLoading) return <Spinner animation="border" role="status" className="d-block mx-auto"><span className="visually-hidden">Loading...</span></Spinner>;
    if (error) return <Alert variant="danger">Error fetching website details.</Alert>;

    const { websiteInfo, vmConfig } = data;

    return (
        <div className="d-flex">
      <Sidebar />
      <Container fluid className="py-4" style={{ backgroundColor: '#f1f5f9' }}>
        <VMConfigCard config={vmConfig} websiteInfo={websiteInfo} />
        <WebsiteTab />
      </Container>
    </div>
    );
};

export default WebsitePage;
