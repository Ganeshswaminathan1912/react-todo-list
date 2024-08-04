const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();
    const port = process.env.PORT || 5000;

    app.use(bodyParser.json());
    app.use(cors());

    // MongoDB connection (replace with your database URI)
    mongoose.connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.error('Could not connect to MongoDB:', err));

    // Define Todo schema
    const todoSchema = new mongoose.Schema({
      task: { type: String, required: true },
      completed: { type: Boolean, default: false },
    });

    const Todo = mongoose.model('Todo', todoSchema);

    // API routes
    app.get('/api/todos', async (req, res) => { 
      const todos = await Todo.find();
      res.json(todos);
    });

    app.post('/api/todos', async (req, res) => {
      const newTodo = new Todo(req.body);
      await newTodo.save();
      res.json(newTodo);
    });

    app.put('/api/todos/:id', async (req, res) => {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTodo);
    });

    app.delete('/api/todos/:id', async (req, res) => {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted!' });
    });

    app.listen(port, () => console.log(`Server running on port ${port}`));