// Image served from public directory

function About(){
    return (
        <div className="about-page">
            <h3>About Me</h3>

            <div className="about-main-content">
                {/* Hero Section */}
                <div className="about-hero">
                    <div className="about-photo">
                        <img 
                            src="/natnael.jpg" 
                            alt="Natnael Zewday - Professional Headshot" 
                            className="profile-photo"
                        />
                    </div>
                    <div className="about-intro">
                        <h4>Natnael Zewday</h4>
                        <p className="intro-subtitle">Full-Stack Developer & Digital Solutions Architect</p>
                        <p className="intro-description">
                            Passionate web developer with expertise in modern JavaScript frameworks,
                            particularly React. I specialize in creating responsive, user-friendly web
                            applications and have a strong foundation in front-end development.
                        </p>
                    </div>
                </div>

                {/* Journey and Skills Side by Side */}
                <div className="about-content-grid">
                    <div className="about-story">
                        <h4>My Journey</h4>
                        <p>
                            My journey in programming began during my AI Software Engineering studies,
                            where I discovered my passion for creating innovative digital solutions.
                            I've been continuously learning and growing in this ever-evolving field,
                            always staying up-to-date with the latest technologies and best practices.
                        </p>
                        <p>
                            When I'm not coding, I enjoy exploring new technologies, contributing to
                            open-source projects, and mentoring fellow developers. I believe in writing
                            clean, maintainable code and following industry best practices to deliver
                            high-quality solutions that make a real impact.
                        </p>
                    </div>

                    <div className="about-skills">
                        <h4>Skills & Expertise</h4>
                        <div className="skills-grid">
                            <div className="skill-category">
                                <h5>Frontend Development</h5>
                                <ul>
                                    <li>React.js</li>
                                    <li>JavaScript</li>
                                    <li>HTML & CSS</li>
                                </ul>
                            </div>
                            <div className="skill-category">
                                <h5>Backend Development</h5>
                                <ul>
                                    <li>Node.js</li>
                                    <li>SQL</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resume Download Section - Full Width */}
                <div className="resume-section">
                    <h4>Resume</h4>
                    <p>Download my resume to learn more about my professional experience and skills.</p>
                    <a
                        href="/src/assets/Software Engineer Technology Resume  .docx"
                        download="Natnael_Zewday_Resume.docx"
                        className="resume-link"
                    >
                        📄 Download Resume (DOCX)
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default About;