import { getLocalDate } from "@/shared/lib/date";

export function formatVisitDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Select a date";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime()) || getLocalDate(date) !== value) return "Select a date";
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
