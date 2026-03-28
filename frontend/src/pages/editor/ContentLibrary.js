

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Table } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiEye, FiArrowLeft, FiFilm, FiSearch } from "react-icons/fi";

// Import the custom logo component
import {MediaTrackLogo} from "../../MediaTrackLogo"; 
import { getAllTitles } from "../../services/contentService";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/contentEditor.css";

const ContentLibrary = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("available"); 

  const [titles, setTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const response = await getAllTitles();
        // Ensure we are setting an array even if the API returns something else
        setTitles(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching library:", error);
        setErrorMsg("Failed to load library data from the server.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTitles();
  }, []);

  const filteredData = titles.filter((item) => {
    const search = searchTerm.toLowerCase();
    const nameMatch = item?.name?.toLowerCase().includes(search);
    const statusMatch = item?.applicationStatus === statusFilter;
    return nameMatch && statusMatch;
  });

  return (
    <div className="ce-layout" style={{ display: "block", background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "0" }}>
      
      {/* ── Topbar ── */}
      <header className="ce-topbar" style={{ 
        position: "relative",
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "0 2rem"
      }}>
        <span className="ce-topbar-brand">Content Editor</span>
        <div className="ce-topbar-logo">
          <MediaTrackLogo size={32} gap={12} />
        </div>
      </header>

      <Container className="py-5" style={{ maxWidth: "1200px" }}>
        
        {/* ── Navigation ── */}
        <Link to="/editor" className="ce-back-link mb-4 d-inline-flex align-items-center gap-2">
          <FiArrowLeft /> Back to Dashboard
        </Link>

        {/* ── Header Section ── */}
        <div className="ce-upload-header mb-5 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="ce-upload-icon-box me-3">
              <FiFilm />
            </div>
            <div className="ce-upload-titles">
              <h1 className="mb-0">Content Library</h1>
              <p className="text-muted mb-0">
                Browse and manage your media catalog.
              </p>
            </div>
          </div>
          <Button onClick={() => navigate("/editor/upload")} className="ce-btn-save px-4">
            + Add Content
          </Button>
        </div>

        {/* ── Search & Filters ── */}
        <Card className="ce-main-form-card mb-4">
          <Card.Body className="p-4">
            <Row className="g-3">
              <Col md={8}>
                <div className="position-relative">
                  <FiSearch className="position-absolute" style={{ left: "15px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <Form.Control 
                    
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ce-form-control ce-form-control-lg ps-5"
                  />
                </div>
              </Col>
              <Col md={4}>
                <Form.Select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="ce-form-control ce-form-control-lg"
                >
                  <option value="available">available</option>
                  <option value="coming_soon">coming_soon</option>
                  <option value="expired">expired</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ── Data Table ── */}
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3">Loading library...</p>
          </div>
        ) : errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : (
          <div className="table-responsive">
            <Table hover variant="dark" className="ce-library-table align-middle" style={{ background: "#161b22", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr>
                  <th className="py-3 ps-4">Name</th>
                  <th className="py-3">Genre</th>
                  <th className="py-3 text-center">Rating</th>
                  <th className="py-3">Release Date</th>
                  <th className="py-3 text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.titleId}>
                      <td className="fw-bold text-white ps-4">{item.name}</td>
                      <td>{item.genre}</td>
                      <td className="text-center">
                        <span className="badge bg-secondary px-3 py-2" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                          {item.rating || 'NR'}
                        </span>
                      </td>
                      <td>{item.releaseDate}</td>
                      <td className="text-end pe-4">
                        <Button variant="link" className="text-info p-0 me-3" title="View Details"><FiEye size={18} /></Button>
                        <Button variant="link" className="text-warning p-0 me-3" title="Edit Metadata"><FiEdit2 size={18} /></Button>
                        <Button variant="link" className="text-danger p-0" title="Delete Title"><FiTrash2 size={18} /></Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="py-4">
                        <FiFilm size={40} className="text-muted mb-3" />
                        <h5 className="text-white">No items found</h5>
                        <p className="text-muted">No titles match your current search or filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

      </Container>
    </div>
  );
};

export default ContentLibrary;