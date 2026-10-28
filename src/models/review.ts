export type Review =
  | { status: "draft"; note?: string }
  | { status: "approved"; by: string; date: string };

export const draft = (note?: string): Review =>
  note === undefined ? { status: "draft" } : { status: "draft", note };
export const approved = (by: string, date: `${number}-${number}-${number}`): Review => ({
  status: "approved",
  by,
  date,
});
