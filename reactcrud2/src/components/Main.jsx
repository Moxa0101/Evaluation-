import React, { useEffect, useState } from "react";
import Card from "./Card";
import Modal from "./Modal";
import Pagination from "./Pagination";
import DeleteModal from "./DeleteModal";

export default function Main() {
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // for edit
  const [showDelete, setShowDelete] = useState(false); // delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);
  const cardPerPage = 9;

  // Load data
  useEffect(() => {
    const lcData = JSON.parse(localStorage.getItem("cardData"));
    if (Array.isArray(lcData) && lcData.length > 0) {
      setData(lcData);
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((apiData) => {
          setData(apiData);
          localStorage.setItem("cardData", JSON.stringify(apiData));
        });
    }
  }, []);

  // Sync to localStorage
  const updateStorage = (newData) => {
    setData(newData);
    localStorage.setItem("cardData", JSON.stringify(newData));
  };

  // Add post
  const handleAdd = (post) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((newPost) => {
        const updated = [...data, { ...newPost, id: data.length + 1 }]; // push to end
        updateStorage(updated);
        const lastPage = Math.ceil(updated.length / cardPerPage);
        setPage(lastPage); // jump to last page
      });
  };


  // Edit post
  const handleEdit = (updatedPost) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => res.json())
      .then((resPost) => {
        const updated = data.map((item) =>
          item.id === resPost.id ? resPost : item
        );
        updateStorage(updated);
      });
  };

  // Ask delete
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  // Delete post
  const handleDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${deleteId}`, {
      method: "DELETE",
    }).then(() => {
      let updated = data.filter((item) => item.id !== deleteId);
      updated = updated.map((item, index) => ({ ...item, id: index + 1 }));
      updateStorage(updated);
      setShowDelete(false);
      setDeleteId(null);
    });
  };

  // Pagination slice
  const start = (page - 1) * cardPerPage;
  const pagedData = data.slice(start, start + cardPerPage);

  return (
    <div className="container mt-3">
      <Modal
        onAdd={handleAdd}
        onEdit={handleEdit}
        editData={selectedPost}
        setEditData={setSelectedPost}
      />

      <Card
        data={pagedData}
        onDelete={confirmDelete}
        onEdit={(id) => setSelectedPost(data.find((p) => p.id === id))}
      />

      <Pagination
        total={data.length}
        cardPerPage={cardPerPage}
        page={page}
        setPage={setPage}
      />

      <DeleteModal
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        post={data.find((p) => p.id === deleteId)}
      />
    </div>
  );
}
