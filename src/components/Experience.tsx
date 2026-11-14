const experiences = [
  {
    company: 'Rayner',
    companyUrl: 'https://www.rayner.com/',
    tech: ['Full-Stack Engineering', 'Data Automation', 'NestJS', 'Python', 'Typescript', 'Power BI', 'MATLAB', 'Ruby On Rails', 'HTML & CSS'],
    positions: [
      {
        date: '2025 — PRESENT',
        title: 'Software Engineer',
        description: 'Develop and maintain Rayner’s digital health software, used by surgeons worldwide. Implemented analytics with Power BI to monitor platform performance and improve clinical decision tools. Enhanced RayTrace IOL calculator by streamlining backend logic and improving UX based on user feedback.',
      },
      {
        date: '2022 — 2025',
        title: 'Digital Health Engineer',
        description: 'Led successful delivery of RayTrace v4, a next-gen IOL calculator with 15K+ monthly calculations globally. Managed full development lifecycle: requirement gathering, design, testing, and stakeholder feedback loops. Collaborated with surgeons to ensure ease of use and usability for clinical application.',
      },
      {
        date: '2020 — 2022',
        title: 'Project Engineer',
        description: 'Designed Python automation tools that scraped calculations for improvement of algorithms. Prototyped RayTrace update in Ruby on Rails environments to test model robustness before production. Analyzed postoperative datasets in MATLAB, driving parameter adjustments that improved outcome predictions. Hands-on lens manufacturing using lathes and mills.',
      },
      
    ],
  },
  {
    company: 'Kingkraft Ltd',
    companyUrl: 'https://www.kingkraft.co.uk/',
    tech: [
      '3D CAD Modelling',
      'Creo',
      'Technical Drawing',
      'Prototyping',
      'Design for Manufacture (DFM)',
    ],
    positions: [
      {
        date: '2019 — 2019',
        title: 'Engineer Intern',
        description:
          'Designed a tilt system for a shower trolley using 3D CAD modelling, then prototyped and refined the design. Created technical drawings for fabrication and developed a custom latch mechanism using proprietary technology, updating the CAD assembly to integrate the new component.',
      },
    ],
  },
  {
    company: 'Advanced Medical Research Centre (AMRC)',
    companyUrl: 'https://www.amrc.co.uk/',
    tech: [
      '3D CAD Modelling',
      'Additive Manufacturing / 3D Printing',
      'Medical Device Design',
      'Proof of Concept Development',
      'Mechanical Testing',
    ],
    positions: [
      {
        date: '2018 — 2018',
        title: 'Biomedical Engineer',
        description:
          'Independently developed a new orthopaedic fixation system to replace bicortical screws using 3D CAD modelling and 3D printing for prototyping. Conducted mechanical pullout tests to evaluate performance and contributed to the initial prototype of a mobility device.',
      },
    ],
  },
];

const Experience = () => {
  return (
    <section className="container">
      <div className="experience-grid">
        {experiences.map((exp) => (
          <article key={exp.company} className="exp-block">
            <header className="exp-company">
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="company-link"
              >
                {exp.company}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="company-link-arrow"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 7l-10 10m0-6v6h6"
                  />
                </svg>
              </a>
            </header>

            {exp.positions.map((pos) => (
              <div key={pos.title} className="exp-position">
                <div className="exp-date">{pos.date}</div>
                <h3 className="exp-title">{pos.title}</h3>
                <p className="exp-description">{pos.description}</p>
              </div>
            ))}

            <div className="exp-tags">
              {exp.tech.map((tech) => (
                <span key={tech} className="tech-tag-btn">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;

