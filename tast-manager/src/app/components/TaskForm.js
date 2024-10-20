// app/components/TaskForm.js
'use client';
import { useState } from 'react';

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');

  async function addTask(e) {
    e.preventDefault();
    const res = await fetch('/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });
    const newTask = await res.json();
    onTaskAdded(newTask);
    setTitle('');
  }

  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
