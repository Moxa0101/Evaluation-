import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function PostModal({ data, setData, cardPerPage, setPage, initialData = null, onClose }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ title: "", body: "" });

    useEffect(() => {
        if (initialData) {
            setForm({ title: initialData.title, body: initialData.body });
            setShow(true);
        }
    }, [initialData]);

    const handleClose = () => {
        setShow(false);
        if (onClose) onClose();
    };

    const handleSave = async () => {
        if (!form.title || !form.body) return;

        if (initialData) {
            // Edit / PUT
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, id: initialData.id })
                });
                const updated = await res.json();
                const updatedData = data.map(post => post.id === updated.id ? updated : post);
                setData(updatedData);
                localStorage.setItem("cardData", JSON.stringify(updatedData));
            } catch (err) { console.error("Update failed:", err); }
        } else {
            // Add / POST
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                const newPost = await res.json();
                const newId = data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1;
                const postWithId = { id: newId, ...newPost };
                const updatedData = [...data, postWithId];
                setData(updatedData);
                localStorage.setItem("cardData", JSON.stringify(updatedData));
                setPage(Math.ceil(updatedData.length / cardPerPage));
            } catch (err) { console.error("Add failed:", err); }
        }

        setForm({ title: "", body: "" });
        handleClose();
    };

    return (
        <>
            {!initialData && (
                <div style={{ margin: "10px", display: "flex", justifyContent: "center" }}>
                    <Button variant="primary" onClick={() => setShow(true)}>Add Post</Button>
                </div>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title >Add Post</Modal.Title>
                    <button type="button" className="btn-close" onClick={handleClose}></button>
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
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PostModal;
