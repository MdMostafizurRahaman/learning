import React, { useEffect, useState } from 'react';
import API from './api';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await API.get('/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await API.post('/todos', { text, completed: false });
    setText("");
    loadTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const updateTodo = async () => {
    if (!editText.trim()) return;
    await API.put(`/todos/${editingId}`, { text: editText, completed: false });
    setEditingId(null);
    setEditText("");
    loadTodos();
  };

  // Generate a vibrant color based on the todo index
  const getCardStyles = (index) => {
    // Bright color palette
    const colors = [
      { bgColor: '#FF5252', textColor: 'white' },    // Red
      { bgColor: '#4CAF50', textColor: 'white' },    // Green
      { bgColor: '#2196F3', textColor: 'white' },    // Blue
      { bgColor: '#FF9800', textColor: 'black' },    // Orange
      { bgColor: '#9C27B0', textColor: 'white' },    // Purple
      { bgColor: '#009688', textColor: 'white' },    // Teal
      { bgColor: '#FFC107', textColor: 'black' },    // Amber
      { bgColor: '#3F51B5', textColor: 'white' },    // Indigo
    ];
    
    return colors[index % colors.length];
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#333' }}>
          🎨 ColorSplash Todo App
        </h1>
        
        {/* Input Card */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '10px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              style={{ 
                flex: 1, 
                padding: '12px 15px', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                fontSize: '16px',
                outline: 'none'
              }}
              placeholder="Add a new task"
            />
            <button
              onClick={addTodo}
              style={{ 
                backgroundColor: '#2196F3', 
                color: 'white', 
                border: 'none',
                padding: '12px 24px', 
                borderRadius: '8px', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Todo List */}
        <div style={{ display: 'grid', gap: '15px' }}>
          {todos.map((todo, index) => {
            const { bgColor, textColor } = getCardStyles(index);
            
            return (
              <div 
                key={todo.id} 
                style={{ 
                  backgroundColor: bgColor,
                  color: textColor,
                  borderRadius: '10px', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ padding: '20px' }}>
                  {editingId === todo.id ? (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.currentTarget.value)}
                        style={{ 
                          flex: 1, 
                          padding: '10px 15px', 
                          borderRadius: '6px', 
                          border: 'none',
                          fontSize: '16px',
                          outline: 'none'
                        }}
                      />
                      <button
                        onClick={updateTodo}
                        style={{ 
                          backgroundColor: 'white', 
                          color: bgColor, 
                          border: 'none',
                          padding: '10px 20px', 
                          borderRadius: '6px', 
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '15px' }}>
                      {todo.text}
                    </p>
                  )}
                  
                  {editingId !== todo.id && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button
                        onClick={() => startEdit(todo)}
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                          color: textColor, 
                          border: 'none',
                          padding: '8px 16px', 
                          borderRadius: '6px', 
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        style={{ 
                          backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                          color: textColor, 
                          border: 'none',
                          padding: '8px 16px', 
                          borderRadius: '6px', 
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {todos.length === 0 && (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '10px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            padding: '30px 20px',
            textAlign: 'center',
            color: '#666'
          }}>
            No tasks yet. Add one above!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;