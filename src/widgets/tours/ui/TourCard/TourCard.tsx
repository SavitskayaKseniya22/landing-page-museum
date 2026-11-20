import { Link, useLocation } from "react-router";

import styles from "./TourCard.module.scss";

import { type TourType } from "@/entities/tour";

function TourCard({ tour }: { tour: TourType }) {
  const location = useLocation();
  return (
    <Link to={`/map/${tour.i}`} state={{ backgroundLocation: location }}>
      <figure className={styles["tour-card"]}>
        <img
          src={tour.preview}
          width={440}
          height={285}
          alt={tour.name}
          className={styles["tour-card__image"]}
          loading="lazy"
          decoding="async"
        />

        <figcaption className={styles["tour-card__caption"]}>
          <h3 className={`card-title ${styles["tour-card__title"]}`}>{tour.name}</h3>
          <span className={styles["tour-card__type"]}>360° Virtual Tour</span>
          <span className={styles["tour-card__description"]}>Google Street Panorama View</span>
        </figcaption>
      </figure>
    </Link>
  );
}

export default TourCard;
