import { useSelector } from "react-redux";
import type { TicketSelection } from "./types";
export const useTicketSelection = () => useSelector((state: { tickets: TicketSelection }) => state.tickets);
