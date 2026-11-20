import type { TicketSelection } from "@/entities/ticket";
export type BookingFormValues = TicketSelection & {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  card__number: string;
  card__exp_month: string;
  card__exp_year: string;
  card__name: string;
  cvv: string;
};
