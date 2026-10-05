import { Search, User, Globe, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavbarScroll } from '../../hooks/useScrollReveal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useNavbarScroll();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: '/brands', label: 'Brands' },
    { to: '/discover', label: 'Discover' },
    { to: '/impact', label: 'Impact' },
    { to: '/careers', label: 'Careers' },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo-text">Coca‑Cola</Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={location.pathname === item.to ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <button className="icon-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="icon-btn" aria-label="Language">
            <Globe size={20} />
          </button>
          <button className="icon-btn" aria-label="Profile">
            <User size={20} />
          </button>
          <button
            className="icon-btn mobile-menu-btn"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className={`mobile-nav-link ${location.pathname === item.to ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
