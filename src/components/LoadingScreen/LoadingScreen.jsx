import { motion } from 'framer-motion';

function LoadingScreen({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="loading-heart"
        animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ♥
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Love Loading
      </motion.h1>
      <p>Membuka momen terindahmu</p>
    </motion.div>
  );
}

export default LoadingScreen;
