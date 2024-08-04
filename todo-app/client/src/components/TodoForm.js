import React, { useState } from 'react';
    import axios from 'axios';

    const TodoForm = ({ getTodos }) => {
      const [task, setTask] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (task.trim() !== "") { // Don't allow empty tasks
          try {
            await axios.post('/api/todos', { task });
            setTask(''); 
            getTodos();
          } catch (err) {
            console.error('Error adding todo:', err);
          }
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Add a new todo" 
            value={task} 
            onChange={e => setTask(e.target.value)} 
          />
          <button type="submit">Add Todo</button>
        </form>
      );
    };

    export default TodoForm;