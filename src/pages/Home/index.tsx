import { ChevronRight } from 'lucide-react';
import Bubbles from '../../components/common/Bubbles';
import ShareACoke from '../../features/products/components/ShareACoke';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <Bubbles />
        <img src="/hero.png" alt="Coca-Cola Refreshing" className="hero-bg" />
        <div className="hero-content">
          <span className="hero-subtitle">Taste the Feeling</span>
          <h1 className="hero-title">Real Magic Happens Here.</h1>
          <p className="hero-description">
            Experience the refreshing taste that has been bringing people together for generations. Discover our diverse portfolio of beverages.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Explore Brands</button>
            <button className="btn btn-outline">Our Story</button>
          </div>
        </div>
      </section>

      {/* Share a Coke Section (Interactive) */}
      <ShareACoke />

      {/* Featured Products */}
      <section className="section section-light">
        <div className="section-header">
          <h2 className="section-title">Our Beverages</h2>
        </div>
        <div className="grid-3">
          {/* Card 1 */}
          <div className="card">
            <div className="card-img-wrapper">
              <img src="/product1.png" alt="Coca-Cola Zero Sugar" className="card-img" />
            </div>
            <div className="card-content">
              <h3 className="card-title">Coca-Cola Zero Sugar</h3>
              <p className="card-desc">Zero sugar, zero calories, with the refreshing taste you love.</p>
              <a href="#" className="card-link">Learn More <ChevronRight size={16} /></a>
            </div>
          </div>
          {/* Card 2 */}
          <div className="card">
            <div className="card-img-wrapper">
              <img src="/product2.png" alt="Classic Coca-Cola" className="card-img" />
            </div>
            <div className="card-content">
              <h3 className="card-title">Coca-Cola Classic</h3>
              <p className="card-desc">The original and iconic taste that uplifts your everyday moments.</p>
              <a href="#" className="card-link">Learn More <ChevronRight size={16} /></a>
            </div>
          </div>
          {/* Card 3 */}
          <div className="card">
            <div className="card-img-wrapper">
              <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Diet Coke" className="card-img" />
            </div>
            <div className="card-content">
              <h3 className="card-title">Diet Coke</h3>
              <p className="card-desc">Light, crisp, and refreshing taste with zero calories.</p>
              <a href="#" className="card-link">Learn More <ChevronRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Block */}
      <section className="section section-dark">
        <div className="feature-block">
          <h2>Our Commitment to Sustainability</h2>
          <p>
            We are dedicated to creating a more sustainable future. By 2030, we aim to collect and recycle a bottle or can for every one we sell. Join us in making a World Without Waste.
          </p>
          <button className="btn">See Our Impact</button>
        </div>
      </section>
    </>
  );
};

export default Home;
