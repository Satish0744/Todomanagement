import React, { useState } from 'react';
import Button from '../common/Button';

const TodoItem = ({ todo, onToggleStatus, onDelete, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setIsDeleting(true);
      try {
        await onDelete();
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 transition-all hover:shadow-md ${todo.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggleStatus}
            className="mt-1 w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 cursor-pointer flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
              <span className="text-xs text-gray-500">
                ID: {todo.id}
              </span>
              {todo.userId && (
                <span className="text-xs text-gray-500">
                  User: {todo.userId}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;