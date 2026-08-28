import { useState, useEffect, useCallback } from 'react';
import { todoApi } from '../api/todoApi';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoApi.getTodos();
      setTodos(data);
      setFilteredTodos(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch todos';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create todo
  const createTodo = useCallback(async (todoData) => {
    setLoading(true);
    setError(null);
    try {
      const newTodo = await todoApi.createTodo(todoData);
      // JSONPlaceholder returns the created todo with id 201
      setTodos(prev => [newTodo, ...prev]);
      setFilteredTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      const errorMessage = err.message || 'Failed to create todo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id, todoData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTodo = await todoApi.updateTodo(id, todoData);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ));
      setFilteredTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ));
      return updatedTodo;
    } catch (err) {
      const errorMessage = err.message || 'Failed to update todo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle todo status (PATCH)
  const toggleTodoStatus = useCallback(async (id, completed) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTodo = await todoApi.patchTodo(id, { completed });
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
      ));
      setFilteredTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
      ));
      return updatedTodo;
    } catch (err) {
      const errorMessage = err.message || 'Failed to toggle todo status';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setFilteredTodos(prev => prev.filter(todo => todo.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete todo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter and search
  useEffect(() => {
    let result = todos;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filterStatus === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (filterStatus === 'pending') {
      result = result.filter(todo => !todo.completed);
    }

    setFilteredTodos(result);
  }, [todos, searchTerm, filterStatus]);

  return {
    todos: filteredTodos,
    allTodos: todos,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
  };
};

export default useTodos;