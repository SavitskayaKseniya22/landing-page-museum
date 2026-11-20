import { useController, useFormContext } from "react-hook-form";
import { type TicketSelection } from "../../model/types";
import { MAX_TICKETS, normalizeTicketCount } from "../../model/quantity";
import styles from "./TicketCounter.module.scss";

import { CounterType, CounterNameType } from "../../model/counter-types";

function TicketCounter({ counterType, counterName }: { counterType: CounterType; counterName: CounterNameType }) {
  const { control } = useFormContext<TicketSelection>();
  const { field, fieldState } = useController({ name: counterName, control });
  const count = normalizeTicketCount(field.value);
  const label = counterName === CounterNameType.BASIC ? "Basic tickets" : "Senior tickets";
  const iconSuffix = counterType === CounterType.LIGHT ? "" : "-white";
  return (
    <div className={`${styles["ticket-counter"]} ${styles[`ticket-counter--${counterType}`]}`}>
      <button
        type="button"
        className={styles["ticket-counter__button"]}
        aria-label={`Remove ${label.toLowerCase()}`}
        disabled={count === 0}
        onClick={() => field.onChange(count - 1)}
      >
        <img src={`/svg/icon-minus${iconSuffix}.svg`} width={17} height={17} alt="" loading="lazy" decoding="async" />
      </button>
      <input
        {...field}
        type="number"
        aria-label={label}
        aria-invalid={fieldState.invalid || undefined}
        value={count}
        min={0}
        max={MAX_TICKETS}
        step={1}
        className={styles["ticket-counter__input"]}
        onChange={(event) => field.onChange(normalizeTicketCount(event.currentTarget.valueAsNumber))}
      />
      <button
        type="button"
        className={styles["ticket-counter__button"]}
        aria-label={`Add ${label.toLowerCase()}`}
        disabled={count === MAX_TICKETS}
        onClick={() => field.onChange(count + 1)}
      >
        <img src={`/svg/icon-plus${iconSuffix}.svg`} width={17} height={17} alt="" loading="lazy" decoding="async" />
      </button>
    </div>
  );
}
export default TicketCounter;
