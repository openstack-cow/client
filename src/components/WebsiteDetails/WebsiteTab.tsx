import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';

import MonitoringComponent from './MonitoringComponent';

function WebsiteTab() {
  const [activeTab, setActiveTab] = useState('details');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const renderSubComponent = () => {
    switch (activeTab) {
    //   case 'details':
    //     return <DetailsSubComponent />; // Replace with your actual DetailsSubComponent
    //   case 'statusAndAlarms':
    //     return <StatusAndAlarmsSubComponent />; // Replace with your actual StatusAndAlarmsSubComponent
      case 'monitoring':
        return <MonitoringComponent />; // Replace with your actual MonitoringSubComponent
      // ... other subcomponents
      default:
        return null;
    }
  };

  return (
      <Tabs
        defaultActiveKey="details"
        id="uncontrolled-tab-example"
        className="mb-3"
        onSelect={handleTabChange}
      >
        <Tab eventKey="details" title="Details">
          {renderSubComponent()}
        </Tab>
        <Tab eventKey="statusAndAlarms" title="Status and Alarms">
          {renderSubComponent()}
        </Tab>
        <Tab eventKey="monitoring" title="Monitoring">
          {renderSubComponent()}
        </Tab>
        <Tab eventKey="networking" title="Networking">
          {renderSubComponent()}
        </Tab>
        <Tab eventKey="security" title="Security">
          {renderSubComponent()}
        </Tab>
        <Tab eventKey="storage" title="Storage">
          {renderSubComponent()}
        </Tab>
        {/* ... other tabs */}
      </Tabs>
  );
}

export default WebsiteTab;