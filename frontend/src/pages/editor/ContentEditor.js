
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FiUpload,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiChevronRight,
  FiStar,
} from "react-icons/fi";
import { BsCalendar3, BsFilm } from "react-icons/bs";

// Import the custom logo component
import {MediaTrackLogo} from "../../MediaTrackLogo"; // Ensure this path is correct

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/contentEditor.css";

import Sidebar from "../../components/editor/Sidebar";
import QuickEditForm from "../../components/editor/QuickEditForm";
import { uploadsData, uploadStats } from "../../components/data/uploadsData";
import { getQCStatus } from "../../services/contentService";

/* ---------------------------------------------------------- */
/* Helper: status badge                                        */
/* ---------------------------------------------------------- */
const StatusBadge = ({ status }) => {
  const map = {
    Available: { cls: "ce-badge-available", icon: <FiCheckCircle size={10} />, label: "AVAILABLE" },
    "Coming Soon": { cls: "ce-badge-coming", icon: <FiClock size={10} />, label: "COMING SOON" },
    Expired: { cls: "ce-badge-expired", icon: <FiXCircle size={10} />, label: "EXPIRED" },
  };
  const b = map[status] || map["Available"];
  return (
    <span className={`ce-status-badge ${b.cls}`}>
      {b.icon} {b.label}
    </span>
  );
};

/* ---------------------------------------------------------- */
/* ContentEditor page                                          */
/* ---------------------------------------------------------- */
const ContentEditor = () => {
  const [activeSection, setActiveSection] = useState("action-cards");
  const [qcStats, setQcStats] = useState({ passed: 0, pending: 0, failed: 0 });
  const [isLoadingQc, setIsLoadingQc] = useState(false);
  const [qcError, setQcError] = useState(null);

  useEffect(() => {
    const fetchQcStats = async () => {
      setIsLoadingQc(true);
      setQcError(null);
      try {
        const response = await getQCStatus();
        setQcStats({
          passed: response.data.passed || 0,
          pending: response.data.pending || 0,
          failed: response.data.failed || 0,
        });
      } catch (error) {
        console.error("Error fetching QC Stats:", error);
        setQcError("Failed to fetch QC statistics.");
      } finally {
        setIsLoadingQc(false);
      }
    };
    fetchQcStats();
  }, []);

  // Section refs for smooth scroll
  const sectionRefs = {
    "action-cards": useRef(null),
    "qc-overview": useRef(null),
    "recent-uploads": useRef(null),
    "quick-edit": useRef(null),
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    const el = sectionRefs[id]?.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="ce-layout">
      {/* ── Topbar ── */}
      <header className="ce-topbar" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "0 2rem" 
      }}>
        <span className="ce-topbar-brand">Content Editor</span>
        <div className="ce-topbar-logo">
          {/* Replaced the old logo markup with the custom component */}
          <MediaTrackLogo size={32} gap={12} />
        </div>
      </header>

      {/* ── Sidebar ── */}
      <Sidebar activeSection={activeSection} onNavClick={handleNavClick} />

      {/* ── Main ── */}
      <main className="ce-main">
        <Container fluid className="p-0">

          {/* ===================== ACTION CARDS ===================== */}
          <section id="action-cards" ref={sectionRefs["action-cards"]} className="ce-section">
            <Row className="g-3">
              {/* Upload Content */}
              <Col lg={4} md={6}>
                <Link to="/editor/upload" style={{ textDecoration: 'none' }}>
                  <Card className="ce-action-card h-100">
                    <Card.Body className="p-4">
                      <div className="card-icon"><FiUpload /></div>
                      <div className="card-title-text">Upload Content</div>
                      <div className="card-desc">Add new media files to your library</div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>

              {/* Schedule Release */}
              <Col lg={4} md={6}>
                <Link to="/editor/schedule" style={{ textDecoration: 'none' }}>
                  <Card className="ce-action-card h-100">
                    <Card.Body className="p-4">
                      <div className="card-icon"><BsCalendar3 /></div>
                      <div className="card-title-text">Schedule Release</div>
                      <div className="card-desc">Plan content deployment timeline</div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>

              {/* Manage Library */}
              <Col lg={4} md={6}>
                <Link to="/editor/library" style={{ textDecoration: 'none' }}>
                  <Card className="ce-action-card h-100">
                    <Card.Body className="p-4">
                      <div className="card-icon"><BsFilm /></div>
                      <div className="card-title-text">Manage Library</div>
                      <div className="card-desc">Browse your media catalog</div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          </section>

          {/* ===================== QC STATUS ===================== */}
          <section id="qc-overview" ref={sectionRefs["qc-overview"]} className="ce-section">
            <div className="ce-section-header ce-mb-20">
              <div className="ce-section-title">
                <FiCheckCircle className="title-icon" />
                QC Status Overview
              </div>
            </div>

            <Row className="g-3">
              {isLoadingQc ? (
                <div className="text-center my-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : qcError ? (
                <Alert variant="danger">{qcError}</Alert>
              ) : (
                <>
                  <Col lg={4} md={6}>
                    <Card className="ce-qc-card passed h-100">
                      <Card.Body className="p-4">
                        <div className="qc-icon"><FiCheckCircle /></div>
                        <div className="ce-qc-number">{qcStats.passed}</div>
                        <div className="ce-qc-label">Passed</div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col lg={4} md={6}>
                    <Card className="ce-qc-card pending h-100">
                      <Card.Body className="p-4">
                        <div className="qc-icon"><FiClock /></div>
                        <div className="ce-qc-number">{qcStats.pending}</div>
                        <div className="ce-qc-label">Pending</div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col lg={4} md={6}>
                    <Card className="ce-qc-card failed h-100">
                      <Card.Body className="p-4">
                        <div className="qc-icon"><FiXCircle /></div>
                        <div className="ce-qc-number">{qcStats.failed}</div>
                        <div className="ce-qc-label">Failed</div>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </section>

          {/* ===================== QUICK EDIT FORM ===================== */}
          <section id="quick-edit" ref={sectionRefs["quick-edit"]} className="ce-section">
            <div className="ce-section-header ce-mb-20">
              <div className="ce-section-title">
                <FiStar className="title-icon" />
                Quick Metadata Edit
              </div>
            </div>

            <QuickEditForm onCancel={() => handleNavClick("action-cards")} />
          </section>

        </Container>
      </main>
    </div>
  );
};

export default ContentEditor;