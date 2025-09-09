import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import '../App.css';

function PostModal({ onAdd }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ title: "", body: "" });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        if (form.title && form.body) {
            onAdd(form);
            setForm({ title: "", body: "" });
            handleClose();
        }
    };

    return (
        <>
            <div style={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",

            }}>
            <Button variant="primary" onClick={handleShow} >
                Add Post
            </Button>
        </div >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{justifyContent:"space-between"}}>
                    <Modal.Title>Add Post</Modal.Title>
                    <button type="button" className="btn-close" onClick={() => handleClose(false)} ></button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={form.body}
                                onChange={(e) => setForm({ ...form, body: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostModal;
