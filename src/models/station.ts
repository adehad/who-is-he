import type { IconId } from "@/art/icons";
import type { Ref } from "@/models/ref";
import type { Review } from "@/models/review";

export type Kind = "mujiza" | "karama" | "khasisa" | "research";
export type Basis = "classical" | "reflection";

/** `grownUp` items are hidden from children and shown, with their source, only under the grown-up notes toggle. */
interface Audience {
  grownUp?: true;
}
export interface Physical extends Audience {
  ref: Ref;
  phrase: string;
  gloss?: string;
  note?: string;
  review?: Review;
}
export interface Character<T extends string = string> extends Audience {
  trait: T;
  line: string;
  ref?: Ref;
  basis?: Basis;
  note?: string;
  review?: Review;
}
export interface Sign<T extends string = string> extends Audience {
  kind: Kind;
  title: string;
  line: string;
  ref?: Ref;
  trait?: T;
  note?: string;
  review?: Review;
}
export interface Station<T extends string = string, I extends string = string> {
  id: I;
  name: string;
  icon: IconId;
  phrase: string;
  title: string;
  line: string;
  mirror: string | null;
  physical: Physical[];
  character: Character<T>[];
  signs: Sign<NoInfer<T>>[];
}

/** Typed identity: a sign's trait must be one of this station's character traits. Traits are only checked when `character` is written inline. */
export const defineStation = <const T extends string = never, const I extends string = string>(
  s: Station<T, I>,
): Station<T, I> => s;

/** Splits items into what children see and what only grown-ups see, each in source order. */
export const byAudience = <X extends Audience>(xs: readonly X[]): { kids: X[]; grown: X[] } => ({
  kids: xs.filter((x) => !x.grownUp),
  grown: xs.filter((x) => x.grownUp),
});

/** The trait a station leads with on child-facing surfaces (share card, page description). */
export const leadTrait = <T extends string>(s: Pick<Station<T>, "character">): T | undefined =>
  s.character.find((c) => !c.grownUp)?.trait;
