import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function PostModal({ onAdd, onEdit, editData, setEditData }) {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title: "", body: "" });

  useEffect(() => {
    if (editData) {
      setForm(editData);
      setShow(true);
    }
  }, [editData]);

  const handleClose = () => {
    setShow(false);
    setForm({ title: "", body: "" });
    setEditData(null);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.title || !form.body) return alert("Fill all fields");
    if (editData) {
      onEdit(form);
    } else {
      onAdd(form);
    }
    handleClose();
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <Button className="mb-3" onClick={() => setShow(true)}>
          Add Post
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit Post" : "Add Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Title..."
                value={form.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="body"
                placeholder="Enter Description..."
                rows={3}
                value={form.body}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editData ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
