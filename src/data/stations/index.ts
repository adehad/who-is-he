import s00 from "./00-intro";
import s01 from "./01-stature";
import s02 from "./02-face";
import s03 from "./03-brow";
import s04 from "./04-eyes";
import s05 from "./05-mouth";
import s06 from "./06-neck";
import s07 from "./07-chest";
import s08 from "./08-hands";
import s09 from "./09-fragrance";
import s10 from "./10-feet";
import s11 from "./11-seal";
import s12 from "./12-hair";
import s13 from "./13-speech";
import s14 from "./14-smile";
import s15 from "./15-voice";
import s16 from "./16-tears";

export const STATIONS = [
  s00,
  s01,
  s02,
  s03,
  s04,
  s05,
  s06,
  s07,
  s08,
  s09,
  s10,
  s11,
  s12,
  s13,
  s14,
  s15,
  s16,
];
export type StationId = (typeof STATIONS)[number]["id"];
