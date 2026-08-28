import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

const TodoForm = ({ 
  onSubmit, 
  initialData = null, 
  loading = false,
  submitLabel = 'Create Todo'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    userId: 1,
    completed: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        userId: initialData.userId || 1,
        completed: initialData.completed || false,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        title: formData.title.trim(),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Todo Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter todo title..."
        required
        error={errors.title}
        disabled={loading}
        autoFocus
      />
      
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 cursor-pointer"
            disabled={loading}
          />
          Mark as completed
        </label>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">User ID:</label>
          <input
            type="number"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={loading}
            min="1"
            max="10"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        loading={loading}
        className="w-full"
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default TodoForm;