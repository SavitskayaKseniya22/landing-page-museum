import { useEffect, useId, useState } from "react";

import { useForm, useWatch, SubmitHandler, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTicketSelection } from "@/entities/ticket";
import { TicketCounter, CounterType, CounterNameType } from "@/entities/ticket";
import Button, { ButtonType } from "@/shared/ui/Button";
import { BookingFormValues } from "../../model/types";
import { addPreData } from "@/entities/ticket";
import { prices } from "@/entities/ticket";
import { getLocalDate } from "@/shared/lib/date";
import { formatVisitDate } from "../../lib/format-visit-date";
import { useToday } from "@/shared/lib/use-today";
import { isValidPhoneNumber } from "../../lib/validation";
import styles from "./TicketOrder.module.scss";
import PaymentCard from "../PaymentCard/PaymentCard";

function TicketOrder({ headingLevel = 2, titleId }: { headingLevel?: 1 | 2; titleId?: string }) {
  const instanceId = useId();
  const headingId = titleId ?? `${instanceId}-title`;
  const BookingHeading = headingLevel === 1 ? "h1" : "h2";
  const OverviewHeading = headingLevel === 1 ? "h2" : "h3";
  const today = useToday();
  const dispatch = useDispatch();
  const tickets = useTicketSelection();

  const [submitted, setSubmitted] = useState(false);
  const methods = useForm<BookingFormValues>({
    defaultValues: {
      ...tickets,
      date: "",
      time: "9:00",
      name: "",
      email: "",
      phone: "",
      card__number: "",
      card__exp_month: "",
      card__exp_year: "",
      card__name: "",
      cvv: "",
    },
    reValidateMode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = methods;

  const [exhibition, date, time, senior, basic] = useWatch({
    control,
    name: ["exhibition", "date", "time", "senior", "basic"],
  });
  useEffect(() => {
    if (today && !getValues("date")) setValue("date", today);
  }, [getValues, setValue, today]);
  useEffect(() => {
    dispatch(addPreData({ exhibition, basic, senior }));
  }, [dispatch, exhibition, basic, senior]);

  const onSubmit: SubmitHandler<BookingFormValues> = () => {
    if (basic + senior === 0) {
      setError("basic", { message: "Select at least one ticket" });
      return;
    }
    setSubmitted(true);
    setValue("cvv", "");
    setValue("card__number", "");
  };
  return (
    <FormProvider {...methods}>
      <form aria-labelledby={headingId} onSubmit={handleSubmit(onSubmit)} className={styles["ticket-order"]} noValidate>
        <div className={styles["ticket-order__details"]}>
          <div className={styles["ticket-order__header"]}>
            <img src="/img/img-triangle.png" width={85} height={41} alt="" loading="lazy" decoding="async" />
            <BookingHeading
              id={headingId}
              className={`section-title section-title--gold ${styles["ticket-order__title"]}`}
            >
              booking tickets
            </BookingHeading>
            <p className={styles["ticket-order__subtitle"]}>Tour to Louvre</p>
            <p>This is a demo form. No payment will be processed.</p>
          </div>

          <ul className={styles["ticket-order__fields"]}>
            <li>
              <img src="/svg/icon-date.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
              <input
                required
                type="date"
                {...register("date", {
                  required: "Select a visit date",
                  validate: (value) => value >= getLocalDate() || "Select today or a future date",
                })}
                aria-label="Visit date"
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "booking-errors" : undefined}
                min={today || undefined}
              />
              <img src="/svg/icon-arrow.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
            </li>
            <li>
              <img src="/svg/icon-time.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
              <select required aria-label="Visit time" size={1} {...register("time", { required: true })}>
                <option value="9:00">9:00</option>
                <option value="9:30">9:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
              </select>
              <img src="/svg/icon-arrow.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
            </li>
            <li>
              <img src="/svg/icon-name.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
              <input
                required
                type="text"
                aria-label="Name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "booking-errors" : undefined}
                placeholder={errors.name?.message || "Name"}
                {...register("name", {
                  validate: (value) => value.trim().length >= 2 || "Enter your name",
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
            </li>
            <li>
              <img src="/svg/icon-email.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
              <input
                required
                type="email"
                aria-label="Email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "booking-errors" : undefined}
                placeholder={errors.email?.message || "E-mail"}
                {...register("email", {
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  required: {
                    value: true,
                    message: "E-mail is required",
                  },
                })}
              />
            </li>
            <li>
              <img src="/svg/icon-phone.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
              <input
                required
                type="tel"
                aria-label="Phone"
                autoComplete="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "booking-errors" : undefined}
                placeholder={errors.phone?.message || "Phone"}
                {...register("phone", {
                  validate: (value) => isValidPhoneNumber(value) || "Enter a valid phone number",
                  required: {
                    value: true,
                    message: "Phone is required",
                  },
                })}
              />
            </li>

            <li>
              <img src="/svg/icon-ballot.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
              <select aria-label="Exhibition" size={1} {...register("exhibition")}>
                <option value="Permanent exhibition">Permanent exhibition</option>
                <option value="Temporary exhibition">Temporary exhibition</option>
                <option value="Combined Admission">Combined Admission</option>
              </select>

              <img src="/svg/icon-arrow.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
            </li>

            <li className={styles["ticket-order__ticket-options"]}>
              <fieldset className={styles["ticket-order__ticket-group"]}>
                <legend className="field-group-title">Entry Ticket</legend>

                <ul className={styles["ticket-order__counter-list"]}>
                  <li className={styles["ticket-order__counter-row"]}>
                    <div>Basic 18+ ({prices[exhibition].basic}€)</div>

                    <TicketCounter counterType={CounterType.DARK} counterName={CounterNameType.BASIC} />
                  </li>
                  <li className={styles["ticket-order__counter-row"]}>
                    <div>Senior 65+ ({prices[exhibition].senior}€)</div>

                    <TicketCounter counterType={CounterType.DARK} counterName={CounterNameType.SENIOR} />
                  </li>
                </ul>
              </fieldset>
            </li>
          </ul>
        </div>

        <div className={styles["ticket-order__checkout"]}>
          <div className={styles["ticket-order__summary"]}>
            <img
              src="/img/img-louvre.png"
              width={150}
              height={120}
              alt="Louvre"
              className={styles["ticket-order__preview"]}
              loading="lazy"
              decoding="async"
            />
            <OverviewHeading className="subheading">
              <b>Overview</b>
            </OverviewHeading>
            <p>Tour to Louvre</p>
            <ul className={styles["ticket-order__visit-details"]}>
              <li className={styles["ticket-order__visit-detail"]}>
                <img src="/svg/icon-date.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
                {formatVisitDate(date)}
              </li>
              <li className={styles["ticket-order__visit-detail"]}>
                <img src="/svg/icon-time.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
                <span>{time}</span>
              </li>
              <li className={styles["ticket-order__visit-detail"]}>
                <img src="/svg/icon-circle.svg" width={15} height={15} alt="" loading="lazy" decoding="async" />
                {exhibition}
              </li>
            </ul>

            <ul className={styles["ticket-order__price-breakdown"]}>
              <li>
                <div className={styles["ticket-order__ticket-count"]}>{basic}</div>
                <span className={styles["ticket-order__ticket-type"]}>Basic ({prices[exhibition].basic}€)</span>
                <span>{basic * prices[exhibition].basic}€</span>
              </li>
              <li>
                <div className={styles["ticket-order__ticket-count"]}>{senior}</div>
                <span className={styles["ticket-order__ticket-type"]}>Senior ({prices[exhibition].senior}€)</span>
                <span>{senior * prices[exhibition].senior}€</span>
              </li>
            </ul>

            <div className={styles["ticket-order__total"]}>
              Total:
              <span>{basic * prices[exhibition].basic + senior * prices[exhibition].senior}€</span>
            </div>
          </div>

          <PaymentCard />

          {Object.keys(errors).length > 0 && (
            <p id="booking-errors" role="alert">
              {Object.values(errors)
                .map((error) => error.message)
                .filter(Boolean)
                .join(". ")}
            </p>
          )}
          {submitted && <p role="status">Demo form validated. No booking or payment was made.</p>}
          <Button
            buttonType={ButtonType.SUB}
            className={styles["ticket-order__submit-button"]}
            globalType="submit"
            isDisabled={!(basic > 0 || senior > 0)}
          >
            Book
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
export default TicketOrder;
