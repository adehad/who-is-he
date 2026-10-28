import type { BackdropId } from "@/art/backdrops";
import type { PropId } from "@/art/props";
import type { Ref } from "@/models/ref";
import type { Review } from "@/models/review";

export type PartNo = 1 | 2 | 3 | 4;
export interface Part {
  label: string;
  backdrop?: BackdropId;
  night?: boolean;
}
export interface Beat {
  part: PartNo;
  title: string;
  prop?: PropId;
  backdrop?: BackdropId;
  greet?: string;
  lines: string[];
  prompt?: string | string[];
  refs?: Ref[];
  stations?: string[];
  recap?: boolean;
  note?: string;
  review?: Review;
}
export const defineBeat = (b: Beat): Beat => b;
