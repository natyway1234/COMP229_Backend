import React, { useState, useEffect } from 'react';
import { servicesAPI } from './api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (error) {
      console.error('Failed to load services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await servicesAPI.create(formData);
      setFormData({ title: '', description: '' });
      loadServices();
      alert('Service added successfully!');
    } catch (error) {
      console.error('Failed to create service:', error);
      alert('Failed to add service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesAPI.delete(id);
        loadServices();
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('Failed to delete service');
      }
    }
  };

  return (
    <div>
      <h2>Service Management</h2>
      
      {/* Service Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <button type="submit">Add Service</button>
      </form>

      {/* Services List */}
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div>
          <h3>Services ({services.length})</h3>
          {services.map((service) => (
            <div key={service._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h4>{service.title}</h4>
              <p>Description: {service.description}</p>
              <button onClick={() => handleDelete(service._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
