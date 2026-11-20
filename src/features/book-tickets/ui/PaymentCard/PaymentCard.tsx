import { useFormContext } from "react-hook-form";
import { useId } from "react";
import { type BookingFormValues } from "../../model/types";
import { isValidCardNumber, isValidExpiry } from "../../lib/validation";
import styles from "./PaymentCard.module.scss";

export default function PaymentCard() {
  const expiryId = useId();
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<BookingFormValues>();
  const validateExpiry = () =>
    isValidExpiry(getValues("card__exp_month"), getValues("card__exp_year")) ||
    "Enter a valid, unexpired month and four-digit year";

  return (
    <div className={styles["payment-card"]}>
      <div className={`${styles["payment-card__face"]} ${styles["payment-card__face--front"]}`}>
        <label className={styles["payment-card__number-field"]}>
          Card number
          <input
            required
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength={23}
            placeholder="Card number"
            aria-invalid={!!errors.card__number}
            aria-describedby={errors.card__number ? "booking-errors" : undefined}
            {...register("card__number", {
              required: "Card number is required",
              validate: (value) => isValidCardNumber(value) || "Enter a valid card number",
            })}
          />
        </label>
        <div role="group" aria-labelledby={expiryId} className={styles["payment-card__expiry-field"]}>
          <span id={expiryId}>Expiration date</span>
          <div className={styles["payment-card__expiry-inputs"]}>
            <input
              required
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp-month"
              aria-label="Expiration month"
              maxLength={2}
              placeholder="MM"
              aria-invalid={!!errors.card__exp_month}
              aria-describedby={errors.card__exp_month ? "booking-errors" : undefined}
              {...register("card__exp_month", {
                required: "Expiration month is required",
                pattern: { value: /^(0?[1-9]|1[0-2])$/, message: "Enter a month from 1 to 12" },
                deps: ["card__exp_year"],
              })}
            />
            <input
              required
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp-year"
              aria-label="Expiration year"
              maxLength={4}
              placeholder="YYYY"
              aria-invalid={!!errors.card__exp_year}
              aria-describedby={errors.card__exp_year ? "booking-errors" : undefined}
              {...register("card__exp_year", { required: "Expiration year is required", validate: validateExpiry })}
            />
          </div>
        </div>
        <label className={styles["payment-card__cardholder-field"]}>
          Cardholder name
          <input
            required
            type="text"
            autoComplete="cc-name"
            placeholder="Name"
            aria-invalid={!!errors.card__name}
            aria-describedby={errors.card__name ? "booking-errors" : undefined}
            {...register("card__name", {
              required: "Cardholder name is required",
              validate: (value) => value.trim().length >= 2 || "Enter the cardholder name",
            })}
          />
        </label>
      </div>
      <div className={`${styles["payment-card__face"]} ${styles["payment-card__face--back"]}`}>
        <div className={styles["payment-card__security-code"]}>
          <label>
            CVC/CVV
            <input
              required
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={4}
              placeholder="CVV"
              aria-invalid={!!errors.cvv}
              aria-describedby={errors.cvv ? "booking-errors" : `${expiryId}-cvv-help`}
              {...register("cvv", {
                required: "CVV is required",
                pattern: { value: /^\d{3,4}$/, message: "CVV must contain 3 or 4 digits" },
              })}
            />
          </label>
          <p id={`${expiryId}-cvv-help`}>The 3 or 4 digit security code on your card</p>
        </div>
      </div>
    </div>
  );
}
