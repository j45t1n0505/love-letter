import { useEffect, useState } from 'react';

function CursorEffect() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const handleMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    const handleClick = (event) => {
      const newBurst = {
        id: Date.now() + Math.random(),
        x: event.clientX,
        y: event.clientY,
      };
      setBursts((prev) => [...prev, newBurst]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((item) => item.id !== newBurst.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-heart"
        style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
        aria-hidden="true"
      >
        ♥
      </div>
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="click-burst"
          style={{ left: burst.x, top: burst.y }}
          aria-hidden="true"
        >
          ✦
        </span>
      ))}
    </>
  );
}

export default CursorEffect;
