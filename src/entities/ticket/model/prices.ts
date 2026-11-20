import { ExhibitionType } from "./types";

export const prices = {
  [ExhibitionType["Permanent exhibition"]]: { basic: 20, senior: 10 },
  [ExhibitionType["Temporary exhibition"]]: { basic: 25, senior: 12.5 },
  [ExhibitionType["Combined Admission"]]: { basic: 40, senior: 20 },
} satisfies Record<ExhibitionType, { basic: number; senior: number }>;
