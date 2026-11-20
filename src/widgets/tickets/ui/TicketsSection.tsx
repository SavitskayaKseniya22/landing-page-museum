import { TicketSelectionForm } from "@/features/select-tickets";
import styles from "./TicketsSection.module.scss";
export default function TicketsSection() {
  return (
    <section className={styles.tickets} id="Tickets">
      <div className={`${styles.tickets__container} container`}>
        <h2 className={`section-title section-title--underlined section-title--gold ${styles.tickets__title}`}>
          Buy tickets
        </h2>

        <div className={styles.tickets__image}>
          <img
            src="/img/img-tickets.jpg"
            alt="Piece of art"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            loading="lazy"
            decoding="async"
          />
        </div>

        <TicketSelectionForm />
      </div>
    </section>
  );
}
