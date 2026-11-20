import styles from "./Footer.module.scss";
import Logo from "@/shared/ui/Logo";
import Navigation from "@/shared/ui/Navigation";
import SocialLinks from "@/shared/ui/SocialLinks";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <Logo />
        <nav aria-label="Footer navigation" className={styles.footer__content}>
          <Navigation className={styles.footer__navigation} />
          <SocialLinks />
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
