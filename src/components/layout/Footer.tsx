const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <a href="/" className="footer-logo">Coca-Cola</a>
          <p style={{ color: '#999', marginTop: '1rem' }}>
            The Coca-Cola Company is a total beverage company, offering over 500 brands in more than 200 countries and territories.
          </p>
          <div className="social-links">
            <a href="#" className="social-btn">FB</a>
            <a href="#" className="social-btn">TW</a>
            <a href="#" className="social-btn">IG</a>
            <a href="#" className="social-btn">YT</a>
          </div>
        </div>
        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Our Company</a></li>
              <li><a href="#">History</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Investors</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Need Help?</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Store Locator</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} The Coca-Cola Company. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#">Do Not Sell My Personal Information</a>
          <span>|</span>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
