import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import AsciiBackground from './components/AsciiBackground';
import Contact from './components/Contact';

function App() {
  // One-shot power-on effect when the page loads
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBooting(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* Maps any image to the four Game Boy DMG shades (used by .project-image) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="gb-palette" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.2" intercept="-0.1" />
            <feFuncG type="linear" slope="1.2" intercept="-0.1" />
            <feFuncB type="linear" slope="1.2" intercept="-0.1" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0.141 0.322 0.659 0.851" />
            <feFuncG type="discrete" tableValues="0.208 0.420 0.733 0.867" />
            <feFuncB type="discrete" tableValues="0.110 0.208 0.439 0.710" />
          </feComponentTransfer>
        </filter>
      </svg>
      {booting && (
        <div className="boot-overlay" aria-hidden="true">
          <div className="boot-logo">
            <span className="boot-logo-mark">SS</span>
            <span className="boot-logo-sub">PORTFOLIO</span>
          </div>
        </div>
      )}
      <AsciiBackground />

      <main className="gb-stage">
        <div className="gb-screen">
          <header className="gb-statusbar">
            <span>PORTFOLIO.EXE</span>
            <span className="gb-wm" aria-hidden="true">
              <i className="gb-wm-min" />
              <i className="gb-wm-max" />
              <i className="gb-wm-close" />
            </span>
          </header>

          <Hero />

          <Navbar />

          <div className="gb-pages">
            <section id="about" className="window">
              <div className="window-header">
                <span>ABOUT.TXT</span>
              </div>
              <div className="window-content">
                <About />
              </div>
            </section>

            <section id="experience" className="window">
              <div className="window-header">
                <span>EXPERIENCE.TXT</span>
              </div>
              <div className="window-content">
                <Experience />
              </div>
            </section>

            <section id="skills" className="window">
              <div className="window-header">
                <span>SKILLS.TXT</span>
              </div>
              <div className="window-content">
                <Skills />
              </div>
            </section>

            <section id="projects" className="window">
              <div className="window-header">
                <span>PROJECTS.TXT</span>
              </div>
              <div className="window-content">
                <Projects />
              </div>
            </section>
          </div>

          <Contact />

          <div className="gb-ab" aria-hidden="true">
            <span>B</span>
            <span>A</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
