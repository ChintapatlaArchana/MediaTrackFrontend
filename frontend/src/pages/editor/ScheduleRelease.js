
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { BsCalendarEvent } from "react-icons/bs";
// Import the custom logo component
import {MediaTrackLogo} from "../../MediaTrackLogo"; // Ensure path matches your project structure
import { createAsset, getIdByTitle } from "../../services/contentService";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/contentEditor.css";

const ALL_LANGUAGES = [
  "English", "Spanish", "French", "German", 
  "Italian", "Portuguese", "Japanese", 
  "Korean", "Mandarin", "Hindi"
];

const ScheduleRelease = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titleName: "",
    assetType: "",
    duration: "",
    language: "", 
    availabilityStart: "",
    availabilityEnd: "",
  });

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [subtitleLanguages, setSubtitleLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLanguage = () => {
    if (selectedLanguage && !subtitleLanguages.includes(selectedLanguage)) {
      setSubtitleLanguages([...subtitleLanguages, selectedLanguage]);
      setSelectedLanguage(""); 
    }
  };

  const handleRemoveLanguage = (langToRemove) => {
    setSubtitleLanguages(subtitleLanguages.filter(lang => lang !== langToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const idResponse = await getIdByTitle(formData.titleName);
      const fetchedTitleId = idResponse.data; 

      const payload = {
        titleId: fetchedTitleId,
        assetType: formData.assetType,
        duration: parseInt(formData.duration),
        language: formData.language,
        subtitleLanguages: subtitleLanguages,
        availabilityStart: formData.availabilityStart,
        availabilityEnd: formData.availabilityEnd || null,
      };

      await createAsset(payload);
      alert(`Asset scheduled successfully for title: ${formData.titleName}`);
      navigate("/editor");
    } catch (error) {
      console.error("Error scheduling asset:", error);
      setErrorMsg(error.response?.data || "Failed to find title or schedule asset.");
    } finally {
      setIsLoading(false);
    }
  };

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
          {/* Integrated the custom MediaTrackLogo component */}
          <MediaTrackLogo size={32} gap={12} />
        </div>
      </header>

      <Container className="py-5" style={{ maxWidth: "960px" }}>
        
        <Link to="/editor" className="ce-back-link">
          <FiArrowLeft /> Back to Dashboard
        </Link>
        
        <div className="ce-upload-header">
          <div className="ce-upload-icon-box">
            <BsCalendarEvent />
          </div>
          <div className="ce-upload-titles">
            <h1>Schedule Release</h1>
            <p>Create and schedule asset availability</p>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          
          <Card className="ce-main-form-card mb-4">
            <Card.Body>
              <h2 className="ce-form-section-title">Asset Information</h2>
              
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
              
              <Form.Group className="mb-4" controlId="titleName">
                <Form.Label className="ce-form-label">
                  Title Name<span className="ce-asterisk">*</span>
                </Form.Label>
                <Form.Control 
                  type="text"
                  name="titleName"
                  placeholder="Enter title name to look up ID"
                  value={formData.titleName}
                  onChange={handleChange}
                  required
                  className="ce-form-control ce-form-control-lg mb-1"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="assetType">
                <Form.Label className="ce-form-label">
                  Asset Type<span className="ce-asterisk">*</span>
                </Form.Label>
                <Form.Select 
                  name="assetType"
                  value={formData.assetType}
                  onChange={handleChange}
                  required
                  className="ce-form-control ce-form-control-lg"
                >
                  <option value="">Select asset type</option>
                  <option value="movie">movie</option>
                  <option value="episode">episode</option>
                  <option value="clip">clip</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4" controlId="duration">
                <Form.Label className="ce-form-label">
                  Duration (minutes)<span className="ce-asterisk">*</span>
                </Form.Label>
                <Form.Control 
                  type="number"
                  name="duration"
                  placeholder="e.g., 42"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="ce-form-control ce-form-control-lg"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="language">
                <Form.Label className="ce-form-label">
                  Primary Language<span className="ce-asterisk">*</span>
                </Form.Label>
                <Form.Select 
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  required
                  className="ce-form-control ce-form-control-lg"
                >
                  <option value="">Select primary language</option>
                  {ALL_LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2" controlId="subtitleLanguages">
                <Form.Label className="ce-form-label">
                  Subtitle Languages<span className="ce-asterisk">*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="ce-form-control ce-form-control-lg"
                  >
                    <option value="">Select subtitle language</option>
                    {ALL_LANGUAGES.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </Form.Select>
                  <Button 
                    variant="primary" 
                    onClick={handleAddLanguage}
                    style={{ background: "var(--purple)", borderColor: "var(--purple)", fontWeight: 600, paddingLeft: '20px', paddingRight: '20px' }}
                  >
                    + Add
                  </Button>
                </InputGroup>
              </Form.Group>

              {subtitleLanguages.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {subtitleLanguages.map(lang => (
                    <span 
                      key={lang} 
                      className="badge rounded-pill d-flex align-items-center gap-1"
                      style={{ 
                        background: "rgba(138,43,226,0.15)", 
                        color: "var(--purple-light)",
                        border: "1px solid var(--purple-border)",
                        padding: "8px 14px",
                        fontSize: "0.85rem",
                        fontWeight: 600
                      }}
                    >
                      {lang}
                      <FiX 
                        style={{ cursor: "pointer", fontSize: "1rem" }} 
                        onClick={() => handleRemoveLanguage(lang)}
                      />
                    </span>
                  ))}
                </div>
              )}

            </Card.Body>
          </Card>

          <Card className="ce-form-card mb-4" style={{ background: "transparent !important", border: "1px solid rgba(255,255,255,0.05)" }}>
            <Card.Body>
              <h3 className="ce-form-label mb-4" style={{ fontSize: "1.1rem" }}>Availability Schedule</h3>
              
              <Form.Group className="mb-4" controlId="availabilityStart">
                <Form.Label className="ce-form-label">
                  Start Date<span className="ce-asterisk">*</span>
                </Form.Label>
                <Form.Control 
                  type="date"
                  name="availabilityStart"
                  value={formData.availabilityStart}
                  onChange={handleChange}
                  required
                  className="ce-form-control ce-form-control-lg mb-1"
                />
              </Form.Group>

              <Form.Group className="mb-0" controlId="availabilityEnd">
                <Form.Label className="ce-form-label">
                  End Date
                </Form.Label>
                <Form.Control 
                  type="date"
                  name="availabilityEnd"
                  value={formData.availabilityEnd}
                  onChange={handleChange}
                  className="ce-form-control ce-form-control-lg mb-1"
                />
              </Form.Group>
            </Card.Body>
          </Card>

          <div className="mt-4 mb-5 d-flex justify-content-between align-items-end">
            <div style={{ color: "var(--purple-muted)", fontSize: "0.85rem", fontWeight: 500 }}>
              <span className="ce-asterisk" style={{ marginLeft: 0, marginRight: "4px", color: "var(--purple)" }}>*</span>
              <span style={{ color: "var(--text-muted)" }}>Required fields</span>
            </div>
            <div className="d-flex gap-3">
              <Button 
                type="button" 
                variant="secondary" 
                className="ce-btn-cancel px-4"
                style={{ background: "#222", borderColor: "transparent", color: "#fff" }}
                onClick={() => navigate("/editor")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="ce-btn-save px-4"
                style={{ background: "var(--purple)", borderColor: "var(--purple)" }}
                disabled={isLoading}
              >
                {isLoading ? "Scheduling..." : "Schedule Asset"}
              </Button>
            </div>
          </div>

        </Form>
      </Container>
    </div>
  );
};

export default ScheduleRelease;