import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PostModal from "./Addpost";

function CardOfInfo() {
    const [data, setData] = useState([]);
    const cardPerPage = 9;
    const [page, setPage] = useState(1);
    const [showAdd, setShowAdd] = useState(false);

    // For delete modal
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // For edit modal
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const lcData = JSON.parse(localStorage.getItem("cardData"));
        if (Array.isArray(lcData) && lcData.length > 0) {
            setData(lcData);
        } else {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then((res) => res.json())
                .then((data) => {
                    setData(data);
                    localStorage.setItem("cardData", JSON.stringify(data));
                });
        }
    }, []);


    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${deleteId}`, {
            method: "DELETE",
        }).then(() => {
            const updated = data.filter((post) => post.id !== deleteId);
            setData(updated);
            localStorage.setItem("cardData", JSON.stringify(updated));
            setShowDelete(false);
        });
    };

    // ✅ Edit handler
    const handleEdit = (post) => {
        setEditData(post); // send data to modal
    };

    const handleUpdate = (updatedPost) => {
        const updated = data.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
        );
        setData(updated);
        localStorage.setItem("cardData", JSON.stringify(updated));
        setEditData(null); // close modal
    };

    // Pagination slice
    const indexOfLastPost = page * cardPerPage;
    const indexOfFirstPost = indexOfLastPost - cardPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const truncate = (text, maxChars) => {
        if (text.length <= maxChars) return text;
        return text.slice(0, maxChars) + "...";
    };

    return (
        <>
            <div className="row" style={{ gap: "20px", 
                marginBottom:"20px"
            }}>
                {currentPosts.map((post, i) => (
                    <Card key={post.id} style={{ width: "22.4rem",
                        cursor:"pointer"        
                     }}>
                        <Card.Body>
                            <Card.Title title={post.title}>
                                {indexOfFirstPost + i + 1}) {truncate(post.title,16)}
                            </Card.Title>
                            <hr />
                            <Card.Text title={post.body}>{truncate(post.body,100)}</Card.Text>
                        </Card.Body>
                        <div className="d-flex flex-row">
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="btn btn-danger me-2"
                            >
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                            <button
                                onClick={() => handleEdit(post)}
                                className="btn btn-warning"
                            >
                                <i className="bi bi-pencil-fill"></i>
                            </button>
                        </div>
                    </Card>
                ))}
            </div>

            {/*  Delete Confirmation Modal */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header style={{ justifyContent: "space-between" }}>
                    <Modal.Title>Confirm Delete</Modal.Title>
                    <button type="button" className="btn-close" onClick={() => setShowDelete(false)} ></button>

                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {editData && (
                <PostModal
                    show={true}
                    initialData={editData}
                    onClose={() => setEditData(null)}
                    onSave={handleUpdate}
                />
            )}
        </>
    );
}

export default CardOfInfo;
