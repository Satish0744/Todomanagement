import React from 'react';

const TodoContainer = ({ children, title = 'Todo Management' }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;