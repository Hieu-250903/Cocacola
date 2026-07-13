import React, { useEffect, useRef, useState } from 'react';
import './ScrollCokeBottle.css';

// Sound effects synthesizer using Web Audio API (completely offline and dynamic)
class AudioFizzSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180 + Math.random() * 150, now);
      osc.frequency.exponentialRampToValueAtTime(700 + Math.random() * 300, now + 0.08);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      // Audio context block/unsupported
    }
  }

  playFizz(duration = 0.4, intensity = 0.03) {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 6000 + Math.random() * 1500;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(intensity, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {
      // Audio context block/unsupported
    }
  }
}

const audioSynth = new AudioFizzSynth();

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  type: 'liquid' | 'bubble' | 'splash';
}

const ScrollCokeBottle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bottleRef = useRef<HTMLDivElement | null>(null);
  const [activeType, setActiveType] = useState<'classic' | 'zero'>('classic');
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [glassFill, setGlassFill] = useState<number>(0);
  const [isPouring, setIsPouring] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [targetName, setTargetName] = useState<string>('');
  const [bottleTransform, setBottleTransform] = useState({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
  });

  const particlesRef = useRef<Particle[]>([]);
  const stateRef = useRef({
    isPouring: false,
    activeType: 'classic',
    bottleTransform: { x: 0, y: 0, rotate: 0, scale: 1 },
    canvasSize: { width: window.innerWidth, height: window.innerHeight },
  });

  // Sync state values to ref for the animation loop to prevent closures issue
  useEffect(() => {
    stateRef.current.isPouring = isPouring;
    stateRef.current.activeType = activeType;
    stateRef.current.bottleTransform = bottleTransform;
  }, [isPouring, activeType, bottleTransform]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        stateRef.current.canvasSize = { width: window.innerWidth, height: window.innerHeight };
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set initial tooltip auto-hide
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Main scroll and section tracking effect
  useEffect(() => {
    const handleScroll = () => {
      // Calculate Scroll Percentage
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(pct);

      // Track sections
      // We look for elements like product cards or recipe cards or sections
      const sections = Array.from(document.querySelectorAll(
        '.product-card, .mixology-card, .card, .timeline-panel, .feature-block'
      )) as HTMLElement[];

      let activeSection: HTMLElement | null = null;
      let minDistance = Infinity;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        // Check if section center is near the middle/upper part of the viewport
        const sectionCenterY = rect.top + rect.height / 2;
        const viewportCenterY = window.innerHeight / 2;
        const distance = Math.abs(sectionCenterY - viewportCenterY);

        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.2) {
          if (distance < minDistance) {
            minDistance = distance;
            activeSection = sec;
          }
        }
      });

      if (activeSection) {
        const targetEl = activeSection as HTMLElement;
        const rect = targetEl.getBoundingClientRect();
        
        // Extract a friendly name for the target
        let name = 'Coca-Cola Post';
        const titleEl = targetEl.querySelector('h2, h3, .product-name, .card-title');
        if (titleEl) {
          name = titleEl.textContent || name;
        }
        setTargetName(name);
        setIsPouring(true);

        // Calculate target location relative to viewport
        // Bottle is fixed at bottom-right (resting position)
        // We will move the bottle closer to the active target element
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 3;

        // Position bottle on the right side of the active element, tilted towards it
        // Or if the card is on the right, position to the left of it.
        const bottleRestX = window.innerWidth - 80;
        const bottleRestY = window.innerHeight - 150;

        // Animate bottle position and tilt
        const idealX = targetX > window.innerWidth / 2 ? targetX - 160 : targetX + 160;
        const idealY = Math.max(100, Math.min(targetY - 120, window.innerHeight - 250));

        // Smooth transition towards the target section
        const lerpX = bottleRestX + (idealX - bottleRestX) * 0.8;
        const lerpY = bottleRestY + (idealY - bottleRestY) * 0.85;

        // Tilt angle depends on side: positive tilt if pouring left, negative if pouring right
        const tilt = targetX < lerpX ? -75 : 75;

        setBottleTransform({
          x: lerpX - bottleRestX,
          y: lerpY - bottleRestY,
          rotate: tilt,
          scale: 1.1,
        });

        // Slow increase of HUD Glass Fill
        setGlassFill((prev) => Math.min(100, prev + 0.15));
      } else {
        // Return to resting position
        setIsPouring(false);
        setTargetName('');
        setBottleTransform({
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation Loop for Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const state = stateRef.current;
      const particles = particlesRef.current;

      // 1. Spawning Particles (if pouring)
      if (state.isPouring) {
        // Calculate bottle nozzle/cap screen coordinate based on translation and rotation
        const bottleRestX = state.canvasSize.width - 80;
        const bottleRestY = state.canvasSize.height - 150;

        const currentBottleX = bottleRestX + state.bottleTransform.x;
        const currentBottleY = bottleRestY + state.bottleTransform.y;
        const rotationRad = (state.bottleTransform.rotate * Math.PI) / 180;

        // Nozzle offset relative to bottle center (bottle is height ~160px, nozzle is at the top)
        // Adjust these offsets based on how the bottle is positioned
        const nozzleOffsetLength = -80; // Distance from center to tip
        
        // Rotate the offset vector
        const nozzleX = currentBottleX + Math.sin(rotationRad) * nozzleOffsetLength;
        const nozzleY = currentBottleY - Math.cos(rotationRad) * nozzleOffsetLength;

        // Spawn a stream of particles
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
          const angleOffset = (Math.random() - 0.5) * 0.15;
          const streamAngle = rotationRad - Math.PI / 2 + angleOffset; // flow direction
          const velocity = 6 + Math.random() * 5;

          // Color customization depending on brand selection
          let pColor = 'rgba(74, 35, 18, 0.9)'; // Classic dark caramel coke
          if (state.activeType === 'zero') {
            pColor = Math.random() > 0.4 ? 'rgba(20, 20, 20, 0.95)' : 'rgba(220, 0, 0, 0.9)'; // Black/Red coke zero
          } else {
            pColor = Math.random() > 0.4 ? 'rgba(74, 35, 18, 0.9)' : 'rgba(244, 0, 9, 0.8)'; // Caramel/Red classic
          }

          // Randomize particle type
          const randType = Math.random();
          let pType: 'liquid' | 'bubble' = 'liquid';
          let pSize = Math.random() * 8 + 4;

          if (randType > 0.7) {
            pType = 'bubble';
            pColor = 'rgba(255, 255, 255, 0.8)'; // carbon bubbles
            pSize = Math.random() * 4 + 2;
          }

          particles.push({
            x: nozzleX,
            y: nozzleY,
            vx: Math.cos(streamAngle) * velocity,
            vy: Math.sin(streamAngle) * velocity,
            radius: pSize,
            color: pColor,
            alpha: 1,
            decay: 0.008 + Math.random() * 0.015,
            gravity: 0.35,
            type: pType,
          });
        }

        // Occasionally play bubble pop/fizz sounds
        if (Math.random() < 0.12) {
          audioSynth.playPop();
        }
        if (Math.random() < 0.08) {
          audioSynth.playFizz(0.2, 0.02);
        }
      }

      // 2. Updating and Drawing Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity; // Gravity pull

        // Fade out
        p.alpha -= p.decay;

        if (p.type === 'bubble') {
          // Bubbles wobble and float slightly sideways
          p.vx += (Math.random() - 0.5) * 0.4;
        }

        // Check collision with cards or bottom of viewport to trigger splash
        // Let's grab all active targets and see if we collide
        const targets = Array.from(document.querySelectorAll(
          '.product-card, .mixology-card, .card, .timeline-panel, .feature-block'
        )) as HTMLElement[];
        let hitTarget = false;

        targets.forEach((tar) => {
          if (hitTarget) return;
          const rect = tar.getBoundingClientRect();
          if (
            p.x > rect.left &&
            p.x < rect.right &&
            p.y > rect.top &&
            p.y < rect.top + 30 &&
            p.type === 'liquid'
          ) {
            hitTarget = true;
            // Generate splash particles
            const splashCount = 2;
            for (let s = 0; s < splashCount; s++) {
              particles.push({
                x: p.x,
                y: rect.top - 2,
                vx: (Math.random() - 0.5) * 6,
                vy: -Math.random() * 4 - 2,
                radius: Math.random() * 3 + 1,
                color: p.color,
                alpha: 1,
                decay: 0.04 + Math.random() * 0.04,
                gravity: 0.4,
                type: 'splash',
              });
            }
          }
        });

        // Remove dead particles
        if (p.alpha <= 0 || p.y > state.canvasSize.height || p.x < 0 || p.x > state.canvasSize.width) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Shadow glow effect for high premium feel
        if (p.type === 'bubble') {
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        } else {
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow for large bubbles
        if (p.type === 'bubble' && p.radius > 3) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleBottleClick = () => {
    // Fizz shake animation trigger
    audioSynth.playFizz(0.7, 0.06);

    // Blast a huge batch of particles!
    const canvas = canvasRef.current;
    if (canvas) {
      const bottleRestX = window.innerWidth - 80;
      const bottleRestY = window.innerHeight - 150;
      const bX = bottleRestX + bottleTransform.x;
      const bY = bottleRestY + bottleTransform.y;

      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 8;
        particlesRef.current.push({
          x: bX,
          y: bY - 40,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 2,
          radius: Math.random() * 6 + 3,
          color: activeType === 'classic' ? 'rgba(244, 0, 9, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          alpha: 1,
          decay: 0.02 + Math.random() * 0.02,
          gravity: 0.25,
          type: 'bubble',
        });
      }
    }

    // Toggle product
    setActiveType((prev) => (prev === 'classic' ? 'zero' : 'classic'));
    setShowTooltip(false);
  };

  const triggerSuperSplash = () => {
    audioSynth.playFizz(1.5, 0.08);
    // Fill screen with magical floating bubbles
    const canvas = canvasRef.current;
    if (canvas) {
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          vx: (Math.random() - 0.5) * 3,
          vy: -Math.random() * 6 - 3,
          radius: Math.random() * 8 + 3,
          color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(244, 0, 9, 0.6)',
          alpha: 1,
          decay: 0.005 + Math.random() * 0.01,
          gravity: -0.05, // floats UP!
          type: 'bubble',
        });
      }
    }
  };

  const handleMouseEnter = () => {
    audioSynth.playFizz(0.15, 0.02);
  };

  return (
    <>
      {/* Liquid Pouring Particles Canvas Overlay */}
      <canvas ref={canvasRef} className="pour-canvas" />

      {/* Floating HUD Controls and Level */}
      <div className="coke-hud">
        <div className="glass-indicator" onClick={triggerSuperSplash} title="Super Fizz Blast!">
          <div className="glass-liquid" style={{ height: `${glassFill}%` }}>
            <div className="glass-bubbles"></div>
          </div>
          <span className="glass-label">{Math.floor(glassFill)}% Filled</span>
        </div>
        
        <div className="hud-info">
          <span className="hud-title">COKE MAGIC ACTIVE</span>
          <span className="hud-desc">
            {isPouring ? `Pouring into: ${targetName}` : `Scroll: ${Math.floor(scrollPercent)}% | Ready to pour`}
          </span>
        </div>
      </div>

      {/* Scrolling / Floating Coca-Cola Bottle Container */}
      <div
        ref={bottleRef}
        className={`scroll-coke-container ${isPouring ? 'is-pouring' : ''} ${
          activeType === 'zero' ? 'zero-theme' : 'classic-theme'
        }`}
        style={{
          transform: `translate(${bottleTransform.x}px, ${bottleTransform.y}px) rotate(${bottleTransform.rotate}deg) scale(${bottleTransform.scale})`,
        }}
        onClick={handleBottleClick}
        onMouseEnter={handleMouseEnter}
      >
        {/* Glowing aura effect */}
        <div className="bottle-glow" />

        {/* Coca-Cola Bottle Image */}
        <img
          src={activeType === 'classic' ? '/product2.png' : '/product1.png'}
          alt="Floating Coca-Cola Bottle"
          className="floating-bottle-img"
        />

        {/* Small Liquid Drops Spraying from cap */}
        {isPouring && (
          <div className="nozzle-spray">
            <span className="spray-drop drop-1"></span>
            <span className="spray-drop drop-2"></span>
            <span className="spray-drop drop-3"></span>
          </div>
        )}

        {/* Info tooltips & instruction */}
        {showTooltip && (
          <div className="bottle-tooltip">
            <span className="tooltip-title">💡 Interactive Coca-Cola</span>
            <p>Scroll down to pour coke into cards! Click me to switch flavor!</p>
          </div>
        )}

        {/* Miniature indicator tag */}
        <div className="bottle-tag">
          {activeType === 'classic' ? 'Classic' : 'Zero Sugar'}
        </div>
      </div>
    </>
  );
};

export default ScrollCokeBottle;
