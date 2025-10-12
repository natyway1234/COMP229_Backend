import { Link } from 'react-router-dom';

function Home(){
    return(
        <main className="home">
            <h1 className="hero-title">Welcome to my portfolio</h1>
            <p className="hero-subtitle">Full-Stack Developer & Digital Solutions Architect</p>
            
            {/* Mission Statement */}
            <section className="mission-card">
                <h2>My Mission</h2>
                <p>
                    I am passionately committed to creating innovative, user-centered web solutions that solve real-world problems
                    and enhance digital experiences across all platforms.
                </p>
                <p>
                    With a deep understanding of modern web technologies and a keen eye for design, I strive to deliver exceptional 
                    digital solutions that not only meet but exceed client expectations.
                </p>
                <p>
                    I am dedicated to continuous learning and professional growth, staying current with emerging technologies
                    and industry best practices to provide strategic insights and sustainable solutions.
                </p>
            </section>
            
            {/* Navigation Buttons */}
            <div className="cta-row">
                <Link to="/about" className="nav-button">
                    Learn About Me
                </Link>
                <Link to="/projects" className="nav-button">
                    View My Projects
                </Link>
                <Link to="/services" className="nav-button">
                    See My Services
                </Link>
                <Link to="/contact" className="nav-button">
                    Get In Touch
                </Link>
            </div>
            
            {/* Footer */}
            <footer className="site-footer">
                <p>&copy; 2025 Natnael Zewday. All rights reserved.</p>
            </footer>
        </main>
    );
}

export default Home;