// Placeholder skills and levels (out of 10). Replace with real values.
const skills = [
  { category: 'LANGUAGES', items: [
    { name: 'Python', level: 9 },
    { name: 'TypeScript', level: 7 },
    { name: 'SQL', level: 6 },
    { name: 'MATLAB', level: 8 },
  ]},
  { category: 'FRONT END', items: [
    { name: 'Angular', level: 7 },
    { name: 'React', level: 4 },
  ]},
  { category: 'BACK END', items: [
    { name: 'Node.js', level: 7 },
    { name: 'NestJS', level: 8 },
  ]},
  { category: 'TOOLS', items: [
    { name: 'Git', level: 7 },
    { name: 'Docker', level: 5 },
    { name: 'Power BI', level: 8 },
    { name: 'CAD Modeling', level: 8 },
    { name: 'Figma', level: 7 }
  ]},
];

const TOTAL_SEGMENTS = 10;

const Skills = () => (
  <div className="skills">
    {skills.map((group) => (
      <div key={group.category} className="skills-group">
        <h3 className="skills-category">{group.category}</h3>
        {group.items.map((skill) => (
          <div key={skill.name} className="skill-row">
            <span className="skill-name">{skill.name}</span>
            <div className="skill-bar" role="img" aria-label={`${skill.name} level ${skill.level} of ${TOTAL_SEGMENTS}`}>
              {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => (
                <span key={i} className={i < skill.level ? 'skill-seg skill-seg-on' : 'skill-seg'} />
              ))}
            </div>
            <span className="skill-level">{skill.level}/{TOTAL_SEGMENTS}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default Skills;
