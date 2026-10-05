import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import './ShareACoke.css';

const ShareACoke = () => {
  const [name, setName] = useState('BẠN');
  const [isTyping, setIsTyping] = useState(false);
  const canRef = useRef<HTMLDivElement>(null);
  const ref = useScrollReveal();

  // Sparkle particles on name change
  useEffect(() => {
    if (isTyping && canRef.current) {
      canRef.current.classList.remove('sparkle');
      void canRef.current.offsetWidth; // force reflow
      canRef.current.classList.add('sparkle');
    }
  }, [name, isTyping]);

  return (
    <section className="share-coke-section" ref={ref}>
      {/* Animated background shapes */}
      <div className="share-bg-circle circle-1"></div>
      <div className="share-bg-circle circle-2"></div>
      <div className="share-bg-circle circle-3"></div>

      <div className="share-coke-container">
        <div className="share-coke-content reveal-left">
          <span className="share-tag">✨ Personalize Your Coke</span>
          <h2>Share a Coke<br />with...</h2>
          <p>Tạo một lon Coca‑Cola mang đậm dấu ấn cá nhân để dành tặng cho bản thân hoặc những người thân yêu.</p>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Nhập tên của bạn..."
              maxLength={12}
              onChange={(e) => {
                setName(e.target.value || 'BẠN');
                setIsTyping(true);
              }}
              onBlur={() => setIsTyping(false)}
              className="name-input"
            />
            <div className="input-glow"></div>
          </div>
        </div>

        <div className="share-coke-visual reveal-right">
          <div className="coke-can-wrapper" ref={canRef}>
            {/* Ambient glow behind the can */}
            <div className="can-ambient-glow"></div>

            <div className="coke-can">
              {/* Can top - metallic effect */}
              <div className="coke-can-top">
                <div className="can-rim"></div>
                <div className="can-tab"></div>
              </div>

              {/* Can body - realistic gradient */}
              <div className="coke-can-body">
                {/* Reflective highlight strip */}
                <div className="can-highlight"></div>

                {/* Wave pattern overlay */}
                <div className="can-wave"></div>

                {/* Label area */}
                <div className="coke-label">
                  <div className="coke-ribbon"></div>
                  <span className="coke-brand-name">Coca‑Cola</span>
                  <div className="name-divider"></div>
                  <span className="custom-name">{name}</span>
                  <span className="coke-tagline">Taste the Feeling</span>
                </div>

                {/* Condensation drops */}
                <div className="condensation">
                  <span className="drop drop-1"></span>
                  <span className="drop drop-2"></span>
                  <span className="drop drop-3"></span>
                  <span className="drop drop-4"></span>
                  <span className="drop drop-5"></span>
                </div>
              </div>

              {/* Can bottom */}
              <div className="coke-can-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShareACoke;
