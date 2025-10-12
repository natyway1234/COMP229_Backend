// src/api.js
const API_BASE_URL = '/api'; // This will be proxied to your backend
const FALLBACK_URL = 'http://localhost:3000/api'; // Direct backend URL as fallback

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const urls = [`${API_BASE_URL}${endpoint}`, `${FALLBACK_URL}${endpoint}`];
  
  for (let i = 0; i < urls.length; i++) {
    try {
      console.log(`Making API call to: ${urls[i]}`);
      
      const response = await fetch(urls[i], {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      console.log(`API Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API call failed for ${urls[i]}:`, error);
      if (i === urls.length - 1) {
        // If this is the last URL, throw the error
        throw error;
      }
      // Otherwise, try the next URL
      console.log(`Trying fallback URL...`);
    }
  }
};

// Utility function to handle API errors in components
export const handleApiError = (error, setError) => {
  const message = error.message || 'An unexpected error occurred';
  if (setError) {
    setError(message);
  } else {
    console.error('API Error:', message);
    alert(message);
  }
};

// Contacts API
export const contactsAPI = {
  getAll: () => apiCall('/contacts'),
  getById: (id) => apiCall(`/contacts/${id}`),
  create: (contact) => apiCall('/contacts', {
    method: 'POST',
    body: JSON.stringify(contact),
  }),
  update: (id, contact) => apiCall(`/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(contact),
  }),
  delete: (id) => apiCall(`/contacts/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/contacts', { method: 'DELETE' }),
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
  create: (project) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  }),
  update: (id, project) => apiCall(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  }),
  delete: (id) => apiCall(`/projects/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/projects', { method: 'DELETE' }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiCall('/services'),
  getById: (id) => apiCall(`/services/${id}`),
  create: (service) => apiCall('/services', {
    method: 'POST',
    body: JSON.stringify(service),
  }),
  update: (id, service) => apiCall(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(service),
  }),
  delete: (id) => apiCall(`/services/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/services', { method: 'DELETE' }),
};

// Users API
export const usersAPI = {
  getAll: () => apiCall('/users'),
  getById: (id) => apiCall(`/users/${id}`),
  create: (user) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
  update: (id, user) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  }),
  delete: (id) => apiCall(`/users/${id}`, { method: 'DELETE' }),
  deleteAll: () => apiCall('/users', { method: 'DELETE' }),
};
