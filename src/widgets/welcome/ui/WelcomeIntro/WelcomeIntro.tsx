import { Link, useLocation } from "react-router";

import styles from "./WelcomeIntro.module.scss";

function WelcomeIntro({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();
  return (
    <div className={styles["welcome-intro"]} style={{ opacity: isOpen ? 0 : 1 }}>
      <h1 className="section-title section-title--light">
        Welcome
        <br />
        to the Louvre
      </h1>
      <p className={styles["welcome-intro__description"]}>From the castle to the museum</p>
      <Link to="/map/6" className={styles["welcome-intro__tour-link"]} state={{ backgroundLocation: location }}>
        Discover the Louvre
      </Link>
    </div>
  );
}

export default WelcomeIntro;
