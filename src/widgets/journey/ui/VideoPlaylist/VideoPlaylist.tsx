import { useEffect, useState } from "react";

import styles from "./VideoPlaylist.module.scss";
import Player from "../Player/Player";

enum AnimationType {
  LEFT,
  RIGHT,
}

const widthSliderItem = [454, 300, 354, 180, 130];
const gaps = [40, 40, 20, 20, 20];
const transitionTime = 0.25;

function VideoPlaylist({ content }: { content: Array<number> }) {
  const [slide, setSlide] = useState(0);

  const [onTransition, setOnTransition] = useState<AnimationType | null>(null);

  const [widthRange, setWidthRange] = useState<null | 0 | 1 | 2 | 3 | 4>(null);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width } = window;
      if (width >= 1920) {
        setWidthRange(0);
      } else if (width < 1920 && width >= 1024) {
        setWidthRange(1);
      } else if (width < 1024 && width >= 768) {
        setWidthRange(2);
      } else if (width < 768 && width >= 420) {
        setWidthRange(3);
      } else if (width < 420) {
        setWidthRange(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (onTransition !== null) {
      timeout = setTimeout(() => {
        const ref = onTransition;
        setOnTransition(null);

        if (ref === AnimationType.LEFT) {
          setSlide((a) => (a < content.length - 1 ? a + 1 : 0));
        } else {
          setSlide((a) => (a > 0 ? a - 1 : content.length - 1));
        }
      }, transitionTime * 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [content.length, onTransition]);

  return (
    <div className={styles["video-playlist"]}>
      <Player key={slide} number={content[slide]} />
      <div className={styles["video-playlist__viewport"]}>
        {widthRange !== null && (
          <ul
            style={{
              left: `-${(() => {
                if (slide < 0) {
                  return 0;
                }

                if (slide === content.length - 1 && widthRange < 2) {
                  return widthSliderItem[widthRange] * (slide - 2) + gaps[widthRange] * (slide - 2);
                }

                if (
                  (slide === content.length - 2 && widthRange < 2) ||
                  (slide === content.length - 1 && widthRange >= 2)
                ) {
                  return widthSliderItem[widthRange] * (slide - 1) + gaps[widthRange] * (slide - 1);
                }

                if (slide <= content.length - 3 || (slide === content.length - 2 && widthRange >= 2)) {
                  return widthSliderItem[widthRange] * slide + gaps[widthRange] * slide;
                }

                return 0;
              })()}px`,
              gap: gaps[widthRange],
              transform: `translateX(${onTransition === AnimationType.LEFT ? -widthSliderItem[widthRange] - gaps[widthRange] : onTransition === AnimationType.RIGHT ? widthSliderItem[widthRange] + gaps[widthRange] : 0}px)`,
              transition: `${transitionTime}s`,
            }}
          >
            {content.map((item, i) => (
              <li
                className={`${styles["video-playlist__item"]} ${slide === i ? styles["video-playlist__item--active"] : ""}`}
                style={{ width: widthSliderItem[widthRange] }}
                key={item}
              >
                <button
                  type="button"
                  aria-label={`Select video ${i + 1}`}
                  aria-pressed={slide === i}
                  disabled={onTransition !== null}
                  onClick={() => setSlide(i)}
                >
                  <img
                    src={`/video/poster${item}.jpg`}
                    alt="Louvre video poster"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                    loading="lazy"
                    decoding="async"
                  />

                  <img
                    src="/svg/icon-play.svg"
                    width={45}
                    height={45}
                    alt="Play"
                    className={styles["video-playlist__play-icon"]}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles["video-playlist__controls"]}>
        <button
          type="button"
          onClick={() => {
            if (slide > 0) {
              setOnTransition(AnimationType.RIGHT);
            }
          }}
          disabled={onTransition !== null || slide === 0}
        >
          <img
            src="/svg/icon-arrow_left.svg"
            alt="Arrow to the left"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </button>

        <button
          type="button"
          onClick={() => {
            if (slide < content.length - 1) {
              setOnTransition(AnimationType.LEFT);
            }
          }}
          disabled={onTransition !== null || slide >= content.length - 1}
        >
          <img
            src="/svg/icon-arrow_right.svg"
            alt="Arrow to the right"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    </div>
  );
}

export default VideoPlaylist;
