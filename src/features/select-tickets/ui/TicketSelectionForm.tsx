import { Link, useLocation } from "react-router";
import { useEffect } from "react";

import { TicketSelection, ExhibitionType } from "@/entities/ticket";
import { useForm, useWatch, FormProvider } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTicketSelection } from "@/entities/ticket";
import { addPreData } from "@/entities/ticket";
import { prices } from "@/entities/ticket";
import styles from "./TicketSelectionForm.module.scss";
import { buttonClasses as buttonStyles } from "@/shared/ui/Button";
import { TicketCounter, CounterNameType, CounterType } from "@/entities/ticket";

function TicketSelectionForm() {
  const location = useLocation();
  const dispatch = useDispatch();

  const tickets = useTicketSelection();

  const methods = useForm<TicketSelection>({
    defaultValues: {
      exhibition: tickets.exhibition || ExhibitionType["Permanent exhibition"],
      basic: tickets.basic || 0,
      senior: tickets.senior || 0,
    },

    reValidateMode: "onSubmit",
  });

  const { register, control, reset } = methods;

  const [exhibition, basic, senior] = useWatch({ control, name: ["exhibition", "basic", "senior"] });

  useEffect(() => {
    reset(tickets);
  }, [reset, tickets]);

  return (
    <FormProvider {...methods}>
      <form aria-label="Ticket selection" className={styles.tickets__form} onSubmit={(event) => event.preventDefault()}>
        <fieldset className={styles["tickets__exhibition-options"]}>
          <legend className="subheading">
            <b>Ticket Type</b>
          </legend>

          <ul className={styles["tickets__exhibition-list"]}>
            <li>
              <label htmlFor="Permanent">
                <input type="radio" {...register("exhibition")} id="Permanent" value="Permanent exhibition" />
                Permanent exhibition
              </label>
            </li>
            <li>
              <label htmlFor="Temporary">
                <input type="radio" {...register("exhibition")} id="Temporary" value="Temporary exhibition" />
                Temporary exhibition
              </label>
            </li>
            <li>
              <label htmlFor="Combined">
                <input type="radio" {...register("exhibition")} id="Combined" value="Combined Admission" />
                Combined Admission
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset className={styles.tickets__quantity}>
          <legend className="subheading">
            <b>Amount</b>
          </legend>

          <ul className={styles["tickets__counter-list"]}>
            <li>
              <p>Basic 18+</p>

              <TicketCounter counterType={CounterType.LIGHT} counterName={CounterNameType.BASIC} />
            </li>
            <li>
              <p>Senior 65+</p>

              <TicketCounter counterType={CounterType.LIGHT} counterName={CounterNameType.SENIOR} />
            </li>
          </ul>

          <p className="subheading">
            <b>Total {basic * prices[exhibition].basic + senior * prices[exhibition].senior} €</b>
          </p>

          <Link
            to="/order"
            className={`${buttonStyles.button} ${buttonStyles["button--secondary"]}`}
            onClick={() => dispatch(addPreData({ exhibition, basic, senior }))}
            state={{ backgroundLocation: location }}
          >
            Buy Now
          </Link>
        </fieldset>
      </form>
    </FormProvider>
  );
}
export default TicketSelectionForm;
