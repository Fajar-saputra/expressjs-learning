import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '10px', 
      borderBottom: '1px solid #eee',
      backgroundColor: todo.status ? '#f9f9f9' : 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Ikon Status (Centang) */}
        <div style={{ cursor: 'pointer' }} onClick={() => onUpdate(todo.id, !todo.status)}>
          {todo.status ? <CheckCircle color="green" /> : <Circle color="#ccc" />}
        </div>
        
        {/* Teks Task */}
        <span style={{ textDecoration: todo.status ? 'line-through' : 'none', color: todo.status ? '#888' : '#333' }}>
          {todo.task}
        </span>
      </div>

      {/* Tombol Hapus */}
      <button 
        onClick={() => onDelete(todo.id)} 
        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TodoItem;