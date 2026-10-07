import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Impact.css';

const Impact = () => {
  const ref = useScrollReveal();

  return (
    <div className="impact-page" ref={ref}>
      <section className="hero" style={{ height: '70vh' }}>
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Sustainability" 
          className="hero-bg" 
          style={{ objectPosition: 'center' }}
        />
        <div className="hero-content">
          <span className="hero-subtitle" style={{ color: '#00A859' }}>Sustainability</span>
          <h1 className="hero-title animate-text">Making a Difference</h1>
          <p className="hero-description">
            We are dedicated to creating a more sustainable future for our planet and communities.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-header reveal">
          <h2 className="section-title">Our Sustainability Goals</h2>
          <p className="section-subtitle">Pioneering sustainable practices across every step of our journey.</p>
        </div>
        <div className="grid-3 impact-stats stagger">
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <h3>Recyclable Packaging</h3>
            <p>Our goal is to make 100% of our packaging recyclable globally by 2025.</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <h3>Water Replenishment</h3>
            <p>We return 100% of the water used in our beverages to nature and communities.</p>
          </div>
          <div className="stat-card">
            <div className="stat-number">25%</div>
            <h3>Carbon Reduction</h3>
            <p>Working towards a 25% reduction in our carbon footprint by 2030.</p>
          </div>
        </div>
      </section>
      
      <section className="feature-block reveal-scale" style={{ backgroundColor: '#00A859', margin: '0 4% 4rem' }}>
        <h2>World Without Waste</h2>
        <p>We're taking responsibility to help solve the global packaging waste crisis. For every bottle or can we sell, we aim to collect and recycle one by 2030.</p>
        <button className="btn" style={{ backgroundColor: '#ffffff', color: '#00A859', fontWeight: 700 }}>Read Our Report</button>
      </section>
    </div>
  );
};

export default Impact;
