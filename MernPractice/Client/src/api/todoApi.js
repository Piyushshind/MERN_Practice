import axios from "axios";

const BASE_URL = "http://localhost:5000/api/todos";

export const getTodos = () => axios.get(BASE_URL);
export const addTodo = (todo) => axios.post(BASE_URL, todo);
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateTodo = (id, updatedTodo) =>
    axios.put(`${BASE_URL}/${id}`, updatedTodo);
