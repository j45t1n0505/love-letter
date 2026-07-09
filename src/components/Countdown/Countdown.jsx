import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

function Countdown() {
  const startDate = new Date('2026-01-01T00:00:00').getTime();
  const timePassed = useCountdown(startDate);

  return (
    <section className="countdown-card">
      <p className="eyebrow">Cinta yang terhitung sejak</p>
      <h2>Setiap detik bersama kamu</h2>
      <div className="countdown-grid">
        {Object.entries(timePassed).map(([unit, value]) => (
          <motion.div key={unit} className="countdown-box" whileHover={{ scale: 1.05, y: -4 }}>
            <span className="countdown-value">{String(value).padStart(2, '0')}</span>
            <span className="countdown-label">{unit}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Countdown;
