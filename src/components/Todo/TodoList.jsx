import React from 'react';
import TodoItem from './TodoItem';
import TodoEmptyState from './TodoEmptyState';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import Button from '../common/Button';

const TodoList = ({ 
  todos, 
  loading, 
  error, 
  onToggleStatus, 
  onDelete, 
  onRefresh,
  onEdit 
}) => {
  if (loading && todos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && todos.length === 0) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={onRefresh}
        className="my-4"
      />
    );
  }

  if (todos.length === 0) {
    return <TodoEmptyState onRefresh={onRefresh} />;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleStatus={() => onToggleStatus(todo.id, !todo.completed)}
          onDelete={() => onDelete(todo.id)}
          onEdit={() => onEdit(todo)}
        />
      ))}
    </div>
  );
};

export default TodoList;