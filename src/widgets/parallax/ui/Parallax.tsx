import styles from "./Parallax.module.scss";

function Parallax() {
  return (
    <div className={styles.parallax}>
      <img
        src="/img/img-parallax.jpg"
        alt=""
        className={styles.parallax__image}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default Parallax;
