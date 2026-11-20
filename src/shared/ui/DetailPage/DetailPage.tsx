import { Link } from "react-router";
import { type ReactNode } from "react";

import styles from "./DetailPage.module.scss";

export default function DetailPage({ children }: { children: ReactNode }) {
  return (
    <main className={styles["detail-page"]}>
      <Link to="/" aria-label="Back to museum" className={styles["detail-page__back-link"]}>
        <img
          src="/svg/icon-cross.svg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className={styles["detail-page__content"]}>{children}</div>
    </main>
  );
}
