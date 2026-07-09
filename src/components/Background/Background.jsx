import { useMemo } from 'react';

function Background() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        duration: `${10 + Math.random() * 20}s`,
        delay: `${Math.random() * 8}s`,
        size: `${14 + Math.random() * 24}px`,
        opacity: 0.2 + Math.random() * 0.7,
        rotate: `${Math.random() * 360}deg`,
        blur: `${Math.random() * 3}px`,
      })),
    [],
  );

  return (
    <div className="background-layer" aria-hidden="true">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="constellation" />
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            filter: `blur(${heart.blur})`,
            transform: `rotate(${heart.rotate})`,
          }}
        >
          ♥
        </div>
      ))}
      <div className="soft-glow" />
    </div>
  );
}

export default Background;
