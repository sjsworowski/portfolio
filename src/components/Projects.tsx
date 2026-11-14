import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "RayTrace",
      description: "RayTrace is a web app for accurate intraocular lens (IOL) calculation and lens selection, helping improve patient outcomes in cataract surgery.",
      tech: ["NestJS", "Typescript", "PostgreSQL", "API"],
      demo: "https://raytrace.rayner.com",
      image: "raytrace.png"
    },
    {
      title: "Orthopaedic Fixation System",
      description: "A novel orthopaedic fixation system designed to replace traditional bicortical screws, developed through 3D CAD modelling, prototyping, strength testing.",
      tech: ["3D Modelling", "Additive Manufacturing", "Prototyping", "Mechanical Testing"],
      image: "screw.jpg"
    },
    {
      title: "3D Printing",
      description: "As a hobbyist, I use 3D printing to design and create practical objects, including a custom greenhouse for plants and various other items.",
      tech: [
        "Fusion 360",
        "CAD",
        "FDM",
        "Rapid Prototyping",
      ],
      image: "greenhouse.jpg"
    },
    {
      title: "Learn Chinese Website",
      description: "A website to help users learn Chinese, featuring interactive lessons, quizzes, and progress tracking.",
      tech: ["Angular", "TypeScript", "NestJS",],
      demo: "https://learn-chinese-15859.web.app/",
      image: "learn_chinese.jpg"
    },
    {
      title: "Retro Mini PC for Cat",
      description: "A custom-built retro mini PC designed specifically for my cat, featuring a cozy enclosure and interactive elements.",
      tech: ["Raspberry Pi", "3D Printing", "Electronics", "Python", "DIY"],
      image: "retro_mini_pc.jpg"
    },
    {
      title: "Home Automation Kettle Servo",
      description: "My first electronics project that controls a kettle using a servo motor with an ESP32, enabling remote operation and scheduling using Alexa.",
      tech: ["Arduino", "Servo Motor", "Home Automation", "IoT"],
      image: "kettle_servo.jpg"
    }
  ];

  // Show the first few projects, with a toggle to reveal the rest as more are added
  const INITIAL_COUNT = 3;
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  // Scroll-driven colour: each image's --focus is 1 at the centre of the screen and fades to 0 away from it (used on mobile)
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const containers = gridRef.current?.querySelectorAll<HTMLElement>('.project-image-container');
      if (!containers) return;
      const mid = window.innerHeight / 2;
      const reach = window.innerHeight * 0.45;
      containers.forEach((el) => {
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - mid);
        el.style.setProperty('--focus', Math.max(0, 1 - dist / reach).toFixed(2));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [showAll]);

  return (
    <section id="projects">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="project-grid" ref={gridRef}>
            {visibleProjects.map((project) => {
              const projectLink = project.demo || project.github || undefined;
              const isClickable = !!projectLink;

              const cardContent = (
                <>
                  {/* Project image */}
                  <div className="w-full flex items-center justify-center mb-4 project-image-container">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                    {/* Full-colour copy that fades in on hover */}
                    <img
                      src={project.image}
                      alt=""
                      aria-hidden="true"
                      className="project-image project-image-color"
                    />
                  </div>
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-semibold text-light mr-2">{project.title}</h3>
                    {isClickable && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="var(--crt-accent)"
                        viewBox="0 0 24 24"
                        style={{
                          opacity: 1,
                          transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.2s, stroke 0.2s',
                          marginLeft: '0.1rem',
                          transform: 'rotate(180deg) translate(0, 0)'
                        }}
                        className="project-link-arrow"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 7l-10 10m0-6v6h6"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-tertiary mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag-btn">
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              );

              return isClickable ? (
                <a
                  key={project.title}
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card group block"
                  tabIndex={0}
                  aria-label={`Open ${project.title} project`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {cardContent}
                </a>
              ) : (
                <div
                  key={project.title}
                  className="project-card"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
          {projects.length > INITIAL_COUNT && (
            <div className="flex justify-center mt-8">
              <button
                type="button"
                className="btn"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
              >
                {showAll ? 'SHOW LESS' : `SHOW ALL ${projects.length} PROJECTS`}
              </button>
            </div>
          )}
        </motion.div>
      </div>
      <style>
        {`
          .project-link-arrow {
            transition: transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.2s, stroke 0.2s;
          }
          .group:hover .project-link-arrow,
          .group:focus .project-link-arrow {
            stroke: var(--crt-header-text) !important;
            transform: rotate(180deg) translateX(-4px) translateY(4px) !important;
          }
        `}
      </style>
    </section>
  );
};

export default Projects;