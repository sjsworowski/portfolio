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
                Software Engineer with a Bioengineering background and strong programming, analytical, and problem-solving skills. Experienced in ophthalmic medical device development and promoted two times at Rayner. Proven record of delivering high-impact projects like RayTrace v4. Passionate about using tech to improve patient outcomes and healthcare tools.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;