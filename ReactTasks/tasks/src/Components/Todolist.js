import React, { useState,useEffect } from 'react';
import '../assets/Todolist.css';

export default function Todolist() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTodo, setShowTodo] = useState(false); 
   
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const handleAdd = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), completed: false }]);
      setInput('');
      setShowTodo(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const toggleCheck = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTodo = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        <button className='todobutton' onClick={() => setShowTodo(!showTodo)}>
          {showTodo ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showTodo && (
        <div className='ctn'>
          <input
            type="text"
            placeholder="Enter task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className='todobutton' onClick={handleAdd}>Enter</button>
        </div>
      )}

      <p>My tasks:</p>

      {tasks.map((task, index) => (
        <div key={index} className='ctn1 custom-ctn d-flex justify-content-between'>
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCheck(index)}
            />
            <span className={task.completed ? 'line-through' : ''}>
              {task.text}
            </span>
          </div>
          <button className='btn1' onClick={() => deleteTodo(index)}>Delete</button>
        </div>
      ))}
    </>
  );
}
