import './Careers.css';

const Careers = () => {
  return (
    <div className="careers-page">
      <section className="hero">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Careers at Coca Cola" 
          className="hero-bg"
        />
        <div className="hero-content">
          <span className="hero-subtitle">Join Us</span>
          <h1 className="hero-title">Taste the Feeling of Success</h1>
          <p className="hero-description">
            Be part of a team that creates real magic every day. We are looking for passionate individuals to shape the future.
          </p>
          <button className="btn btn-primary">Search Jobs</button>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-header">
          <h2 className="section-title">Open Positions</h2>
        </div>
        <div className="job-list">
          <div className="job-card">
            <div className="job-info">
              <h3>Senior Marketing Manager</h3>
              <span className="job-dept">Marketing • Atlanta, GA</span>
            </div>
            <button className="btn btn-outline" style={{ color: 'var(--coca-cola-red)', borderColor: 'var(--coca-cola-red)' }}>Apply Now</button>
          </div>
          
          <div className="job-card">
            <div className="job-info">
              <h3>Frontend Developer (React)</h3>
              <span className="job-dept">Engineering • Remote</span>
            </div>
            <button className="btn btn-outline" style={{ color: 'var(--coca-cola-red)', borderColor: 'var(--coca-cola-red)' }}>Apply Now</button>
          </div>

          <div className="job-card">
            <div className="job-info">
              <h3>Supply Chain Analyst</h3>
              <span className="job-dept">Operations • London, UK</span>
            </div>
            <button className="btn btn-outline" style={{ color: 'var(--coca-cola-red)', borderColor: 'var(--coca-cola-red)' }}>Apply Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
