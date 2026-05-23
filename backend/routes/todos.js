const express = require('express');
const db = require('../database/init');

const router = express.Router();

// Get all todos
router.get('/', (req, res) => {
  db.all('SELECT * FROM todos ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get single todo by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.json(row);
  });
});

// Create new todo
router.post('/', (req, res) => {
  const { title, description, priority } = req.body;

  if (!title) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }

  db.run(
    'INSERT INTO todos (title, description, priority) VALUES (?, ?, ?)',
    [title, description || '', priority || 'medium'],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.status(201).json({
        id: this.lastID,
        title,
        description: description || '',
        priority: priority || 'medium',
        completed: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  );
});

// Update todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;

  db.run(
    'UPDATE todos SET title = ?, description = ?, priority = ?, completed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description || '', priority || 'medium', completed || 0, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }
      res.json({ message: 'Todo updated successfully' });
    }
  );
});

// Delete todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    res.json({ message: 'Todo deleted successfully' });
  });
});

module.exports = router;
