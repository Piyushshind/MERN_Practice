const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
}, { timeStamps: true }
);

module.exports = mongoose.model('Todo',todoSchema);