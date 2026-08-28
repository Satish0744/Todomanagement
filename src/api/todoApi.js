import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const API_ENDPOINTS = {
  TODOS: '/todos'
};

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.request);
    } else {
      // Something else
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API Service methods
export const todoApi = {
  // GET all todos
  getTodos: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.TODOS);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch todos');
    }
  },

  // GET single todo
  getTodo: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.TODOS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch todo');
    }
  },

  // POST new todo
  createTodo: async (todoData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.TODOS, todoData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create todo');
    }
  },

  // PUT update todo
  updateTodo: async (id, todoData) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.TODOS}/${id}`, todoData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update todo');
    }
  },

  // PATCH update todo
  patchTodo: async (id, todoData) => {
    try {
      const response = await apiClient.patch(`${API_ENDPOINTS.TODOS}/${id}`, todoData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to patch todo');
    }
  },

  // DELETE todo
  deleteTodo: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.TODOS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete todo');
    }
  }
};

export default todoApi;