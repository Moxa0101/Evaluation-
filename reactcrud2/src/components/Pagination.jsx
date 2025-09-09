import React from "react";

function Pagination({ total, cardPerPage, page, setPage }) {
  const totalPages = Math.ceil(total / cardPerPage);

  return (
    <div className="d-flex justify-content-center mt-3">
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
        style={{
          padding: "5px 10px",
          borderRadius: "8px",
          border: "1px solid black",
        }}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx + 1)}
          style={{
            margin: "5px",
            background: page === idx + 1 ? "blue" : "white",
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
          padding: "5px 10px",
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
