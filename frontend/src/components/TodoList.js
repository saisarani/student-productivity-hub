import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'medium' });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch todos from API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    try {
      const response = await axios.post('/api/todos', newTodo);
      setTodos([response.data, ...todos]);
      setNewTodo({ title: '', description: '', priority: 'medium' });
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo');
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: todo.completed ? 0 : 1 };
      await axios.put(`/api/todos/${todo.id}`, updatedTodo);
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/todos/${id}`);
        setTodos(todos.filter((t) => t.id !== id));
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className="todo-container">
      <h1>📝 My Tasks</h1>

      {/* Add Todo Form */}
      <form className="todo-form" onSubmit={handleAddTodo}>
        <div className="form-group">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="input-title"
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="Add description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="input-description"
          />

          <select
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
            className="input-priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button type="submit" className="btn-add">Add Task</button>
        </div>
      </form>

      {/* Todo List */}
      <div className="todo-list">
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="empty">No tasks yet. Add one to get started! 🎯</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              style={{ borderLeftColor: getPriorityColor(todo.priority) }}
            >
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  className="todo-checkbox"
                />
                <div className="todo-text">
                  <h3 className={todo.completed ? 'strikethrough' : ''}>{todo.title}</h3>
                  {todo.description && <p className="description">{todo.description}</p>}
                  <span className="priority-badge" style={{ backgroundColor: getPriorityColor(todo.priority) }}>
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                  </span>
                </div>
              </div>

              <button
                className="btn-delete"
                onClick={() => handleDeleteTodo(todo.id)}
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className="todo-stats">
          <p>✅ Completed: {todos.filter((t) => t.completed).length}/{todos.length}</p>
          <p>⏳ Remaining: {todos.filter((t) => !t.completed).length}</p>
        </div>
      )}
    </div>
  );
}

export default TodoList;
