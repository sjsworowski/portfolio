import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  // Pixel art sprite animation state
  const spriteRef = useRef<HTMLDivElement>(null);
  const [spriteState, setSpriteState] = useState<'idle' | 'row1' | 'row2' | 'row3'>('idle');
  const spriteStateRef = useRef(spriteState);
  spriteStateRef.current = spriteState;
  const spriteTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hop: plays on click or key press, and as small irregular hops while idle
  const [hopping, setHopping] = useState(false);
  const hopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hop = () => {
    if (hopTimeout.current) clearTimeout(hopTimeout.current);
    setHopping(true);
    hopTimeout.current = setTimeout(() => setHopping(false), 500);
  };
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;
    const schedule = () => {
      // Random gaps around the PRESS START blink rhythm (1s) so the hops feel organic
      idle = setTimeout(() => {
        // Skip idle hops while the wave sequence or hover animation is playing
        if (spriteStateRef.current === 'idle' && Math.random() < 0.75) hop();
        schedule();
      }, 900 + Math.random() * 1600);
    };
    schedule();
    return () => {
      clearTimeout(idle);
      if (hopTimeout.current) clearTimeout(hopTimeout.current);
    };
    // hop only touches refs and state setters, so it does not need to be a dependency
  }, []);

  // Handle sprite animation transitions
  const handleSpriteMouseEnter = () => {
    if (spriteTimeout.current) clearTimeout(spriteTimeout.current);
    setSpriteState('row1');
  };

  const handleSpriteAnimationEnd = () => {
    if (spriteState === 'row1') {
      setSpriteState('row2');
    } else if (spriteState === 'row3') {
      setSpriteState('idle');
    }
  };

  const handleSpriteMouseLeave = () => {
    if (spriteTimeout.current) clearTimeout(spriteTimeout.current);
    setSpriteState('row3');
  };

  // Play animation sequence on mount: just row2 (6s), then row3 (0.5s)
  useEffect(() => {
    setSpriteState('row2');
    const t1 = setTimeout(() => {
      setSpriteState('row3');
      const t2 = setTimeout(() => {
        setSpriteState('idle');
      }, 500);
      spriteTimeout.current = t2;
    }, 6000);
    spriteTimeout.current = t1;

    return () => {
      if (spriteTimeout.current) clearTimeout(spriteTimeout.current);
    };
  }, []);

  return (
    <section className="gb-hero" aria-label="Profile">
      <div
        className={`sprite-hop${hopping ? ' is-hopping' : ''}`}
        onClick={hop}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hop();
          }
        }}
      >
        <div className={`sprite-bob${hopping ? ' is-hopping' : ''}`}>
          <div
            ref={spriteRef}
            className={`pixel-art-sprite${
              spriteState === 'row1'
                ? ' play-row-1'
                : spriteState === 'row2'
                ? ' play-row-2'
                : spriteState === 'row3'
                ? ' play-row-3'
                : ''
            }`}
            onMouseEnter={handleSpriteMouseEnter}
            onMouseLeave={handleSpriteMouseLeave}
            onAnimationEnd={handleSpriteAnimationEnd}
            tabIndex={0}
            aria-label="Animated pixel art"
          ></div>
        </div>
        <div className="sprite-shadow" aria-hidden="true"></div>
        <div className="sprite-plate" aria-hidden="true">
          <span className="sprite-plate-name">PLAYER 1</span>
          <span className="sprite-plate-hp">
            <span>HP</span>
            <span className="sprite-plate-bar">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
          </span>
        </div>
      </div>
      <div className="gb-hero-text ml-2">
        <h1 className="gb-hero-name">Steven Sworowski</h1>
        <h2 className="gb-hero-role mt-3">SOFTWARE ENGINEER</h2>
        <div className="flex flex-wrap gap-2 mt-6 gb-hero-tags">
          <span className="tech-tag-btn">BIOENGINEERING</span>
          <span className="tech-tag-btn">MEDICAL DEVICES</span>
          <span className="tech-tag-btn">WEB APPS</span>
        </div>
        <p className="gb-prompt mt-4">PRESS START</p>
      </div>
    </section>
  );
};

export default Hero; 