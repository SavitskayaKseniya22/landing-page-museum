import { useContext } from "react";
import Logo from "@/shared/ui/Logo";
import Navigation from "@/shared/ui/Navigation";
import styles from "./Header.module.scss";
import BurgerContext from "../../model/menu-context";

function Header() {
  const { isOpen, setIsOpen } = useContext(BurgerContext);

  return (
    <header className={styles["site-header"]}>
      <Logo />
      <nav aria-label="Primary navigation" className={styles["site-header__nav-region"]}>
        <Navigation className={styles["site-header__navigation"]} />
      </nav>

      <button
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className={`${styles["site-header__menu-toggle"]} ${isOpen ? styles["site-header__menu-toggle--expanded"] : ""}`}
        onClick={() => {
          setIsOpen((a) => !a);
        }}
      />
    </header>
  );
}

export default Header;
