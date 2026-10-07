import { useState } from 'react';
import { Play, Music } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Discover.css';

const timelineData = [
  { year: '1886', title: 'The Beginning', desc: "John S. Pemberton creates the original formula for Coca‑Cola in Atlanta, Georgia. A pharmacist's experiment becomes a global phenomenon.", icon: '🧪' },
  { year: '1915', title: 'The Contour Bottle', desc: 'The iconic contour bottle is patented to ensure Coca‑Cola is recognizable even in the dark — or by touch alone.', icon: '🍾' },
  { year: '1982', title: 'Diet Coke', desc: 'Diet Coke is introduced, becoming the first extension of the Coca‑Cola trademark beyond the original.', icon: '✨' },
  { year: '2005', title: 'Coca‑Cola Zero', desc: 'Coca‑Cola Zero is launched, offering the authentic Coca‑Cola taste with zero calories.', icon: '🥤' },
  { year: 'Today', title: 'Global Magic', desc: 'Refreshing the world and making a positive difference in over 200 countries, every single day.', icon: '🌍' }
];

const mocktails = [
  {
    name: "Classic Cherry Coke Float",
    desc: "A timeless diner classic featuring vanilla ice cream topped with bubbly Coca‑Cola and a hint of cherry syrup.",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    time: "5 min"
  },
  {
    name: "Spiced Coke Refresher",
    desc: "Coca‑Cola mixed with fresh lime juice, a dash of ginger syrup, and garnished with a cinnamon stick.",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    time: "3 min"
  },
  {
    name: "Coke Mojito Mocktail",
    desc: "Muddled mint leaves, fresh lime, crushed ice, and a generous pour of Coca‑Cola Zero Sugar.",
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    time: "4 min"
  }
];

const Discover = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useScrollReveal();

  return (
    <div className="discover-page" ref={ref}>
      {/* Hero Section */}
      <section className="hero discover-hero">
        <div className="hero-overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Discover Coca Cola"
          className="hero-bg"
        />
        <div className="hero-content">
          <span className="hero-subtitle">Discover</span>
          <h1 className="hero-title animate-text">Taste The<br />Magic</h1>
          <p className="hero-description">
            Dive into the rich history, the vibrant music, and the refreshing recipes that make Coca‑Cola more than just a drink.
          </p>
        </div>
      </section>

      {/* History Timeline Section */}
      <section className="section timeline-section section-dark">
        <div className="section-header reveal">
          <h2 className="section-title text-white">Our Journey</h2>
          <p className="section-subtitle">Over 130 years of refreshing the world.</p>
        </div>

        <div className="timeline-container reveal">
          <div className="timeline-nav">
            <div className="timeline-track"></div>
            {timelineData.map((item, i) => (
              <button
                key={item.year}
                className={`timeline-btn ${activeIndex === i ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className="timeline-btn-icon">{item.icon}</span>
                <span className="timeline-btn-year">{item.year}</span>
              </button>
            ))}
          </div>
          <div className="timeline-content">
            {timelineData.map((item, i) => (
              <div
                key={item.year}
                className={`timeline-panel ${activeIndex === i ? 'active' : ''}`}
              >
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="timeline-year-watermark">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coke Studio Section */}
      <section className="section coke-studio-section">
        <div className="studio-content">
          <div className="studio-text reveal-left">
            <span className="studio-label">
              <Music size={14} />
              Coke Studio
            </span>
            <h2>Music That Connects The World</h2>
            <p>Experience cross-cultural collaborations that push the boundaries of sound. Coke Studio brings together artists from different genres and backgrounds to create real magic through music.</p>
            <button className="btn btn-primary studio-btn">Listen Now</button>
          </div>
          <div className="studio-image-wrapper reveal-right">
            <img src="https://images.unsplash.com/photo-1499638472904-ea5c6178a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Coke Studio Music" className="studio-img" />
            <div className="play-button">
              <Play size={28} fill="white" color="white" />
            </div>
          </div>
        </div>
      </section>

      {/* Mixology / Recipes Section */}
      <section className="section mixology-section">
        <div className="section-header reveal">
          <h2 className="section-title">Coca‑Cola Mixology</h2>
          <p className="section-subtitle">Elevate your refreshment with these simple, delicious mocktails.</p>
        </div>

        <div className="mixology-grid stagger">
          {mocktails.map((drink, index) => (
            <div className="mixology-card" key={index}>
              <div className="mixology-img-wrapper">
                <img src={drink.img} alt={drink.name} />
                <span className="mixology-time">{drink.time}</span>
              </div>
              <div className="mixology-info">
                <h3>{drink.name}</h3>
                <p>{drink.desc}</p>
                <button className="recipe-btn">Get Recipe</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discover;
