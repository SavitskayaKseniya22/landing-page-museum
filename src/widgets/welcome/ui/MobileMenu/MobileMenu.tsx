import { useState } from "react";
import SocialLinks from "@/shared/ui/SocialLinks";

import Navigation from "@/shared/ui/Navigation";
import styles from "./MobileMenu.module.scss";

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [onTransition, setOnTransition] = useState<boolean | null>(null);

  if (isOpen !== (onTransition ?? false)) {
    setOnTransition(isOpen);
  }

  return (
    <nav
      aria-label="Mobile navigation"
      id="mobile-navigation"
      inert={!isOpen}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) onClose();
      }}
      className={`${styles["mobile-menu"]} ${onTransition ? styles["mobile-menu--open"] : ""}  ${
        onTransition === false ? styles["mobile-menu--closing"] : ""
      }`}
    >
      <Navigation className={styles["mobile-menu__navigation"]} />

      <div className={styles["mobile-menu__images"]}>
        <div className={`${styles["mobile-menu__image"]} ${styles["mobile-menu__image--palace"]}`}>
          <img
            src="/img/burger/img-1.jpg"
            alt="Louvre"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={`${styles["mobile-menu__image"]} ${styles["mobile-menu__image--ceiling"]}`}>
          <img
            src="/img/burger/img-2.jpg"
            alt="Cupola"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={`${styles["mobile-menu__image"]} ${styles["mobile-menu__image--pyramid"]}`}>
          <img
            src="/img/burger/img-3.jpg"
            alt="Triangle"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <SocialLinks className={styles["mobile-menu__social-links"]} />
    </nav>
  );
}

export default MobileMenu;
