// // import React, { useState, useEffect } from "react";
// // import { Card } from "react-bootstrap";


// //     export default function ApiCRUD() {
// //     const [data, setData] = useState([]);
// //     const [error, setError] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [showForm, setShowForm] = useState(false);
// //     const [submission, setSubmissions] = useState({ title: "", body: "" });
// //     const itemPerPage = 10;
// //     let totalPages = 10;

// //     const handleFormSubmit = (data) => {
// //         setSubmissions = (prev => [...prev, data]);
// //         setShowForm(false);
// //     }


// //     useEffect(() => {
// //         fetch("https://jsonplaceholder.typicode.com/posts")
// //             .then(res => res.json())
// //             .then((data) => {
// //                 setData(data);
// //                 setLoading(false);
// //             })
// //             .catch(err => {
// //                 setError(err);
// //                 setLoading(false);
// //             })
// //     }, []);


// // const addPost=()=>{

// // }

// //     if (loading) return <p>Loading...</p>;
// //     if (error) return <p>Error occured!</p>;

// //     return (
// //         <div className="container">
// //             <form onSubmit={addPost}>
// //                 <input type="text"
// //                 placeholder="Enter title" value={form.title}></input>
// //             </form>
// //             <div className="row" style={{ gap: "20px" }}>
// //                 {data.map((post) => (
// //                     <div className="card" style={{ width: '20rem' }}>
// //                         <div className="card-body">
// //                             <div key={post.id} style={{ marginBottom: "1rem" }}>
// //                                 <div className="card-title">{post.id} {post.title}</div>
// //                                 <p>{post.body}</p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // };

// import React, { useEffect, useState } from "react";
// import "../App.css"

// export default function Posts() {
//     const [posts, setPosts] = useState([]);
//     const [page, setPage] = useState(1);
//     const postsPerPage = 10;
//     const [form, setForm] = useState({ title: "", body: "" });
//     const [editId, setEditId] = useState(null);
//     const [showForm, setShowForm] = useState(false);

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/posts")
//             .then(res => res.json())
//             .then(data => setPosts(data));
//     }, []);

//     // Add or Update Post
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (editId) {
//             const updated = posts.map(p =>
//                 p.id === editId ? { ...p, title: form.title, body: form.body } : p
//             );
//             setPosts(updated);
//             setEditId(null);
//         } else {
//             // POST - add
//             const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
//             const newPost = { id: newId, title: form.title, body: form.body };
//             setPosts([...posts, newPost]);
//             const lastPage = Math.ceil((posts.length + 1) / postsPerPage);
//             setPage(lastPage);
//         }
//         setForm({ title: "", body: "" });
//         setShowForm(false);
//     };

//     // DELETE
//     const deletePost = (id) => {
//         const updated = posts.filter(p => p.id !== id);
//         setPosts(updated);
//         const lastPage = Math.max(1, Math.ceil(updated.length / postsPerPage));
//         if (page > lastPage) setPage(lastPage);
//     };

//     // EDIT - populate form
//     const editPost = (post) => {
//         setForm({ title: post.title, body: post.body });
//         setEditId(post.id);
//         setShowForm(true);
//     };

//     // Pagination
//     const indexOfLastPost = page * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//     return (
//         <div className="container">
//             <div className='d-flex justify-content-center align-items-center mt-5'>
//                 <button className='btn btn-primary' onClick={() => setShowForm(!showForm)}>
//                     {showForm ? 'Hide Form' : 'Show Form'}
//                 </button>
//             </div>

//             {/* Form */}
//             {showForm &&
//                 <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//                     <input
//                         type="text"
//                         placeholder="Title"
//                         value={form.title}
//                         onChange={(e) => setForm({ ...form, title: e.target.value })}
//                         required
//                     />
//                     <input
//                         className="ml-2"
//                         type="text"
//                         placeholder="Body"
//                         value={form.body}
//                         onChange={(e) => setForm({ ...form, body: e.target.value })}
//                         required
//                     />
//                     <button type="submit" className="btn btn-success ml-2">{editId ? "Update Post" : "Add Post"}</button>
//                 </form>}

//             {/* Cards */}
//             <div className="row">
//                 {currentPosts.map((post, i) => (
//                     <div key={post.id} className="card" style={{ margin: "10px", padding: "10px", width: '20rem' }}>
//                         <h5>{indexOfFirstPost + i + 1} {post.title}</h5>
//                         <p>{post.body}</p>
//                         <div className="d-flex flex-row">
//                             <button onClick={() => editPost(post)} className="btn btn-warning">Edit</button>
//                             <button onClick={() => deletePost(post.id)} className="btn btn-danger ml-2">Delete</button></div>
//                     </div>
//                 ))}
//             </div>
//             {/* Pagination */}
//             <div>
//                 <button onClick={() => {setPage(prev => prev - 1)}} disabled={page === 1}>Prev</button>
//                 {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, idx) => (
//                     <button
//                         key={idx}
//                         onClick={() => setPage(idx + 1)}
//                         style={{
//                             margin: "5px",
//                             background: page === idx + 1 ? "blue" : "white",
//                             color: page === idx + 1 ? "white" : "black",
//                             border: "1px solid black",
//                             borderRadius: "8px",
//                             padding: "10px",
//                         }}>
//                         {idx + 1}
//                     </button>
//                 ))}
//                 <button onClick={()=>{setPage(prev => prev +1)}} disabled={page ===  Math.ceil(posts.length / postsPerPage)}>Next</button>
//             </div>
//         </div>
//     );
// }
