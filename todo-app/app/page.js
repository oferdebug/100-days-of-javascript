'use client';
import { useEffect, useState } from 'react';
export default function HomePage() {


  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');



  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { text: inputValue, completed: false }]);
    setInputValue('');
  }


  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }
  
  
  const toggleTodo = (index) => {
    setTodos(todos.map((todo, i) => i === index ? { ...todo, completed: !todo.completed } : todo));
  }

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (!saved) return;
    try {
      setTodos(JSON.parse(saved));
    } catch {
      setTodos([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-lg w-full max-w-md p-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-1'>Todo List</h1>
        <p className='text-sm text-gray-400 mb-6'>
          {todos.filter(t => !t.completed).length} tasks remaining
        </p>
        <div className='flex gap-2 mb-6'>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder='Add a new task...'
            className='flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400'
          />
          <button
            onClick={addTodo}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors'
          >
            Add
          </button>
        </div>
        <ul className='flex flex-col gap-2'>
          {todos.map((todo, index) => (
            <li key={index} className='flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50'>
              <button onClick={() => toggleTodo(index)} className='text-lg'>
                {todo.completed ? '✅' : '⬜'}
              </button>
              <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(index)} className='text-gray-300 hover:text-red-400 transition-colors'>
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}