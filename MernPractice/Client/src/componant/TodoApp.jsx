import React, { useState, useEffect } from "react";

// ✅ Reusable component-based, production-quality approach
export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage (if available)
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // 🧠 Persist todos automatically
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Add or Update Todo
  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (editId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: trimmed } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: crypto.randomUUID(), // modern, unique ID
        text: trimmed,
        done: false,
      };
      setTodos((prev) => [...prev, newTodo]);
    }
    setInput("");
  };

  // ✅ Delete Todo
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // ✅ Edit Todo
  const handleEdit = (id) => {
    const t = todos.find((todo) => todo.id === id);
    setInput(t.text);
    setEditId(id);
  };

  // ✅ Toggle Complete
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // ✅ Keyboard Shortcut (Enter)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 To-Do List</h2>

      <div style={styles.inputGroup}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.addBtn}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleComplete(todo.id)}
            />
            <span
              style={{
                ...styles.text,
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#999" : "#222",
              }}
            >
              {todo.text}
            </span>

            <div style={styles.actions}>
              <button onClick={() => handleEdit(todo.id)} style={styles.btnEdit}>
                ✏️
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                style={styles.btnDelete}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 💅 Inline Styles (for simplicity)
const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fafafa",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
  },
  inputGroup: {
    display: "flex",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "8px",
    fontSize: "1rem",
  },
  addBtn: {
    padding: "8px 12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    border: "1px solid #eee",
    padding: "8px 10px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  text: {
    flex: 1,
    marginLeft: "8px",
  },
  actions: {
    display: "flex",
    gap: "6px",
  },
  btnEdit: {
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },
  btnDelete: {
    cursor: "pointer",
    border: "none",
    background: "transparent",
  },
};
