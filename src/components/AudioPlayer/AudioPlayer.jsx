import { useEffect, useMemo, useRef, useState } from 'react';
import { FaPause, FaPlay, FaRedo, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import { Howl } from 'howler';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [trackIndex, setTrackIndex] = useState(0);
  const soundRef = useRef(null);

  const tracks = useMemo(
    () => ['/music/Shape of My Heart.wav'],
    [],
  );

  useEffect(() => {
    const sound = new Howl({
      src: [tracks[trackIndex]],
      html5: true,
      loop: true,
      volume,
      onplay: () => {
        setIsPlaying(true);
        const update = () => {
          if (sound.playing()) {
            setProgress((sound.seek() / sound.duration()) * 100);
            requestAnimationFrame(update);
          }
        };
        update();
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onend: () => setIsPlaying(false),
    });

    soundRef.current = sound;
    return () => sound.unload();
  }, [trackIndex, volume, tracks]);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  const togglePlayback = () => {
    if (!soundRef.current) {
      return;
    }

    if (soundRef.current.playing()) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const nextTrack = () => {
    const next = (trackIndex + 1) % tracks.length;
    setTrackIndex(next);
  };

  const prevTrack = () => {
    const prev = (trackIndex - 1 + tracks.length) % tracks.length;
    setTrackIndex(prev);
  };

  return (
    <section className="music-card" aria-label="Pemutar musik">
      <div className="music-info">
        <p className="music-label">Biar ku tunjukkan bentuk hati yang sesungguhnya</p>
        <h3>Shape Of My Heart</h3>
      </div>
      <div className="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="player-controls">
        <button type="button" className="icon-button" onClick={prevTrack} aria-label="Lagu sebelumnya">
          <FaStepBackward />
        </button>
        <button type="button" className="icon-button play-button" onClick={togglePlayback} aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button type="button" className="icon-button" onClick={nextTrack} aria-label="Lagu berikutnya">
          <FaStepForward />
        </button>
        <button type="button" className="icon-button" aria-label="Ulangi lagu">
          <FaRedo />
        </button>
      </div>
      <label className="volume-row" htmlFor="volume">
        <FaVolumeUp />
        <input id="volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
      </label>
    </section>
  );
}

export default AudioPlayer;
