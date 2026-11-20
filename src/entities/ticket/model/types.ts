export enum ExhibitionType {
  "Permanent exhibition" = "Permanent exhibition",
  "Temporary exhibition" = "Temporary exhibition",
  "Combined Admission" = "Combined Admission",
}

export type TicketSelection = {
  exhibition: ExhibitionType;
  basic: number;
  senior: number;
};
