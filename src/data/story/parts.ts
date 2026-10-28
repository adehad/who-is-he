import type { Part, PartNo } from "@/models/story";

export const PARTS: Record<PartNo, Part> = {
  "1": {
    label: "Morning · at the mirror",
  },
  "2": {
    label: "Breakfast · at the table",
    backdrop: "table",
  },
  "3": {
    label: "Out in the world",
    backdrop: "path",
  },
  "4": {
    label: "Night · back at the mirror",
    night: true,
  },
};
