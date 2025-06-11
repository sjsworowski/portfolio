import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Hi, my name is
      </motion.p>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="hero-title"
      >
        John Doe
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="hero-subtitle"
      >
        Software Engineer
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="hero-description"
      >
        I build exceptional digital experiences that make an impact. Specializing in creating software solutions that are both beautiful and functional.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a href="#projects" className="cta-btn">
          View My Work
        </a>
      </motion.div>
    </section>
  );
};

export default Hero; 