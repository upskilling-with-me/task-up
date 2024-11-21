import React, { useState, useEffect, useRef, createContext, useContext, Suspense } from 'react';
import './App.css';


// Context for Theme
const ThemeContext = createContext();

function App() {
  // State to manage tasks and theme
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [theme, setTheme] = useState('light');

  // Reference for input focus
  const inputRef = useRef(null);

  // Effect to load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Effect to save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toggle theme
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Add a new task
  const addTask = (description, priority) => {
    if (!description.trim()) return;
    const newTask = {
      id: Date.now(),
      description,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Update task status
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}`}>
        <Header />
        <TaskInput onAddTask={addTask} inputRef={inputRef} />
        <TaskList
          tasks={filteredTasks}
          onToggleCompletion={toggleTaskCompletion}
          onDeleteTask={deleteTask}
        />
        <Filters currentFilter={filter} onFilterChange={setFilter} />
        <Suspense fallback={<div>Loading Help...</div>}>
          <HelpModal />
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
}

// Header Component
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <h1>Task Manager</h1>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </header>
  );
}

// Task Input Component
function TaskInput({ onAddTask, inputRef }) {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(description, priority);
    setDescription('');
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

// Task List Component
function TaskList({ tasks, onToggleCompletion, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompletion={onToggleCompletion}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

// Task Item Component
function TaskItem({ task, onToggleCompletion, onDeleteTask }) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleCompletion(task.id)}
      />
      <span>{task.description}</span>
      <span className="priority">{task.priority}</span>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
}

// Filters Component
function Filters({ currentFilter, onFilterChange }) {
  const filters = ['All', 'Pending', 'Completed'];
  return (
    <div className="filters">
      {filters.map(filter => (
        <button
          key={filter}
          className={filter === currentFilter ? 'active' : ''}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

// Help Modal Component (Lazy Loaded)
const HelpModal = React.lazy(() => Promise.resolve({
  default: function HelpModal() {
    return (
      <div className="help-modal">
        <h2>Help</h2>
        <p>Manage your tasks efficiently with this app.</p>
      </div>
    );
  }
}));

export default App;
