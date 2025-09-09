import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({ show, onClose, onConfirm, post }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {post ? (
          <>
            Do you really want to delete this post?
            <br />
            <strong>{post.title}</strong>
          </>
        ) : (
          "Do you really want to delete this post?"
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
