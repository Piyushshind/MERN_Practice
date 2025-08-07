const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json('todos')
};

const createTodo = async (req, res) => {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
};

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await Todo.findByIdAndUpdate(id, res.body, { new: true });
    res.json(updatedTask);
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'todo Deleted' });
};

module.exports = { getTodos, createTodo, deleteTodo, updateTodo };