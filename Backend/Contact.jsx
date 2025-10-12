import React, { useState, useEffect } from 'react';
import { contactsAPI } from './api';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  // Load contacts when component mounts
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await contactsAPI.getAll();
      setContacts(data);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactsAPI.create(formData);
      setFormData({ firstname: '', lastname: '', email: '' });
      loadContacts(); // Reload the list
      alert('Contact added successfully!');
    } catch (error) {
      console.error('Failed to create contact:', error);
      alert('Failed to add contact');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactsAPI.delete(id);
        loadContacts(); // Reload the list
        alert('Contact deleted successfully!');
      } catch (error) {
        console.error('Failed to delete contact:', error);
        alert('Failed to delete contact');
      }
    }
  };

  return (
    <div>
      <h2>Contact Management</h2>
      
      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstname}
          onChange={(e) => setFormData({...formData, firstname: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={(e) => setFormData({...formData, lastname: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <button type="submit">Add Contact</button>
      </form>

      {/* Contacts List */}
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div>
          <h3>Contacts ({contacts.length})</h3>
          {contacts.map((contact) => (
            <div key={contact._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h4>{contact.firstname} {contact.lastname}</h4>
              <p>Email: {contact.email}</p>
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;
