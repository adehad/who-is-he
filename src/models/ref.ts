import type texts from "#data/texts.json";

/** A text we hold, keyed by dataset ref (e.g. "shamail:5"). Typos are compile errors. */
export type Ref = keyof typeof texts;
