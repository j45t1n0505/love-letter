import { motion } from 'framer-motion';

function EndingScene() {
  return (
    <motion.section
      className="ending-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <h2>Selamanya Bahagia ❤️</h2>
      <p>Setiap detak kisah ini tetap milik kita berdua.</p>
    </motion.section>
  );
}

export default EndingScene;
