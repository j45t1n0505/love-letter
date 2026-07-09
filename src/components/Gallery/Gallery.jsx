import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { galleryItems } from '../../data/gallery';

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="gallery-card">
      <div className="section-heading">
        <p className="eyebrow">Wajah indah yang terabadikan</p>
        <h2>Cantik Yang Ku Suka</h2>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <motion.button
            type="button"
            key={item.title}
            className="photo-frame"
            onClick={() => setActiveIndex(index)}
            whileHover={{ scale: 1.04, rotate: 1.2, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="photo-surface" style={{ backgroundImage: `url(${item.src})` }} />
            <div className="photo-overlay">
              <FaHeart />
            </div>
            <div className="photo-caption">
              <h3>{item.title}</h3>
              <p>{item.label}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="modal-close" onClick={() => setActiveIndex(null)} aria-label="Tutup foto">
                <FaTimes />
              </button>
              <div className="modal-surface" style={{ backgroundImage: `url(${galleryItems[activeIndex].src})` }} />
              <div className="modal-copy">
                <h3>{galleryItems[activeIndex].title}</h3>
                <p>{galleryItems[activeIndex].label}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
