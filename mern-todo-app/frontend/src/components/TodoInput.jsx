import React, { useState } from 'react';
import { Plus } from 'lucide-react'; // Ikon tambah

const TodoInput = ({ onAdd }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAdd(task);
    setTask(''); // Kosongkan input setelah tambah
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Tambah tugas baru..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        <Plus size={20} />
      </button>
    </form>
  );
};

export default TodoInput;