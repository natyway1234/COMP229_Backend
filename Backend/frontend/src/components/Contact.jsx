import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactsAPI, handleApiError } from '../api';

function Contact() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await contactsAPI.create(formData);
            setFormData({ firstname: '', lastname: '', email: '' });
            loadContacts();
            alert('Contact added successfully!');
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    // Handle contact deletion
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await contactsAPI.delete(id);
                loadContacts();
                alert('Contact deleted successfully!');
            } catch (error) {
                handleApiError(error, setError);
            }
        }
    };

    return (
        <div className="contact-page">
            <h3>Contact Me</h3>
            
            {/* Main Contact Content */}
            <div className="contact-main-content">
                {/* Contact Information Panel */}
                <div className="contact-info-panel">
                    <h4>Get In Touch</h4>
                    <div className="contact-details">
                        <p><strong>Email:</strong> natyway1234@gmail.com</p>
                        <p><strong>Phone:</strong> 416-890-9234</p>
                        <p><strong>Location:</strong> Toronto, Canada</p>
                    </div>
                </div>

                {/* Interactive Contact Form */}
                <div className="contact-form-container">
                <h4>Send Me a Message</h4>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name *</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name *</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="submit-btn">Send Message</button>
                </form>
                </div>
            </div>

            {/* Display Stored Contacts */}
            <div className="stored-contacts-section">
                <h4>Stored Contacts ({contacts.length})</h4>
                {loading ? (
                    <p>Loading contacts...</p>
                ) : error ? (
                    <p style={{color: 'red'}}>Error: {error}</p>
                ) : (
                    <div className="contacts-list">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="contact-item">
                                <div className="contact-info">
                                    <h5>{contact.firstname} {contact.lastname}</h5>
                                    <p>{contact.email}</p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(contact._id)}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        {contacts.length === 0 && (
                            <p>No contacts stored yet.</p>
                        )}
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Contact;
