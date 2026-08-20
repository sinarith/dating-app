import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, Minus, Volume2, VolumeX } from 'lucide-react';
import coupleConfig from '../config/coupleConfig';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './MusicPlayer.scss';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useLocalStorage('jmy-music-playing', true);
  const [volume, setVolume] = useLocalStorage('jmy-music-volume', 0.4);
  const [currentTrackIndex, setCurrentTrackIndex] = useLocalStorage('jmy-music-track', 0);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef(null);

  const playlist = coupleConfig.playlist || [];
  const currentTrack = playlist[currentTrackIndex];
  const hasMusic = playlist.length > 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!hasMusic) return;

    const handleFirstUserInteraction = () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio
          .play()
          .then(() => {
            window.removeEventListener('click', handleFirstUserInteraction);
            window.removeEventListener('keydown', handleFirstUserInteraction);
            window.removeEventListener('touchstart', handleFirstUserInteraction);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstUserInteraction);
    window.addEventListener('keydown', handleFirstUserInteraction);
    window.addEventListener('touchstart', handleFirstUserInteraction);

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [hasMusic, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  if (!hasMusic) return null;

  return (
    <div className={`glass-player-wrapper ${showControls ? 'is-open' : ''}`}>
      <audio
        ref={audioRef}
        src={currentTrack?.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        preload="auto"
      />

      {/* Floating Toggle Button */}
      <button
        type="button"
        className="glass-player__toggle"
        onClick={() => setShowControls((show) => !show)}
        aria-label="Toggle Player"
      >
        {isPlaying ? (
          <Volume2 size={22} className="neon-icon" />
        ) : (
          <VolumeX size={22} className="neon-icon" />
        )}
      </button>

      {/* Glassmorphism Player Panel */}
      {showControls && (
        <div className="glass-player-panel">
          <div className="glass-player__header">
            <h3 className="glass-player__title">{currentTrack?.title || 'Our Song'}</h3>
            <p className="glass-player__artist">{currentTrack?.artist || 'Favorite Artist'}</p>
          </div>

          <div className="glass-player__timestamps">
            <span>{formatTime(currentTime)}</span>
            <span className="divider">|</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Circular Cover & Circular Progress */}
          <div className="glass-player__cover-container">
            <div
              className="glass-player__circular-progress"
              style={{
                background: `conic-gradient(#ff2a85 ${progressPercent}%, rgba(255, 255, 255, 0.15) ${progressPercent}% 100%)`,
              }}
            >
              <div className="glass-player__cover-inner">
                <img
                  src={currentTrack?.cover || '/music/cover-1.jpg'}
                  alt={currentTrack?.title || 'Album Cover'}
                  className={`glass-player__cover-img ${isPlaying ? 'is-spinning' : ''}`}
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="glass-player__actions">
            <button
              type="button"
              className="glass-btn icon-sub"
              onClick={() => setShowControls(false)}
              aria-label="Minimize"
            >
              <Minus size={18} className="neon-icon" />
            </button>

            <button type="button" className="glass-btn" onClick={handlePrev} aria-label="Previous">
              <SkipBack size={22} className="neon-icon" />
            </button>

            <button
              type="button"
              className="glass-btn play-main"
              onClick={() => setIsPlaying((playing) => !playing)}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={24} className="icon-dark" />
              ) : (
                <Play size={24} className="icon-dark" />
              )}
            </button>

            <button type="button" className="glass-btn" onClick={handleNext} aria-label="Next">
              <SkipForward size={22} className="neon-icon" />
            </button>

            <button
              type="button"
              className={`glass-btn icon-sub ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
              aria-label="Like"
            >
              <Heart size={18} className={isLiked ? 'neon-icon-active' : 'neon-icon'} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="glass-player__volume">
            <Volume2 size={14} className="neon-icon" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="glass-volume-slider"
            />
          </div>
        </div>
      )}
    </div>
  );
}