export const MAX_TICKETS = 100;

export function normalizeTicketCount(value: number) {
  return Number.isFinite(value) ? Math.min(MAX_TICKETS, Math.max(0, Math.trunc(value))) : 0;
}
