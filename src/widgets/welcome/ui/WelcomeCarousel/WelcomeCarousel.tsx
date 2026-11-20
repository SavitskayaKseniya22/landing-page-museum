import { useEffect, useState, useSyncExternalStore } from "react";

import styles from "./WelcomeCarousel.module.scss";

const images = [
  "/img/welcome/img-1.jpg",
  "/img/welcome/img-2.jpg",
  "/img/welcome/img-3.jpg",
  "/img/welcome/img-4.jpg",
  "/img/welcome/img-5.jpg",
];

enum AnimationType {
  LEFT,
  RIGHT,
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function WelcomeCarousel() {
  const [slide, setSlide] = useState({
    active: 0,
    next: 1,
    prev: images.length - 1,
  });

  const prefersReducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, () => false);
  const [pauseOverride, setPauseOverride] = useState<boolean | null>(null);
  const isPaused = pauseOverride ?? prefersReducedMotion;
  const [onTransition, setOnTransition] = useState<AnimationType | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (onTransition !== null) {
      timeout = setTimeout(() => {
        const ref = onTransition;
        setOnTransition(null);
        if (ref === AnimationType.LEFT) {
          setSlide((a) => {
            const next = a.active < images.length - 1 ? a.active + 1 : 0;
            const nextNext = next < images.length - 1 ? next + 1 : 0;
            return { active: next, next: nextNext, prev: a.active };
          });
        } else {
          setSlide((a) => {
            const prev = a.active > 0 ? a.active - 1 : images.length - 1;
            const prevPrev = prev > 0 ? prev - 1 : images.length - 1;
            return { active: prev, next: a.active, prev: prevPrev };
          });
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [onTransition]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (onTransition === null) {
        setOnTransition(AnimationType.LEFT);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [onTransition, isPaused]);

  return (
    <div className={styles["welcome-carousel"]}>
      <div className={styles["welcome-carousel__viewport"]}>
        <ul
          className={`${styles["welcome-carousel__track"]} ${
            onTransition === AnimationType.LEFT ? styles["welcome-carousel__track--moving-left"] : ""
          }  ${onTransition === AnimationType.RIGHT ? styles["welcome-carousel__track--moving-right"] : ""}`}
        >
          <li>
            <img
              src={images[slide.prev] || images[4]}
              alt="Carousel image"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              loading="lazy"
              decoding="async"
            />
          </li>
          <li>
            <img
              src={images[slide.active] || images[0]}
              alt="Carousel image"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              loading="lazy"
              decoding="async"
            />
          </li>
          <li>
            <img
              src={images[slide.next] || images[1]}
              alt="Carousel image"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              loading="lazy"
              decoding="async"
            />
          </li>
        </ul>
      </div>

      <div className={styles["welcome-carousel__controls"]}>
        <div>
          <span>{slide.active + 1}</span>
          <span> | </span>
          <span>{images.length}</span>
        </div>

        <div className={styles["welcome-carousel__pagination"]}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={slide.active === index ? "true" : undefined}
              className={`${slide.active === index ? styles["welcome-carousel__page-button--active"] : ""} ${styles["welcome-carousel__page-button"]}`}
              onClick={() =>
                setSlide({
                  active: index,
                  next: (index + 1) % images.length,
                  prev: (index + images.length - 1) % images.length,
                })
              }
              disabled={onTransition !== null}
            />
          ))}
        </div>

        <div className={styles["welcome-carousel__navigation"]}>
          <button
            type="button"
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
            aria-pressed={isPaused}
            onClick={() => setPauseOverride(!isPaused)}
          >
            {isPaused ? "▶" : "Ⅱ"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOnTransition(AnimationType.RIGHT);
            }}
            disabled={onTransition !== null}
          >
            <img
              src="/svg/icon-arrow-welcome-left.svg"
              alt="Arrow to the left"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              loading="lazy"
              decoding="async"
            />
          </button>

          <button
            type="button"
            onClick={() => {
              setOnTransition(AnimationType.LEFT);
            }}
            disabled={onTransition !== null}
          >
            <img
              src="/svg/icon-arrow-welcome-right.svg"
              alt="Arrow to the right"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCarousel;
