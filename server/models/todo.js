const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  todoText: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: String,
    default: 'low',
  },
});

module.exports = Todo = mongoose.model('todo', TodoSchema);
