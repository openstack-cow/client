import React from 'react';
import { useParams } from 'react-router-dom';
import { useWebsiteDetails } from './hooks/useWebsiteDetails';
import WebsiteInfoCard from '@components/WebsiteDetails/WebsiteInfoCard';
import VMConfigCard from '@components/WebsiteDetails/VMConfigCard';
import { Container, Spinner, Alert } from 'react-bootstrap';
import WebsiteTab from '@components/WebsiteDetails/WebsiteTab';

const WebsitePage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useWebsiteDetails(id);

    if (isLoading) return <Spinner animation="border" role="status" className="d-block mx-auto"><span className="visually-hidden">Loading...</span></Spinner>;
    if (error) return <Alert variant="danger">Error fetching website details.</Alert>;

    const { websiteInfo, vmConfig } = data;

    return (
        
        <Container>
            <h1 className="text-center my-4">Website Details</h1>
            {/* <WebsiteInfoCard website={websiteInfo} /> */}
            <VMConfigCard config={vmConfig} websiteInfo={websiteInfo} />
            {/* Tab components */}

            <WebsiteTab />
        </Container>
    );
};

export default WebsitePage;
