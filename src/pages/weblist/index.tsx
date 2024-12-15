import React, { useState } from 'react';
import { Container, Table, Form, InputGroup, Button, Row, Col, Badge, Card, Dropdown } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import { PlusLg, Search, ThreeDotsVertical, Trash, PencilSquare } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

const initialWebsites = [
  { id: '1', name: 'Website A', status: 'Running', url: 'http://website-a.com', cluster: 'Cluster 1', deployTime: '2024-05-01 10:00', visits: 1500 },
  { id: '2', name: 'Website B', status: 'Stopped', url: 'http://website-b.com', cluster: 'Cluster 2', deployTime: '2024-04-20 14:30', visits: 800 },
  { id: '3', name: 'Website C', status: 'Pending', url: 'http://website-c.com', cluster: 'Cluster 1', deployTime: '2024-06-01 09:15', visits: 200 },
];

const options = {
  keys: ['name', 'url', 'status', 'cluster'],
  threshold: 0.3,
};

const WebsiteList = () => {
  const [search, setSearch] = useState('');
  const [websites, setWebsites] = useState(initialWebsites);
  const [selectedWebsites, setSelectedWebsites] = useState<string[]>([]);
  const navigate = useNavigate();

  const fuse = new Fuse(websites, options);

  const filteredWebsites = search ? fuse.search(search).map((result) => result.item) : websites;

  // Hàm xử lý chọn/deselect checkbox
  const handleCheckboxChange = (id: string) => {
    setSelectedWebsites((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // Hàm xử lý chọn tất cả
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedWebsites(websites.map((website) => website.id));
    } else {
      setSelectedWebsites([]);
    }
  };

  // Hàm xử lý chuyển hướng tới trang chi tiết
  const handleRowClick = (id: string) => {
    navigate(`/weblist/${id}`);
  };

  return (
    <div className="d-flex">
      <Container fluid className="py-4" style={{ backgroundColor: '#f1f5f9' }}>
        <Card className="p-4 shadow-sm border-0 rounded-4">
          <Row className="mb-4 g-3 align-items-center">
            <Col xs={12} md={6}>
              <h3 className="fw-bold text-dark mb-0">🚀 Deployed Websites</h3>
            </Col>
            <Col xs={12} md={6} className="text-md-end d-flex justify-content-md-end gap-2">
              <Button variant="success" className="rounded-4">
                <PlusLg /> Add New Website
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" className="rounded-4">
                  Actions <ThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled={selectedWebsites.length === 0}>
                    <PencilSquare className="me-2" /> Edit Selected
                  </Dropdown.Item>
                  <Dropdown.Item disabled={selectedWebsites.length === 0}>
                    <Trash className="me-2 text-danger" /> Delete Selected
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          {/* Thanh tìm kiếm */}
          <Row className="mb-4 g-2">
            <Col xs={12} md={8}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search websites..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-start-4"
                />
                <Button variant="primary" className="rounded-end-4">
                  <Search /> Search
                </Button>
              </InputGroup>
            </Col>
          </Row>

          {/* Bảng liệt kê website */}
          <div className="table-responsive">
            <Table hover className="bg-white rounded-4 shadow-sm">
              <thead className="table-light">
                <tr className="text-center">
                  <th>
                    <Form.Check
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedWebsites.length === websites.length && websites.length > 0}
                    />
                  </th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>URL</th>
                  <th>Cluster</th>
                  <th>Deploy Time</th>
                  <th>Visits</th>
                </tr>
              </thead>
              <tbody>
                {filteredWebsites.length > 0 ? (
                  filteredWebsites.map((website) => (
                    <tr
                      key={website.id}
                      className="text-center align-middle clickable-row"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRowClick(website.id)}
                    >
                      <td onClick={(e) => e.stopPropagation()}>
                        <Form.Check
                          type="checkbox"
                          onChange={() => handleCheckboxChange(website.id)}
                          checked={selectedWebsites.includes(website.id)}
                        />
                      </td>
                      <td>{website.name}</td>
                      <td>
                        <Badge
                          bg={
                            website.status === 'Running'
                              ? 'success'
                              : website.status === 'Stopped'
                              ? 'danger'
                              : 'warning'
                          }
                          className="p-2"
                        >
                          {website.status}
                        </Badge>
                      </td>
                      <td>
                        <a href={website.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          {website.url}
                        </a>
                      </td>
                      <td>{website.cluster}</td>
                      <td>{website.deployTime}</td>
                      <td>{website.visits.toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      No websites found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default WebsiteList;
