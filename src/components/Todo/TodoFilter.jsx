import React from 'react';

const TodoFilter = ({ filterStatus, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
            ${filterStatus === filter.value 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;