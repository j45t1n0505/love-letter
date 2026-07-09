import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loveQuotes } from '../../data/quotes';

function Quotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % loveQuotes.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="quotes-card">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={loveQuotes[index]}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.97 }}
          transition={{ duration: 0.6 }}
        >
          “{loveQuotes[index]}”
        </motion.blockquote>
      </AnimatePresence>
    </section>
  );
}

export default Quotes;
