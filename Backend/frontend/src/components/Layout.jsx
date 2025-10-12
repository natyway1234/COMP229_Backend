// Layout component containing navigation bar and custom logo
import { Link } from 'react-router-dom';
// Logo served from public directory

function Layout() {
    return (
        <>
            <div className="header-container">
                <div className="header-title-section">
                    <img src="/robintech_logo.png" alt="Logo" className='logo'/>
                    <h1>RobinTech Web Co.</h1>
                </div>
                {/* Navigation bar positioned in top right */}
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>
            <br />
            <hr />
        </>
    );
}

export default Layout;