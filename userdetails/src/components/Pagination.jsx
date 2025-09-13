import React from "react";

function Pagination({ total, cardPerPage, page, setPage }) {
    const totalPages = Math.ceil(total / cardPerPage);

    return (
        <div className="d-flex justify-content-center ">
            <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                style={{
                    padding: "0px 10px 0px 10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                }}
            >
                Prev
            </button>


            {totalPages > 0 &&
                [...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setPage(idx + 1)}
                        style={{
                            margin: "5px",
                            background: page === idx + 1 ? " linear-gradient(135deg, #4f46e5, #7c3aed)" : "white",
                            color: page === idx + 1 ? "white" : "black",
                            border: "1px solid black",
                            borderRadius: "8px",
                            padding: "5px 10px",
                        }}
                    >
                        {idx + 1}
                    </button>
                ))}


            <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
                style={{
                    padding: "0px 10px 0px 10px",
                    borderRadius: "8px",
                    border: "1px solid black",
                }}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
