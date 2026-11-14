import { useEffect, useState } from 'react';

const menu = [
  { name: 'ABOUT', key: 'about' },
  { name: 'EXPERIENCE', key: 'experience' },
  { name: 'SKILLS', key: 'skills' },
  { name: 'PROJECTS', key: 'projects' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(menu[0].key);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -110;
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
          const offset = 120;
          const distance = Math.abs(rect.top - offset);

          if (rect.top <= offset && distance < minDistance) {
            minDistance = distance;
            currentActiveSection = item.key;
          }
        }
      }

      if (
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10
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

  return (
    <nav className="gb-tabs" aria-label="Sections">
      {menu.map((item) => (
        <button
          key={item.key}
          onClick={() => scrollToSection(item.key)}
          className={`btn ${activeSection === item.key ? 'nav-link-active' : ''}`}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
