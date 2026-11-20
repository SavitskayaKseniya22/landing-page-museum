import styles from "./SocialLinks.module.scss";

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`${styles["social-links"]} ${className}`}>
      <li>
        <a href="https://www.youtube.com/user/louvre" target="_blank" className={styles["social-links__link"]}>
          <img src="/svg/icon-youtube.svg" width={20} height={17} alt="Youtube" loading="lazy" decoding="async" />
        </a>
      </li>

      <li>
        <a href="https://www.instagram.com/museelouvre/" target="_blank" className={styles["social-links__link"]}>
          <img src="/svg/icon-instagram.svg" width={20} height={17} alt="Instagram" loading="lazy" decoding="async" />
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/museedulouvre" target="_blank" className={styles["social-links__link"]}>
          <img src="/svg/icon-facebook.svg" width={20} height={17} alt="Facebook" loading="lazy" decoding="async" />
        </a>
      </li>
      <li>
        <a href="https://twitter.com/museelouvre" target="_blank" className={styles["social-links__link"]}>
          <img src="/svg/icon-twitter.svg" width={20} height={17} alt="Twitter" loading="lazy" decoding="async" />
        </a>
      </li>
      <li>
        <a href="https://www.pinterest.fr/museedulouvre/" target="_blank" className={styles["social-links__link"]}>
          <img src="/svg/icon-pinterest.svg" width={20} height={17} alt="Pinterest" loading="lazy" decoding="async" />
        </a>
      </li>
    </ul>
  );
}

export default SocialLinks;
