import { tours } from "./data";

export function getTourById(name: string) {
  return /^(0|[1-9]\d*)$/.test(name) ? tours[Number(name)] : undefined;
}
