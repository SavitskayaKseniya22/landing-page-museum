import styles from "./Explore.module.scss";
import Comparison from "./Comparison/Comparison";

function Explore() {
  return (
    <section className={styles.explore} id="Explore">
      <div className={`${styles.explore__container} container`}>
        <div className={styles.explore__content}>
          <h2 className="section-title section-title--underlined section-title--light">Picture explore</h2>

          <div className={styles.explore__description}>
            <p>Las Meninas is a 1656 painting by Diego Velázquez, the leading artist of the Spanish Golden Age.</p>
            <p>
              It was cleaned in 1984 to remove a{" "}
              <span className={styles.explore__highlight}>&apos;yellow veil&apos;</span> of dust that had gathered since
              the previous restoration in the 19th century.
            </p>
            <p>
              The cleaning provoked furious protests, not because the picture had been damaged in any way, but because
              it looked different.
            </p>
          </div>
        </div>
        <Comparison />
      </div>
    </section>
  );
}

export default Explore;
