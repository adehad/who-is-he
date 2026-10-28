export interface Book {
  name: string;
  books?: Record<number, string>;
}

export const BOOKS: Record<string, Book> = {
  shamail: { name: "Shamāʾil" },
  bukhari: {
    name: "Bukhārī",
    books: {
      1: "Badʾ al-Waḥy",
      4: "Wuḍūʾ",
      8: "Ṣalāt",
      10: "Adhān",
      11: "Jumuʿa",
      19: "Tahajjud",
      56: "Jihād",
      61: "Manāqib",
      62: "Faḍāʾil al-Ṣaḥāba",
      63: "Manāqib al-Anṣār",
      64: "Maghāzī",
      77: "Libās",
    },
  },
  muslim: { name: "Muslim", books: { 43: "Faḍāʾil" } },
  tirmidhi: { name: "Jāmiʿ al-Tirmidhī", books: { 49: "Manāqib" } },
  abudawud: { name: "Abū Dāwūd", books: { 11: "Manāsik" } },
};
