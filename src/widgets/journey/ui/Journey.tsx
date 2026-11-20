import styles from "./Journey.module.scss";
import VideoPlaylist from "./VideoPlaylist/VideoPlaylist";

const videoArray = [0, 1, 2, 3, 4];

function Journey() {
  return (
    <section id="Video">
      <div className={`${styles.journey__container} container`}>
        <div className={styles.journey__content}>
          <h2 className="section-title section-title--gold">Video journey</h2>
          <p className={styles.journey__description}>
            Enter and visit one of the most famous museums in the world and enjoy masterpieces such as Mona Lisa or
            Hammurabi&apos;s Code
          </p>
        </div>
        <VideoPlaylist content={videoArray} />
      </div>
    </section>
  );
}

export default Journey;
