import { useState, useEffect } from 'react';
import { projectsAPI, handleApiError } from '../api';
import ListComponent from "./ListComponent";

const data = [
     { 
          imagePath: '/ai_logo.png', 
          title: 'AI‑Robotics Application Form ',
          text: 'Built a clean, minimalistic application portal for AI/Robotics opportunities with structured fields (specialization, skills, motivation).'

     },
     { 
          imagePath: '/luxry_motors.png', 
          title: 'Luxury Motors—Premium Car Dealership Website', 
          text: 'Designed a polished showcase site for luxury vehicles, including hero banner, gallery, testimonials, and services.'
     },
     { 
          imagePath: '/yabufitness_logo.png', 
          title: 'YABUS Fitness — Premium Fitness Experience', 
          text: 'Developed a sleek, modern website for YABUS Fitness with sections for classes, trainers, testimonials, and membership plans.'
     },
          
]

function Projects(){
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        completion: '',
        description: ''
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
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await projectsAPI.create(formData);
            setFormData({ title: '', completion: '', description: '' });
            loadProjects();
            alert('Project added successfully!');
        } catch (error) {
            handleApiError(error, setError);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectsAPI.delete(id);
                loadProjects();
                alert('Project deleted successfully!');
            } catch (error) {
                handleApiError(error, setError);
            }
        }
    };

    return(
        <div className="projects-page">
            <h3>Projects</h3>
            
            {/* Project Form */}
            <div className="project-form-section">
                <h4>Add New Project</h4>
                <form onSubmit={handleSubmit} className="project-form">
                    <div className="form-row">
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
                    </div>
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                    />
                    <button type="submit">Add Project</button>
                </form>
            </div>

            {/* Static Projects Display */}
            <h4>Featured Projects</h4>
            <ListComponent items={data}/>
            
            {/* Dynamic Projects from Backend */}
            <h4>Stored Projects ({projects.length})</h4>
            {loading ? (
                <p>Loading projects...</p>
            ) : error ? (
                <p style={{color: 'red'}}>Error: {error}</p>
            ) : (
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project._id} className="project-card">
                            <h5>{project.title}</h5>
                            <p>Completion: {new Date(project.completion).toLocaleDateString()}</p>
                            <p>Description: {project.description}</p>
                            <button 
                                onClick={() => handleDelete(project._id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <p>No projects stored yet.</p>
                    )}
                </div>
            )}
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Projects;