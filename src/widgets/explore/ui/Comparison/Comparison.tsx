import { useState } from "react";

import styles from "./Comparison.module.scss";

export default function Comparison() {
  const [position, setPosition] = useState(50);

  return (
    <div className={styles.comparison}>
      <div className={styles["comparison__before-image"]} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          src="/img/explore/img-before.jpg"
          alt="Painting before restoration"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles["comparison__after-image"]}>
        <img
          src="/img/explore/img-after.jpg"
          alt="Painting after restoration"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <input
        className={styles.comparison__range}
        type="range"
        min={0}
        max={100}
        value={position}
        aria-label="Compare painting before and after restoration"
        aria-valuetext={`${position}% before restoration`}
        onChange={(event) => setPosition(event.currentTarget.valueAsNumber)}
      />
      <div className={styles.comparison__handle} style={{ left: `${position}%` }} aria-hidden="true">
        <img
          src="/img/explore/img-cursor.png"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
