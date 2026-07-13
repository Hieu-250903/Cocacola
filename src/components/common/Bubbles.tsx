import './Bubbles.css';

const Bubbles = () => {
  return (
    <div className="bubbles-container">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="bubble" style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 15 + 5}px`,
          height: `${Math.random() * 15 + 5}px`,
          animationDuration: `${Math.random() * 4 + 2}s`,
          animationDelay: `${Math.random() * 3}s`
        }}></div>
      ))}
    </div>
  );
};

export default Bubbles;
