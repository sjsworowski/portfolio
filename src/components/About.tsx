import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div>
              <p className="text-tertiary mb-6">
                I'm a detail-oriented and driven <b>Software Engineer</b> with a background in <b>bioengineering</b> and a strong foundation in engineering mathematics. I currently lead the development of RayTrace, a clinical IOL calculation platform at Rayner Intraocular Lenses, where I work across the full stack using <b>NestJS</b>, <b>TypeScript</b>, and <b>Power BI</b> for data analysis and reporting.
              </p>
              <p className="text-tertiary">
                With experience spanning <b>medical device design</b>, <b>algorithm development</b>, and <b>web application architecture</b>, I’m passionate about building software that improves healthcare outcomes. I enjoy combining technical problem-solving with an understanding of clinical needs, and I’m always looking to apply my skills to projects at the intersection of technology and medicine.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;