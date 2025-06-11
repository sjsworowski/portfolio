const experiences = [
  {
    date: '2020 — PRESENT',
    title: 'Software Engineer',
    company: 'Rayner',
    companyUrl: 'https://www.rayner.com/',
    roles: ['Project Engineer', 'Digital Health Engineer', 'Software Engineer'],
    description:
      "Led the end-to-end development of RayTrace, Rayner’s intraocular lens (IOL) calculation platform, from initial design through development and deployment. Built the platform using NestJS and TypeScript, and served as the project lead and developer. Also developed automation tools in Python for data gathering and validation, and applied Power BI for analytics across RayTrace and other Rayner platforms. Additional work included creating algorithms for lens calculation improvements and engaging directly with surgeons to refine IOL models.",
    tech: ['Full-Stack Engineering', 'Data Automation', 'NestJS', 'Python', 'Typescript', 'Power BI', 'MATLAB', 'Ruby On Rails', 'HTML & CSS'],
  },
  {
    date: '2019 — 2019',
    title: 'Engineer Intern',
    company: 'Kingkraft Ltd',
    companyUrl: 'https://www.kingkraft.co.uk/',
    roles: ['Engineer Intern'],
    description:
      'Designed a tilt system for a shower trolley using 3D CAD modelling, then prototyped and refined the design. Created technical drawings for fabrication and developed a custom latch mechanism using proprietary technology, updating the CAD assembly to integrate the new component.',
    tech: [
      '3D CAD Modelling',
      'Creo',
      'Technical Drawing',
      'Prototyping',
      'Design for Manufacture (DFM)',
    ],
  },
  {
    date: '2018 — 2018',
    title: 'Biomedical Engineer',
    company: 'Advanced Medical Research Centre (AMRC)',
    companyUrl: 'https://www.amrc.co.uk/',
    roles: ['Summer Placement'],
    description:
      'Independently developed a new orthopaedic fixation system to replace bicortical screws using 3D CAD modelling and 3D printing for prototyping. Conducted mechanical pullout tests to evaluate performance and contributed to the initial prototype of a mobility device.',
    tech: [
      '3D CAD Modelling',
      'Additive Manufacturing / 3D Printing',
      'Medical Device Design',
      'Proof of Concept Development',
      'Mechanical Testing',
    ],
  },
];

const Experience = () => {
  return (
    <section className="container">
      {/* Replace Bootstrap row/col with CSS Grid */}
      <div
        className="experience-grid"
        style={{
          display: 'grid',
          gap: '2rem',
        }}
      >
        {experiences.map((exp, idx) => (
          <div key={idx}>
            <div
              className="bg-success bg-opacity-25 p-4 tech-tag-btn">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(120px, 180px) 1fr',
                  gap: '1rem',
                  alignItems: 'start',
                }}
                className="experience-inner-grid"
              >
                {/* Date Column */}
                <div>
                  <span className="text-xl text-success text-opacity-75 font-monospace">
                    {exp.date}
                  </span>
                </div>
                {/* Main Content Column */}
                <div>
                  {/* 1. Title & Company */}
                  <div className="d-flex align-items-baseline flex-wrap gap-2 mb-1">
                    <span className="text-xl fw-bold text-success-emphasis mr-2">
                      {exp.title}
                    </span>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fw-semibold inline-flex items-center company-link group underline"
                      style={{
                        position: 'relative',
                        textDecorationColor: 'var(--crt-header-text)',
                        transition: 'color 0.2s'
                      }}
                    >
                      {exp.company}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="var(--crt-header-text)" // Use the same accent color
                        viewBox="0 0 24 24"
                        style={{
                          opacity: 1,
                          transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.2s, stroke 0.2s',
                          marginLeft: '0.25rem',
                          transform: 'rotate(180deg) translate(0, 0)'
                        }}
                        className="company-link-arrow"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 7l-10 10m0-6v6h6"
                        />
                      </svg>
                    </a>
                  </div>
                  {/* Subtle roles progression for Rayner */}
                  {exp.roles && exp.roles.length > 1 && (
                    <div className="mb-1 d-flex align-items-center gap-1 small text-success-emphasis opacity-70">
                      {exp.roles.map((role, i) => (
                        <span key={role} style={{
                          fontWeight: i === exp.roles.length - 1 ? 'bold' : 'normal',
                          opacity: i === exp.roles.length - 1 ? 1 : 0.6,
                          fontSize: i === exp.roles.length - 1 ? '1em' : '0.95em',
                          letterSpacing: '0.01em',
                        }}>
                          {role}
                          {i < exp.roles.length - 1 && (
                            <span style={{
                              margin: '0 0.3em',
                              fontWeight: 'normal',
                              opacity: 0.4,
                              fontSize: '1.1em'
                            }}>→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* 2. Description */}
                  <p className="text-success-emphasis mb-2 small opacity-90">
                    {exp.description}
                  </p>
                  {/* 3. Tech Tags */}
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="tech-tag-btn"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          .company-link-arrow {
            transition: transform 0.3s cubic-bezier(.4,2,.6,1), opacity 0.2s, stroke 0.2s;
          }
          .company-link:hover,
          .company-link:focus {
            color: var(--crt-text) !important;
            text-decoration-color: var(--crt-text) !important;
          }
          .company-link:hover .company-link-arrow,
          .company-link:focus .company-link-arrow {
            stroke: var(--crt-text) !important;
            transform: rotate(180deg) translateX(-4px) translateY(4px) !important;
          }
          .company-link .company-link-arrow {
            stroke: var(--crt-header-text);
          }
        `}
      </style>
    </section>
  );
};

export default Experience;
