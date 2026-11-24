// Tanzil's sura|aya|text files: the Quran text and translations.

export interface TanzilFile {
  /** Verse text keyed "sura:aya", exactly as in the file. */
  verses: Map<string, string>;
  /** The trailing `#` comment block (Tanzil's copyright notice or translation credits), verbatim. */
  notice: string;
}

export function parseTanzil(src: string): TanzilFile {
  const verses = new Map<string, string>();
  const notice: string[] = [];
  for (const line of src.split(/\r?\n/)) {
    if (line.startsWith("#")) notice.push(line);
    else if (line.trim()) {
      const m = line.match(/^(\d+)\|(\d+)\|(.*)$/);
      if (!m) throw new Error(`not a sura|aya|text line: ${JSON.stringify(line.slice(0, 80))}`);
      verses.set(`${m[1]}:${m[2]}`, m[3] ?? "");
    }
  }
  return { verses, notice: notice.join("\n") };
}
