import React from 'react';
import Input from '../common/Input';

const TodoSearch = ({ searchTerm, onSearchChange, placeholder = 'Search todos...' }) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white"
      />
    </div>
  );
};

export default TodoSearch;