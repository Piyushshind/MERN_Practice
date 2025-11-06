import React, { useState } from "react";

export default function PaginationExample() {
  const data = Array.from({ length: 42 }, (_, i) => `Item ${i + 1}`); // dummy data
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // calculate slice indexes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div style={styles.container}>
      <h2>📄 Pagination Example</h2>

      {currentItems.map((item) => (
        <p key={item}>{item}</p>
      ))}

      <div style={styles.pagination}>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          ⬅ Prev
        </button>

        {/* page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            style={{
              ...styles.pageBtn,
              background: num === currentPage ? "#007bff" : "#fff",
              color: num === currentPage ? "#fff" : "#000",
            }}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", fontFamily: "sans-serif", marginTop: "40px" },
  pagination: { display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" },
  pageBtn: {
    padding: "6px 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
