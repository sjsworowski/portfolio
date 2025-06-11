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
      tech: ["Nest.js", "Typescript", "PostgreSQL", "API", "Automation"],
      demo: "https://raytrace.rayner.com",
      image: "raytrace.png"
    },
    {
      title: "Orthopaedic Fixation System",
      description: "A novel orthopaedic fixation system designed to replace traditional bicortical screws, developed through 3D CAD modelling and prototyping.",
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
  ];

  return (
    <section id="projects">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const projectLink = project.demo || project.github || undefined;
              const isClickable = !!projectLink;

              const cardContent = (
                <>
                  {/* Project image */}
                  <div
                    className="w-full flex items-center justify-center mb-4 rounded"
                    style={{
                      height: 'clamp(90px, 25vw, 160px)',
                      minHeight: '90px',
                      maxHeight: '160px',
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover rounded"
                      style={{
                        width: 'clamp(90px, 100%, 240px)',
                        height: '100%',
                        maxHeight: '160px',
                        minHeight: '90px',
                        objectFit: 'cover',
                      }}
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
                  className="bg-primary/50 p-6 tech-tag-btn block rounded transition-shadow duration-150 hover:shadow-lg focus:shadow-lg outline-none cursor-pointer group"
                  tabIndex={0}
                  aria-label={`Open ${project.title} project`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {cardContent}
                </a>
              ) : (
                <div
                  key={project.title}
                  className="bg-primary/50 p-6 tech-tag-btn rounded"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
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