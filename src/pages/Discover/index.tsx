import { useState } from 'react';
import './Discover.css';

const timelineData = [
  { year: '1886', title: 'The Beginning', desc: 'John S. Pemberton creates the original formula for Coca-Cola in Atlanta, Georgia.' },
  { year: '1915', title: 'The Contour Bottle', desc: 'The iconic contour bottle is patented to ensure Coca-Cola is recognizable even in the dark.' },
  { year: '1982', title: 'Diet Coke', desc: 'Diet Coke is introduced, becoming the first extension of the Coca-Cola trademark.' },
  { year: '2005', title: 'Coca-Cola Zero', desc: 'Coca-Cola Zero is launched, offering the real Coca-Cola taste with zero calories.' },
  { year: 'Today', title: 'Global Magic', desc: 'Refreshing the world and making a difference in over 200 countries worldwide.' }
];

const mocktails = [
  {
    name: "Classic Cherry Coke Float",
    desc: "A timeless diner classic featuring vanilla ice cream topped with bubbly Coca-Cola and a hint of cherry syrup.",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Spiced Coke Refresher",
    desc: "Coca-Cola mixed with fresh lime juice, a dash of ginger syrup, and garnished with a cinnamon stick.",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Coke Mojito Mocktail",
    desc: "Muddled mint leaves, fresh lime, ice, and a generous pour of Coca-Cola Zero Sugar.",
    img: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const Discover = () => {
  const [activeYear, setActiveYear] = useState(timelineData[0].year);

  return (
    <div className="discover-page">
      {/* Hero Section */}
      <section className="hero discover-hero">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Discover Coca Cola" 
          className="hero-bg"
        />
        <div className="hero-content">
          <span className="hero-badge">Discover</span>
          <h1 className="hero-title animate-text">Taste The Magic</h1>
          <p className="hero-description slide-up">
            Dive into the rich history, the vibrant music, and the refreshing recipes that make Coca-Cola more than just a drink.
          </p>
        </div>
      </section>

      {/* History Timeline Section */}
      <section className="section timeline-section section-dark">
        <div className="section-header">
          <h2 className="section-title text-white">Our Journey</h2>
          <p className="section-subtitle">Over 130 years of refreshing the world.</p>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-nav">
            {timelineData.map((item) => (
              <button 
                key={item.year}
                className={`timeline-btn ${activeYear === item.year ? 'active' : ''}`}
                onClick={() => setActiveYear(item.year)}
              >
                {item.year}
              </button>
            ))}
          </div>
          <div className="timeline-content">
            {timelineData.map((item) => (
              <div 
                key={item.year} 
                className={`timeline-panel ${activeYear === item.year ? 'active' : ''}`}
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
          <div className="studio-text">
            <span className="studio-label">Coke Studio</span>
            <h2>Music That Connects The World</h2>
            <p>Experience cross-cultural collaborations that push the boundaries of sound. Coke Studio brings together artists from different genres and backgrounds to create real magic through music.</p>
            <button className="btn btn-primary studio-btn">Listen Now &rarr;</button>
          </div>
          <div className="studio-image-wrapper">
            <img src="https://images.unsplash.com/photo-1499638472904-ea5c6178a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Coke Studio Music" className="studio-img" />
            <div className="play-button">
              <div className="play-icon"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mixology / Recipes Section */}
      <section className="section mixology-section section-light">
        <div className="section-header">
          <h2 className="section-title">Coca-Cola Mixology</h2>
          <p className="section-subtitle">Elevate your refreshment with these simple, delicious mocktails.</p>
        </div>
        
        <div className="mixology-grid">
          {mocktails.map((drink, index) => (
            <div className="mixology-card" key={index}>
              <div className="mixology-img-wrapper">
                <img src={drink.img} alt={drink.name} />
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
