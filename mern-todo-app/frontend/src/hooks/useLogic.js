import { useState, useEffect } from "react";
import API from "../api";

export const useLogic = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTodos = async () => {
        try {
            const response = await API.get("/");
            setTodos(response.data.data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (task) => {
        try {
            const response = await API.post("/", { task });
            // setTodos([...todos, response.data.data]);
            setTodos([response.data.data, ...todos]);   
        } catch (error) {
            alert(error.response?.data?.errors[0]?.message || "Gagal menambah todo");
        }
    };

    const deleteTodo = async (id) => {
        await API.delete(`/${id}`);
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Tambahkan fungsi ini di dalam function App() di App.js
    const toggleTodo = async (id, currentStatus) => {
        try {
            await API.patch(`/${id}`, { status: currentStatus });
            setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status: currentStatus } : todo)));
        } catch (error) {
            console.error("Gagal update status:", error);
        }
    };

    // Jalankan fetch pertama kali
    useEffect(() => {
        fetchTodos();
    }, []);

    // Kembalikan data dan fungsi agar bisa dipakai di komponen
    return { todos, loading, addTodo, deleteTodo, fetchTodos, toggleTodo };
};
