import styles from "./Contacts.module.scss";

function Contacts() {
  return (
    <section id="Contacts">
      <div className={`${styles.contacts__container} container`}>
        <h2 className={`section-title section-title--underlined section-title--gold ${styles.contacts__title}`}>
          CONTACTS
        </h2>

        <div className={styles.contacts__content}>
          <h3 className="subheading">
            <b>
              Palais Royal
              <br />
              Musee du Louvre
            </b>
          </h3>

          <ul className={styles.contacts__list}>
            <li>
              <a
                href="https://www.google.com/maps/place/%D0%9B%D1%83%D0%B2%D1%80/@48.8606111,2.337644,15z/data=!4m6!3m5!1s0x47e671d877937b0f:0xb975fcfa192f84d4!8m2!3d48.8606111!4d2.337644!16zL20vMDRnZHI?entry=ttu"
                target="_blank"
              >
                address: 75001 Paris, France
              </a>
            </li>

            <li>
              <a href="tel:+33(0)140205050">phone: +33(0) 1 40 20 50 50</a>
            </li>
            <li>
              <a href="mailto:info@louvre.fr">mail: info@louvre.fr</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Contacts;
