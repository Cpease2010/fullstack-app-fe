import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const fullstack_app_be_url = process.env.REACT_APP_FULLSTACK_APP_BE_URL

  // Fetch tasks from the Python API
  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: tasks.length + 1, task }]);
    setTask("");
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${fullstack_app_be_url}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const removeTask = (id) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  };

  const createTask = async () => {
    const response = await fetch(`${fullstack_app_be_url}/tasks`, {
      body: JSON.stringify(tasks),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log("Post attempted!", {response})
  }

  const deleteTask = async () => {
    const response = await fetch(`${fullstack_app_be_url}/tasks`, {
      body: JSON.stringify(tasks),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    console.log("Delete attempted!", {response})
  }

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        placeholder="Enter a task..."
        onChange={(e) => setTask(e.target.value)}
        style={{
          padding: "10px",
          width: "calc(100% - 22px)",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={addTask}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
      <button
        onClick={createTask}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Create Task
      </button>
      <button
        onClick={deleteTask}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Delete Task
      </button>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {t.task}
            <button
              onClick={() => removeTask(t.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
