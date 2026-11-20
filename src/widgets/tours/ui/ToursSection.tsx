import styles from "./ToursSection.module.scss";
import TourCard from "./TourCard/TourCard";

import { tours } from "@/entities/tour";

function ToursSection() {
  return (
    <section id="Tours">
      <div className={`${styles.tours__container} container`}>
        <h2 className="section-title section-title--underlined section-title--gold">Virtual tour</h2>
        <ul className={styles.tours__list}>
          {tours.slice(0, -1).map((tour) => (
            <li key={tour.name}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ToursSection;
