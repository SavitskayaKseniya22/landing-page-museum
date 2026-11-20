import { useCallback, useEffect, useRef, useState } from "react";

import isVisible from "@/shared/lib/is-visible";
import styles from "./Player.module.scss";

export default function Player({ number }: { number: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const durationRangeRef = useRef<HTMLInputElement>(null);

  const togglePlayer = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setError("");
      void video.play().catch(() => setError("Playback is unavailable. Please try again."));
    } else video.pause();
  }, []);

  const toggleFullScreen = useCallback(() => {
    const container = videoContainerRef.current;
    if (!container) return;
    const request =
      document.fullscreenElement === container ? document.exitFullscreen() : container.requestFullscreen?.();
    void request?.catch(() => setError("Fullscreen is unavailable."));
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldUnmute = video.muted || video.volume === 0;
    if (shouldUnmute && video.volume === 0) video.volume = 1;
    video.muted = !shouldUnmute;
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        event.repeat ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey ||
        (target instanceof HTMLElement &&
          (target.isContentEditable || target.closest("input, select, textarea, button, a, [role='slider']"))) ||
        document.querySelector("dialog[open]")
      )
        return;
      if (!isVisible(videoContainerRef.current) && document.fullscreenElement !== videoContainerRef.current) return;
      const action = { Space: togglePlayer, KeyM: toggleSound, KeyF: toggleFullScreen }[event.code];
      if (action) {
        event.preventDefault();
        action();
      }
    };
    const handleFullscreen = () => setIsFullScreen(document.fullscreenElement === videoContainerRef.current);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, [toggleFullScreen, togglePlayer, toggleSound]);

  return (
    <div ref={videoContainerRef} className={styles.player}>
      <div className={styles.player__viewport}>
        <button
          className={styles["player__overlay-button"]}
          type="button"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={togglePlayer}
        >
          <img
            src="/svg/icon-play_big.svg"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              ...{ display: isPlaying ? "none" : "block" },
            }}
            loading="lazy"
            decoding="async"
          />
        </button>
        <video
          preload="metadata"
          playsInline
          aria-label={`Louvre video ${number + 1}`}
          poster={`/video/poster${number}.jpg`}
          className={styles.player__video}
          ref={videoRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onDurationChange={(event) => {
            const value = event.currentTarget.duration;
            setDuration(Number.isFinite(value) ? value : 0);
          }}
          onTimeUpdate={(event) => {
            if (durationRangeRef.current) durationRangeRef.current.value = String(event.currentTarget.currentTime);
          }}
          onVolumeChange={(event) => {
            setIsMuted(event.currentTarget.muted || event.currentTarget.volume === 0);
            setVolume(event.currentTarget.volume);
          }}
        >
          <source src={`/video/video${number}.mp4`} type="video/mp4" />
          <source src={`/video/video${number}.webm`} type="video/webm" />
        </video>
      </div>
      <div className={styles.player__controls}>
        <button
          className={styles["player__play-button"]}
          type="button"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={togglePlayer}
        >
          <img
            src={isPlaying ? "/svg/icon-pause.svg" : "/svg/icon-play.svg"}
            width={25}
            height={30}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </button>
        <input
          type="range"
          aria-label="Video position"
          className={styles["player__seek-range"]}
          name="remote"
          ref={durationRangeRef}
          min={0}
          max={duration}
          step={0.1}
          defaultValue={0}
          disabled={duration === 0}
          onChange={(event) => {
            if (videoRef.current) videoRef.current.currentTime = event.currentTarget.valueAsNumber;
          }}
        />
        <button
          className={styles["player__mute-button"]}
          type="button"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          aria-pressed={isMuted}
          onClick={toggleSound}
        >
          <img
            src={isMuted ? "/svg/icon-mute.svg" : "/svg/icon-volume.svg"}
            width={38}
            height={30}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </button>
        <input
          type="range"
          aria-label="Video volume"
          className={styles["player__volume-range"]}
          name="volume"
          min={0}
          max={1}
          step={0.1}
          value={isMuted ? 0 : volume}
          onChange={(event) => {
            if (videoRef.current) {
              videoRef.current.volume = event.currentTarget.valueAsNumber;
              videoRef.current.muted = false;
            }
          }}
        />
        <button
          className={styles["player__fullscreen-button"]}
          type="button"
          aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
          onClick={toggleFullScreen}
        >
          <img
            src={isFullScreen ? "/svg/icon-braces_exit.svg" : "/svg/icon-braces.svg"}
            width={35}
            height={35}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
      {error && <p role="status">{error}</p>}
    </div>
  );
}
