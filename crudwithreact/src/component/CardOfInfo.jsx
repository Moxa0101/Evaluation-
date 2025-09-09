import Card from "react-bootstrap/Card";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PostModal from "./PostModal";

function CardOfInfo({ data, setData, page, setPage, cardPerPage }) {
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [editData, setEditData] = useState(null);

    const indexOfLastPost = page * cardPerPage;
    const indexOfFirstPost = indexOfLastPost - cardPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const truncate = (text, maxChars) => text.length <= maxChars ? text : text.slice(0, maxChars) + "...";

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = async () => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${deleteId}`, { method: "DELETE" });
            const updated = data.filter(post => post.id !== deleteId);
            setData(updated);
            localStorage.setItem("cardData", JSON.stringify(updated));
            const lastPage = Math.max(1, Math.ceil(updated.length / cardPerPage));
            if (page > lastPage) setPage(lastPage);
            setShowDelete(false);
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <>
            <div className="row" style={{ gap: "20px", marginBottom: "20px" }}>
                {currentPosts.map((post, i) => (
                    <Card key={post.id} style={{ width: "22.4rem", cursor: "pointer" }}>
                        <Card.Body>
                            <Card.Title title={post.title}>{indexOfFirstPost + i + 1}) {truncate(post.title, 16)}</Card.Title>
                            <hr />
                            <Card.Text title={post.body}>{truncate(post.body, 100)}</Card.Text>
                        </Card.Body>
                        <div className="d-flex flex-row ml-20" >
                            <button onClick={() => handleDelete(post.id)} className="btn btn-danger me-2">
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                            <button onClick={() => setEditData(post)} className="btn btn-warning">
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header>
                    <Modal.Title>Confirm Delete</Modal.Title>
                    <button type="button" className="btn-close" onClick={() => setShowDelete(false)}></button>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            {editData && <PostModal data={data} setData={setData} cardPerPage={cardPerPage} setPage={setPage} initialData={editData} onClose={() => setEditData(null)} />}
        </>
    );
}

export default CardOfInfo;
