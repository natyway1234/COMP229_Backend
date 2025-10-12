// src/api.js
const API_BASE_URL = '/api'; // This will be proxied to your backend

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
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
};
