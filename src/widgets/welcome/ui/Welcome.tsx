import { useEffect, useState } from "react";
import styles from "./Welcome.module.scss";
import WelcomeCarousel from "./WelcomeCarousel/WelcomeCarousel";
import MobileMenu from "./MobileMenu/MobileMenu";
import Header from "./Header/Header";
import WelcomeIntro from "./WelcomeIntro/WelcomeIntro";
import BurgerContext from "../model/menu-context";

function Welcome() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1920) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <section className={styles.welcome} id="Welcome">
      <div
        className={`${styles.welcome__container} container`}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
            event.currentTarget.querySelector<HTMLButtonElement>('button[aria-controls="mobile-navigation"]')?.focus();
          }
        }}
      >
        <BurgerContext.Provider value={{ isOpen, setIsOpen }}>
          <Header />
        </BurgerContext.Provider>

        <div className={styles.welcome__content}>
          <WelcomeIntro isOpen={isOpen} />
          <WelcomeCarousel />
        </div>
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </section>
  );
}

export default Welcome;
