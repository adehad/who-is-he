export const SKINS = [
  {
    skin: "#f6dcc7",
    feat: "#5a3526",
  },
  {
    skin: "#eabf98",
    feat: "#4a2a1a",
  },
  {
    skin: "#cf9566",
    feat: "#3b2215",
  },
  {
    skin: "#9c6239",
    feat: "#2a160c",
  },
  {
    skin: "#6b3f24",
    feat: "#1c0e07",
  },
] as const;
export const COVERS = [
  {
    id: "hijab",
    label: "Hijab",
  },
  {
    id: "kufi",
    label: "Kufi",
  },
  {
    id: "none",
    label: "None",
  },
] as const;
export type CoverId = (typeof COVERS)[number]["id"];
