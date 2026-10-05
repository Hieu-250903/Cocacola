import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Brands.css';

import cocaColaZeroImg from '../../assets/images/coca-cola-zero.jpg';
import spriteImg from '../../assets/images/sprite.jpg';
import monsterImg from '../../assets/images/Monsters.jpg';
import nutriboostImg from '../../assets/images/Nutriboost.jpg';
import downloadImg from '../../assets/images/download.jpg';

const products = [
  {
    id: 1,
    name: 'Coca-Cola Zero Sugar',
    image: cocaColaZeroImg,
    shortDesc: 'The classic Coca‑Cola taste you love, with zero sugar and zero calories.',
    detail: "Experience the refreshing crispness of Coca‑Cola Zero Sugar. All the flavor, none of the sugar. It's the perfect guilt-free refreshment for any time of the day.",
    color: '#0A0A0A',
    accent: '#E61E2A'
  },
  {
    id: 2,
    name: 'Sprite',
    image: spriteImg,
    shortDesc: 'Crisp, refreshing, and clean-tasting lemon-lime soda.',
    detail: "Quench your thirst with the iconic, zesty lemon-lime flavor of Sprite. Known for its crisp, clean taste, it's perfectly balanced to cool you down.",
    color: '#00703C',
    accent: '#7ED957'
  },
  {
    id: 3,
    name: 'Monster Energy',
    image: monsterImg,
    shortDesc: 'Unleash the beast with the intense, energizing power of Monster Energy.',
    detail: "Fuel your passion and power through your day. Tear into a can of the meanest energy drink on the planet, formulated to give you the boost you need.",
    color: '#0A0A0A',
    accent: '#95C11E'
  },
  {
    id: 4,
    name: 'Nutriboost',
    image: nutriboostImg,
    shortDesc: 'A delicious and nutritious milk-based beverage to boost your day.',
    detail: "Nourish your body and delight your taste buds with the creamy goodness of Nutriboost. A delightful blend of real milk and fruit juice, enriched with vitamins.",
    color: '#E68A00',
    accent: '#FFCC00'
  },
  {
    id: 5,
    name: 'Classic Coca-Cola',
    image: downloadImg,
    shortDesc: 'The original, iconic cola refreshment since 1886.',
    detail: "Real magic in every sip. Enjoy the crisp, cold, and undeniably classic taste of Coca‑Cola Original Taste, bringing people together with its unmistakable flavor.",
    color: '#E61E2A',
    accent: '#FFFFFF'
  }
];

const Brands = () => {
  const ref = useScrollReveal();

  return (
    <div className="brands-page" ref={ref}>
      <section className="hero">
        <img
          src="https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Coca Cola Brands"
          className="hero-bg"
        />
        <div className="hero-content">
          <span className="hero-subtitle">Our Portfolio</span>
          <h1 className="hero-title">Explore Our<br />Brands</h1>
          <p className="hero-description">
            From iconic sparkling beverages to energy drinks and nutritious milk-based options, we have a drink for every moment.
          </p>
        </div>
      </section>

      <section className="section product-showcase">
        <div className="section-header reveal">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Discover our diverse range of refreshing beverages.</p>
        </div>

        <div className="product-grid stagger">
          {products.map(product => (
            <div className="product-card" key={product.id} style={{ '--product-color': product.color, '--product-accent': product.accent } as React.CSSProperties}>
              <div className="product-image-container">
                <div className="product-glow"></div>
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-short-desc">{product.shortDesc}</p>
                <div className="product-details">
                  <p>{product.detail}</p>
                  <button className="btn-explore">
                    Explore <ArrowRight size={16} className="arrow-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Brands;
