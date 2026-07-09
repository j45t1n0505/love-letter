import { motion } from 'framer-motion';
import { timelineItems } from '../../data/timeline';

function Timeline() {
  return (
    <section className="timeline-card">
      <div className="section-heading">
        <p className="eyebrow">Kisah kecil kita</p>
        <h2>Momen yang menjadi selamanya</h2>
      </div>
      <div className="timeline-list">
        {timelineItems.map((item, index) => (
          <motion.article
            key={item.title}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            <div className="timeline-dot" />
            <div className="timeline-body">
              <p className="timeline-date">{item.date}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Timeline;
