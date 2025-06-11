import { useState, useEffect, useRef } from 'react';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import { motion, AnimatePresence } from 'framer-motion';

const menu = [
  { name: 'ABOUT', key: 'about' },
  { name: 'EXPERIENCE', key: 'experience' },
  { name: 'PROJECTS', key: 'projects' },
];

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [minimizedWindows, setMinimizedWindows] = useState<{ [key: string]: boolean }>({});

  // Pixel art sprite animation state
  const spriteRef = useRef<HTMLDivElement>(null);
  const [spriteState, setSpriteState] = useState<'idle' | 'row1' | 'row2' | 'row3'>('idle');
  const spriteTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -50; // Adjust this value to match your nav/desired offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveSection = menu[0].key;
      let minDistance = Number.POSITIVE_INFINITY;

      for (const item of menu) {
        const sectionElement = document.getElementById(item.key);
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const offset = 80;
          const distance = Math.abs(rect.top - offset);

          if (rect.top <= offset && distance < minDistance) {
            minDistance = distance;
            currentActiveSection = item.key;
          }
        }
      }

      // Only trigger "bottom of page" logic if user has scrolled
      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        currentActiveSection = menu[menu.length - 1].key;
      }

      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWindowState = (sectionId: string, action: 'minimize' | 'maximize') => {
    setMinimizedWindows(prevState => {
      if (action === 'minimize') {
        return { ...prevState, [sectionId]: true };
      } else if (action === 'maximize') {
        if (sectionId === 'projects') {
          setTimeout(() => {
            scrollToSection(sectionId);
          }, 300);
        }
        return { ...prevState, [sectionId]: false };
      }
      return prevState;
    });
  };

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

  // Play animation sequence on mount: just row2 (3s), then row3 (0.5s)
  useEffect(() => {
    setSpriteState('row2');
    const t1 = setTimeout(() => {
      setSpriteState('row3');
      const t2 = setTimeout(() => {
        setSpriteState('idle');
      }, 500);
      spriteTimeout.current = t2;
    }, 3000);
    spriteTimeout.current = t1;

    return () => {
      if (spriteTimeout.current) clearTimeout(spriteTimeout.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <aside
        className="w-full md:w-[360px] md:fixed md:top-0 md:left-0 md:h-full flex flex-col justify-between p-4 z-10 overflow-y-auto"
        // style={{
        //   background: 'var(--crt-bg-light)',
        //   border: '2px solid var(--crt-border)',
        //   boxShadow: '0 0 0 2px var(--crt-border-dark), 2px 2px 0 0 #22332d',
        // }}
      >
        <div className="flex flex-col gap-6 items-start w-full">
          <div className="window w-full">
            <div className="window-header">
              <span>PROFILE.EXE</span>
            </div>
            <div className="window-content">
              <h1 className="text-3xl font-extrabold w-full break-words mb-2">
                Steven Sworowski
              </h1>
              <h2 className="text-xl font-light w-full">
                Software Engineer
              </h2>
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
          </div>

            <nav className="flex flex-col gap-2 w-full mt-6">
            {menu.map((item) => (
              <button
              key={item.key}
              onClick={() => scrollToSection(item.key)}
              className={`btn w-full text-left bg-transparent ${
                activeSection === item.key
                ? 'nav-link-active'
                : ''
              }`}
              style={{
                transition: 'all 0.2s ease',
                transform: activeSection === item.key ? 'translateY(1px)' : 'none',
                boxShadow: activeSection === item.key 
                ? 'inset 1px 1px 0px 0px var(--crt-border-dark), inset -1px -1px 0px 0px var(--crt-border)'
                : '1px 1px 0px 0px var(--crt-border-dark), -1px -1px 0px 0px var(--crt-border)',
                color: activeSection === item.key
                ? 'var(--crt-bg-dark)'
                : 'var(--crt-header-text)',
                border: '2px solid var(--crt-border)',
                background: activeSection === item.key
                ? 'var(--crt-header-text)'
                : 'var(--crt-bg-dark)',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '1rem',
                letterSpacing: '0.05em',
              }}
              >
              {item.name}
              </button>
            ))}
            </nav>
        </div>

        <div className="flex gap-4 mt-6 md:mt-0 items-center">
          <a
            href="https://www.linkedin.com/in/steven-sworowski"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link-btn"
            aria-label="LinkedIn"
          >
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a
            href="mailto:sjsworowski@gmail.com"
            className="sidebar-link-btn flex items-center gap-2"
            aria-label="Email"
            style={{ textDecoration: 'none' }}
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width={18} height={18}><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m22 7-8.97 6.48a2 2 0 0 1-2.06 0L2 7"/></svg>
          </a>
          <a
            href="/Steven Sworowski - Software Engineer.pdf"
            download
            className="sidebar-link-btn flex items-center gap-2"
            aria-label="Download CV"
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width={18} height={18}>
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
            <span className="cv-label">CV</span>
          </a>
        </div>
      </aside>

      <main
        className="min-h-screen flex flex-col items-center p-4 md:p-8 w-full"
      >
        <div className="max-w-4xl space-y-8 md:ml-[360px]">
          <section id="about" className="window">
            <div className="window-header">
              <span>ABOUT.TXT</span>
              <div className="flex gap-1">
                <button
                  className="crt-window-btn"
                  onClick={() => handleWindowState('about', 'minimize')}
                  aria-label="Minimize"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="9" width="8" height="1.5" fill="#c6e3d1"/>
                  </svg>
                </button>
                <button
                  className="crt-window-btn"
                  onClick={() => handleWindowState('about', 'maximize')}
                  aria-label="Maximize"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="2" width="8" height="8" fill="none" stroke="#c6e3d1" strokeWidth="1.5"/>
                  </svg>
                </button>
                <button
                  className="crt-window-btn"
                  aria-label="Close"
                  tabIndex={-1}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <line x1="3" y1="3" x2="9" y2="9" stroke="#c6e3d1" strokeWidth="1.5"/>
                    <line x1="9" y1="3" x2="3" y2="9" stroke="#c6e3d1" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
            <AnimatePresence>
              {!minimizedWindows['about'] && (
                <motion.div
                  key="about-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="window-content"
                >
                  <About />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section id="experience" className="window">
            <div className="window-header">
              <span>EXPERIENCE.TXT</span>
              <div className="flex gap-1">
                <button
                  className="crt-window-btn"
                  onClick={() => handleWindowState('experience', 'minimize')}
                  aria-label="Minimize"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="9" width="8" height="1.5" fill="#c6e3d1"/>
                  </svg>
                </button>
                <button
                  className="crt-window-btn"
                  onClick={() => handleWindowState('experience', 'maximize')}
                  aria-label="Maximize"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="2" width="8" height="8" fill="none" stroke="#c6e3d1" strokeWidth="1.5"/>
                  </svg>
                </button>
                <button
                  className="crt-window-btn"
                  aria-label="Close"
                  tabIndex={-1}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <line x1="3" y1="3" x2="9" y2="9" stroke="#c6e3d1" strokeWidth="1.5"/>
                    <line x1="9" y1="3" x2="3" y2="9" stroke="#c6e3d1" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
            <AnimatePresence>
              {!minimizedWindows['experience'] && (
                <motion.div
                  key="experience-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="window-content"
                >
                  <Experience />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          <section id="projects" className="window">
            <div className="window-header">
              <span>PROJECTS.TXT</span>
              <div className="flex gap-1">
                <button
                  className="crt-window-btn"
                  onClick={() => handleWindowState('projects', 'minimize')}
                  aria-label="Minimize"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="9" width="8" height="1.5" fill="#c6e3d1"/>
                  </svg>
                </button>
                <button
                  className="crt-window-btn"
                  onClick={() => handleWindowState('projects', 'maximize')}
                  aria-label="Maximize"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <rect x="2" y="2" width="8" height="8" fill="none" stroke="#c6e3d1" strokeWidth="1.5"/>
                  </svg>
                </button>
                <button
                  className="crt-window-btn"
                  aria-label="Close"
                  tabIndex={-1}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <line x1="3" y1="3" x2="9" y2="9" stroke="#c6e3d1" strokeWidth="1.5"/>
                    <line x1="9" y1="3" x2="3" y2="9" stroke="#c6e3d1" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
            <AnimatePresence>
              {!minimizedWindows['projects'] && (
                <motion.div
                  key="projects-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="window-content"
                >
                  <Projects />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
