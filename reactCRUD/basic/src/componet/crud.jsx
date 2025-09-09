import React, { useState, useEffect } from 'react';
import '../App.css'

export default function Crud() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: "", body: "" });
    const [editId, setEditId] = useState(null);
    const [data, setData] = useState([]);
    const cardPerPage = 10;
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(null);

    useEffect(() => {
        const lcData = JSON.parse(localStorage.getItem("cardData"));
        if (Array.isArray(lcData) && lcData.length > 0) {
            setData(lcData);
        }
        else {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    localStorage.setItem("cardData", JSON.stringify(data))
                }
                )
        }
    }, []);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };
    const handleSubmit = (e) => {
        e.preventDefault();


        if (editId) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
                method: "PUT",
                headers: { 'Content-type': 'application/json; charset=UTF-8', },
                body: JSON.stringify({ ...form, id: editId })
            })
                // .then(res => {
                //     console.log("PUT called:", res.status);
                //     return res.json();
                // })
                .then(res => res.json())
                .then(updated => {
                    const newData = data.map(data => (data.id === editId ? updated : data));
                    setData(newData)
                    setForm({ title: "", body: "" });
                    setEditId(null);
                    localStorage.setItem("cardData", JSON.stringify(newData))
                })
        }
        else {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { 'Content-type': 'application/json; charset=UTF-8', },
                body: JSON.stringify(form),
            })
                .then(res => res.json())
            // .then(res => {
            //     console.log("POST called:", res.status)
            //     return res.json();
            // })
            const newId = data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1;
            const newPost = { id: newId, title: form.title, body: form.body };
            const newData = [...data, newPost];
            setData(newData);
            const lastPage = Math.ceil((data.length + 1) / cardPerPage);
            setPage(lastPage);
            setForm({ title: "", body: "" });
            localStorage.setItem("cardData", JSON.stringify(newData));
        }
    };
    const indexOfLastPost = page * cardPerPage;
    const indexOfFirstPost = indexOfLastPost - cardPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
    const handleDelete = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: "DELETE"
            });
            const confirmed = window.confirm("Are you sure you want to delete this??")
            if (confirmed) {
                const updatedData = data.filter(post => post.id !== id);
                    const lastPage = Math.max(1, Math.ceil(updatedData.length / cardPerPage));
                    if (page > lastPage) setPage(lastPage);
                    localStorage.setItem("cardData", JSON.stringify(updatedData))
                    setData(updatedData);
            }
            

        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const truncate = (text, maxChars) => {
        if (text.length <= maxChars) return text;
        return text.slice(0, maxChars) + "...";
    };
    // const handleDelete = (id) => {
    //     fetch("https://jsonplaceholder.typicode.com/posts", {
    //         method: "DELETE"
    //     })
    //         .then(() => setData(data.filter(data => data.id !== id)));
    // };

    return (
        <div className='container'>
            <button className="btn btn-primary mb-2 mt-3" onClick={() => setShowForm(!showForm)}>{showForm ? "Hide" : "Show"}</button>
            {showForm &&
                <form onSubmit={handleSubmit} className='mb-4'>
                    <input type='text'
                        name='title'
                        placeholder='Enter title'
                        onChange={handleChange}
                        value={form.title}
                        className='form-control mb-2'
                        required />
                    <textarea
                        title='body'
                        placeholder='Enter Description'
                        value={form.body}
                        onChange={(e) => {
                            setForm({ ...form, body: e.target.value })
                        }}
                        className='form-control mb-2'
                        required />

                    <button className='btn-submit' onClick={handleSubmit}>Submit</button>
                    <button className='btn-reset' type='button' onClick={() => { setForm({ title: "", body: "" }) }}>Reset</button>
                </form>

            }

            <div className='row'>
                {currentPosts.map((post, i) => (
                    <div key={post.id} className='col-md-4 col-sm-12'>
                        <div className='card mb-4' >
                            <div className='card-title' title={post.title} onClick={() => { setShowModal(post) }}><h3>{indexOfFirstPost + i + 1} {truncate(post.title, 16)}</h3></div>
                            <hr></hr>
                            <div className='card-body' title={post.body} onClick={() => { setShowModal(post) }}>{truncate(post.body, 100)}</div>
                            <div className='d-flex flex-row'>
                                <button onClick={() => handleDelete(post.id)} className='btn-delete'>Delete</button>
                                <button onClick={() => {
                                    setForm({ title: post.title, body: post.body });
                                    setEditId(post.id);
                                    setShowForm(true);
                                }} className='btn-edit'>Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => { setPage(prev => prev - 1) }} disabled={page === 1}
                    style={{
                        padding: '5px',
                        borderRadius: "8px",
                        border: "none",
                    }}
                >Prev</button>
                {Array.from({ length: Math.ceil(data.length / cardPerPage) }, (_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setPage(idx + 1)}
                        style={{
                            margin: "5px",
                            background: page === idx + 1 ? "blue" : "white",
                            color: page === idx + 1 ? "white" : "black",
                            border: "1px solid black",
                            borderRadius: "8px",
                            padding: "10px",
                        }}>
                        {idx + 1}
                    </button>
                ))}
                <button onClick={() => { setPage(prev => prev + 1) }} disabled={page === Math.ceil(data.length / cardPerPage)}
                    style={{
                        padding: '5px',
                        borderRadius: "8px",
                        border: "none"
                    }}>Next</button>
            </div>
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={() => setShowModal(null)}
                >
                    <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{showModal.title}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(null)} ></button>
                            </div>
                            <div className="modal-body">
                                <p>{showModal.body}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )






}
