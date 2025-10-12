import React, { useState, useEffect } from 'react';
import { projectsAPI } from './api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    completion: '',
    description: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.create(formData);
      setFormData({ title: '', completion: '', description: '' });
      loadProjects();
      alert('Project added successfully!');
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to add project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        loadProjects();
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Failed to delete project:', error);
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div>
      <h2>Project Management</h2>
      
      {/* Project Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <input
          type="date"
          placeholder="Completion Date"
          value={formData.completion}
          onChange={(e) => setFormData({...formData, completion: e.target.value})}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
        <button type="submit">Add Project</button>
      </form>

      {/* Projects List */}
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div>
          <h3>Projects ({projects.length})</h3>
          {projects.map((project) => (
            <div key={project._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h4>{project.title}</h4>
              <p>Completion: {new Date(project.completion).toLocaleDateString()}</p>
              <p>Description: {project.description}</p>
              <button onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
