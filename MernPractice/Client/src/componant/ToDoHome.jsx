import React, { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../api/todoApi';

const ToDoHome = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (!task) return;
    await addTodo({ task, completed: false });
    setTask('');
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleToggleComplete = async (todo) => {
    await updateTodo(todo._id, { ...todo, completed: !todo.completed });
    loadTodos();
  };

  return (
    <div>
      <h2>Todo App</h2>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="New Task" />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button onClick={() => handleToggleComplete(todo)}>Toggle</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoHome;
