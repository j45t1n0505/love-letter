import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa';

function Envelope({ onOpen, isOpen }) {
  return (
    <motion.button
      type="button"
      className={`envelope-card ${isOpen ? 'opened' : ''}`}
      onClick={onOpen}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      aria-label="Open the love letter"
    >
      <motion.div
        className="envelope-flap"
        animate={isOpen ? { rotateX: 180, y: 6 } : { rotateX: 0, y: 0 }}
        transition={{ duration: 0.8 }}
      />
      <div className="envelope-paper">
        <FaHeart className="heart-icon" />
        <span>Open me</span>
        <FaStar className="sparkle-icon" />
      </div>
    </motion.button>
  );
}

export default Envelope;
