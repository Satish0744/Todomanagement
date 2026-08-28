import React, { useState, useEffect } from 'react';
import useTodos from './hooks/useTodos';
import useToast from './hooks/useToast';
import TodoContainer from './components/Layout/TodoContainer'; // This path is correct
import TodoList from './components/Todo/TodoList';
import TodoModal from './components/Todo/TodoModal';
import TodoSearch from './components/Todo/TodoSearch';
import TodoFilter from './components/Todo/TodoFilter';
import Button from './components/common/Button';
import ErrorMessage from './components/common/ErrorMessage';
import Toast from './components/common/Toast';

function App() {
  const {
    todos,
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
  } = useTodos();

  const { toasts, showToast, removeToast } = useToast();
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos().catch(err => {
      showToast('Failed to load todos: ' + err.message, 'error');
    });
  }, [fetchTodos, showToast]);

  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await createTodo(todoData);
      setIsModalOpen(false);
      showToast('✅ New todo added successfully!', 'success');
      return newTodo;
    } catch (err) {
      showToast('❌ Failed to create todo: ' + err.message, 'error');
      throw err;
    }
  };

  const handleUpdateTodo = async (todoData) => {
    try {
      const updatedTodo = await updateTodo(editingTodo.id, todoData);
      setIsModalOpen(false);
      setEditingTodo(null);
      showToast('✏️ Todo updated successfully!', 'success');
      return updatedTodo;
    } catch (err) {
      showToast('❌ Failed to update todo: ' + err.message, 'error');
      throw err;
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleToggleStatus = async (id, completed) => {
    try {
      await toggleTodoStatus(id, completed);
      const status = completed ? 'completed' : 'pending';
      showToast(`📝 Todo marked as ${status}!`, 'info');
    } catch (err) {
      showToast('❌ Failed to update status: ' + err.message, 'error');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      showToast('🗑️ Todo deleted successfully!', 'warning');
    } catch (err) {
      showToast('❌ Failed to delete todo: ' + err.message, 'error');
      throw err;
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchTodos();
      showToast('🔄 Todos refreshed!', 'info');
    } catch (err) {
      showToast('❌ Failed to refresh: ' + err.message, 'error');
    }
  };

  return (
    <>
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>

      <TodoContainer>
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button onClick={handleAddClick} variant="primary" className="hover:scale-105 transition-transform">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New Todo
            </Button>
            <Button 
              onClick={handleRefresh} 
              variant="secondary" 
              loading={loading}
              className="hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </Button>
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {todos.length} {todos.length === 1 ? 'todo' : 'todos'} found
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <TodoSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <TodoFilter filterStatus={filterStatus} onFilterChange={setFilterStatus} />
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleRefresh}
            className="mb-4"
          />
        )}

        {/* Todo List */}
        <TodoList
          todos={todos}
          loading={loading}
          error={error}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDeleteTodo}
          onRefresh={handleRefresh}
          onEdit={handleEditClick}
        />

        {/* Modal for Add/Edit */}
        <TodoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
          initialData={editingTodo}
          loading={loading}
        />
      </TodoContainer>
    </>
  );
}

export default App;