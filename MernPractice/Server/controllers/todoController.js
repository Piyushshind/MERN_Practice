const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
};

const createTodo = async (req, res) => {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.status(201).json(newTodo);
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'todo Deleted' });
};

const updateTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedTask = await Todo.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTodos, createTodo, deleteTodo, updateTodo };