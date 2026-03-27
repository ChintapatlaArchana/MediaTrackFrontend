 import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiUpload, FiArrowLeft } from "react-icons/fi";
// Import your custom logo component
import {MediaTrackLogo} from "../MediaTrackLogo"; // Adjust path as needed
// Import your API services
import { createTitle, getAllCategories } from "../../services/contentService"; 

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/contentEditor.css";

const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", 
  "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", 
  "Documentary", "Animation"
];

const UploadContent = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    synopsis: "",
    categoryId: "", 
    rating: "",
    releaseDate: "",
    status: "coming_soon",
    genre: ""
  });
  
  const [categories, setCategories] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data); 
      } catch (error) {
        console.error("Error loading categories:", error);
        setErrorMsg("Failed to load categories from server.");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleGenre = (selectedGenre) => {
    setFormData((prev) => ({
      ...prev,
      genre: prev.genre === selectedGenre ? "" : selectedGenre
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.genre) {
      setErrorMsg("Please select a genre.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    const payload = {
      name: formData.name,
      synopsis: formData.synopsis,
      genre: formData.genre,
      releaseDate: formData.releaseDate,
      rating: formData.rating,
      applicationStatus: formData.status, 
      categoryId: parseInt(formData.categoryId, 10) 
    };

    try {
      await createTitle(payload);
      alert(`Title "${formData.name}" created successfully!`);
      navigate("/editor");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create title.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ce-layout" style={{ display: "block", background: "var(--bg-primary)", minHeight: "100vh", paddingTop: "0" }}>
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
          <div className="ce-upload-icon-box"><FiUpload /></div>
          <div className="ce-upload-titles">
            <h1>Upload Content</h1>
            <p>Create a new title entry</p>
          </div>
        </div>

        <Card className="ce-main-form-card">
          <Card.Body>
            <h2 className="ce-form-section-title">Title Information</h2>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="name">
                <Form.Label className="ce-form-label">Title Name*</Form.Label>
                <Form.Control 
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} required placeholder="Enter title name"
                  className="ce-form-control ce-form-control-lg"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="synopsis">
                <Form.Label className="ce-form-label">Synopsis*</Form.Label>
                <Form.Control 
                  as="textarea" rows={4} name="synopsis" value={formData.synopsis}
                  onChange={handleChange} required placeholder="Enter description..."
                  className="ce-form-control"
                />
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="categoryId">
                    <Form.Label className="ce-form-label">Category*</Form.Label>
                    <Form.Select 
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                      className="ce-form-control ce-form-control-lg"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="rating">
                    <Form.Label className="ce-form-label">Content Rating</Form.Label>
                    <Form.Select 
                      name="rating" value={formData.rating}
                      onChange={handleChange} className="ce-form-control ce-form-control-lg"
                    >
                      <option value="">Select rating</option>
                      <option value="G">G</option>
                      <option value="PG">PG</option>
                      <option value="PG-13">PG-13</option>
                      <option value="R">R</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="ce-form-label">Genre (Select One)*</Form.Label>
                <Row className="mt-2">
                  {GENRES.map((genre) => (
                    <Col md={4} key={genre} className="mb-2">
                      <button
                        type="button"
                        className={`ce-genre-chip btn w-100 ${formData.genre === genre ? "active" : ""}`}
                        onClick={() => toggleGenre(genre)}
                      >
                        {genre}
                      </button>
                    </Col>
                  ))}
                </Row>
              </Form.Group>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="releaseDate">
                    <Form.Label className="ce-form-label">Release Date*</Form.Label>
                    <Form.Control 
                      type="date" name="releaseDate" value={formData.releaseDate}
                      onChange={handleChange} required className="ce-form-control ce-form-control-lg"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="status">
                    <Form.Label className="ce-form-label">Status*</Form.Label>
                    <Form.Select 
                      name="status"
                      value={formData.status}
                      onChange={handleChange} required className="ce-form-control ce-form-control-lg"
                    >
                      <option value="coming_soon">Coming Soon</option>
                      <option value="available">Available</option>
                      <option value="expired">Expired</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="mt-5 d-flex justify-content-end gap-3">
                <Button variant="outline-secondary" onClick={() => navigate("/editor")}>Cancel</Button>
                <Button type="submit" className="ce-btn-save px-4" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Title"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default UploadContent;