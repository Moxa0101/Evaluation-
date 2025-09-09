import React, { useState, useEffect } from 'react';
import '../App.css';
import PostModal from './PostModal';
import CardOfInfo from './CardOfInfo';

export default function Crud() {
    const [data, setData] = useState([]);
    const cardPerPage = 9;
    const [page, setPage] = useState(1);

    useEffect(() => {
        const lcData = JSON.parse(localStorage.getItem("cardData"));
        if (Array.isArray(lcData) && lcData.length > 0) {
            setData(lcData);
        } else {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    localStorage.setItem("cardData", JSON.stringify(data))
                })
        }
    }, []);

    return (
        <div className='container'>
            <PostModal data={data} setData={setData} cardPerPage={cardPerPage} setPage={setPage} />
            <CardOfInfo data={data} setData={setData} page={page} setPage={setPage} cardPerPage={cardPerPage} />
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
        </div>
    );
}
