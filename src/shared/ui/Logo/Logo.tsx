import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.logo}>
      <img
        src="/svg/icon-logo.svg"
        width={49}
        height={26}
        alt="Logo triangle"
        className={styles.logo__image}
        loading="lazy"
        decoding="async"
      />
      <span className={`${styles.logo__title} `}>Louvre</span>
    </div>
  );
}

export default Logo;
