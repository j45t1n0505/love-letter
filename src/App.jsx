import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import './App.css';
import Background from './components/Background/Background';
import CursorEffect from './components/CursorEffect/CursorEffect';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Envelope from './components/Envelope/Envelope';
import LoveLetter from './components/LoveLetter/LoveLetter';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Timeline from './components/Timeline/Timeline';
import Gallery from './components/Gallery/Gallery';
import Countdown from './components/Countdown/Countdown';
import Quotes from './components/Quotes/Quotes';
import EndingScene from './components/EndingScene/EndingScene';

function App() {
  const [loading, setLoading] = useState(true);
  const [letterOpened, setLetterOpened] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2400);
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true, smoothTouch: false });

    let frame = 0;
    let hoverScrollFrame = 0;

    const raf = (time) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    const handlePointerMove = (event) => {
      const { clientY } = event;
      const threshold = 110;
      const viewportHeight = window.innerHeight;
      const edge = clientY < threshold ? -1 : clientY > viewportHeight - threshold ? 1 : 0;

      if (!edge || window.innerWidth < 900) {
        return;
      }

      if (hoverScrollFrame) {
        window.cancelAnimationFrame(hoverScrollFrame);
      }

      hoverScrollFrame = window.requestAnimationFrame(() => {
        const target = lenis.animatedScroll + edge * 38;
        lenis.scrollTo(target, { duration: 0.45, easing: (value) => 1 - Math.pow(1 - value, 3) });
      });
    };

    frame = window.requestAnimationFrame(raf);
    window.addEventListener('mousemove', handlePointerMove);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('mousemove', handlePointerMove);
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(hoverScrollFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-shell">
      <Background />
      <CursorEffect />

      <AnimatePresence>
        {loading && <LoadingScreen visible={loading} />}
      </AnimatePresence>

      <main className={`page-content ${loading ? 'is-hidden' : ''}`}>
        <motion.section
          className="hero-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="hero-card">
            <p className="eyebrow">Surat cinta khusus untukmu</p>
            <h1>Untuk sosok yang membuat setiap momen biasa terasa lembut, hangat, dan tak terbatas.</h1>
            <p className="hero-copy">
              Momen kecil ini terbuka seperti mengungkapkan surat cinta yang dipenuhi gerak, kehangatan, dan sentuhan lembut di malam yang tenang.
            </p>

            <div className="hero-actions">
              <Envelope onOpen={() => setLetterOpened(true)} isOpen={letterOpened} />
              <AudioPlayer />
            </div>
          </div>

          <LoveLetter opened={letterOpened} />
        </motion.section>

        <section className="story-stack">
          <Countdown />
          <Quotes />
          <Timeline />
          <Gallery />
          <EndingScene />
        </section>
      </main>
    </div>
  );
}

export default App;
