"use client";

import { useState, useEffect } from 'react';

const Page = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/tasks/read');
      const data = await res.json();
      setTasks(data.tasks);
    }
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskDelete = async (id) => {
    await fetch(`/api/tasks/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {/* Render tasks and provide delete functionality */}
      {tasks.map(task => (
        <div key={task.id}>
          <span>{task.name}</span>
          <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Page;