import { Search, User, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-text">Coca-Cola</Link>
        <div className="nav-links">
          <Link to="/brands">Brands</Link>
          <Link to="/discover">Discover</Link>
          <Link to="/impact">Impact</Link>
          <Link to="/careers">Careers</Link>
        </div>
      </div>
      <div className="nav-right">
        <button className="icon-btn" aria-label="Search">
          <Search size={24} />
        </button>
        <button className="icon-btn" aria-label="Language">
          <Globe size={24} />
        </button>
        <button className="icon-btn" aria-label="Profile">
          <User size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
