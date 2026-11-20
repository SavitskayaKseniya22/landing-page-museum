import { useState } from "react";

import styles from "./Gallery.module.scss";

import { images } from "../model/images";

import { shuffle } from "../lib/shuffle";

function Gallery() {
  const [galleryImages] = useState(() => shuffle(images).slice(0, 12));
  return (
    <section className={styles.gallery} id="Gallery">
      <div className={`${styles.gallery__container} container`}>
        <h2 className="section-title section-title--light">Art Gallery</h2>
        <ul className={styles.gallery__list}>
          {galleryImages.map((image) => (
            <li key={image.src} className={styles.gallery__item}>
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt="Artwork from the Louvre collection"
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Gallery;
