import { useEffect, useState } from 'react';

export function useCountdown(startDate) {
  const [timePassed, setTimePassed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = Date.now();
      const elapsed = now - startDate;

      if (elapsed <= 0) {
        setTimePassed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimePassed({
        days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
        hours: Math.floor((elapsed / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((elapsed / (1000 * 60)) % 60),
        seconds: Math.floor((elapsed / 1000) % 60),
      });
    };

    updateElapsedTime();
    const interval = window.setInterval(updateElapsedTime, 1000);

    return () => window.clearInterval(interval);
  }, [startDate]);

  return timePassed;
}
