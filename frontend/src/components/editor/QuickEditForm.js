import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getIdByTitle, getTitleById, updateQuickTitle } from "../../services/contentService";

const genres = [
  "Action", "Adventure", "Sci-Fi", "Drama", "Documentary",
  "Thriller", "Comedy", "Horror", "Romance", "Animation",
];

const statuses = ["coming_soon", "available", "expired"];

const QuickEditForm = () => {
  const { titleId: urlTitleId } = useParams();
  const navigate = useNavigate();

  // 1. ALIGN STATE: Use 'name' to match your Backend Entity/DTO
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    applicationStatus: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {

    const fetchTitle = async () => {
      try {
        const res = await getTitleById(urlTitleId);
        console.log(res.data);
        const data = res.data;

        // Map incoming data to state
        setFormData({
          name: data.name ,
          genre: data.genre ,
          applicationStatus: data.applicationStatus || "coming_soon",
        });
      } catch (err) {
        console.error("Fetch error:", err);
        //setErrorMsg("Failed to load title details");
      } finally {
        setLoading(false);
      }
    };

    fetchTitle();
  }, [urlTitleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg("");

    try {
      // 2. PAYLOAD: Send the formData which now has 'name'
      // This matches what your backend expects in the TitleRequestDTO
      const idResponse = await getIdByTitle(formData.name);
      console.log(idResponse);
      const targetId = idResponse.data;
      if (!targetId) {
        throw new Error("No record found with that title name.");
      }
      await updateQuickTitle(targetId, formData);
      alert("Title updated successfully ");
      navigate(-1);
    } catch (err) {
      console.error("Update error:", err);
      setErrorMsg(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading title data...</div>;

  return (
    <Card className="ce-form-card shadow-sm">
      <Card.Body>
        <h3 className="mb-4">Quick Edit Title</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <Form onSubmit={handleSave}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Content Title</Form.Label>
                <Form.Control
                  name="name" // Changed from 'title' to 'name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                >
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Application Status</Form.Label>
            <Form.Select
              name="applicationStatus"
              value={formData.applicationStatus}
              onChange={handleChange}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-3">
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuickEditForm;