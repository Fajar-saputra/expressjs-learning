import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { useLogic } from "./hooks/useLogic";
import './App.css'

function App() {
    const { todos, loading, addTodo, deleteTodo, fetchTodos, toggleTodo } = useLogic();


    if (loading) return <p>Loading data dari database...</p>;

    return (
        <div className="container">
            <h1>My Todo List</h1>
            <TodoInput onAdd={addTodo} />
            <div className="todo-list">
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onUpdate={toggleTodo} />
                ))}
            </div>
        </div>
    );
}

export default App;
