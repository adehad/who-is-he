# Station draft notes

Draft input only: nothing here has had scholarly review. References are sunnah.com numbers: `shamail:8` is https://sunnah.com/shamail:8, and `#8` alone is a Shamail number.

## Order

Chapter 1 follows the long descriptions (#7 ‘Alī, #8 Hind) from head to toe. The later chapters come after it, in Tirmidhi's order. Existing stations are marked *.

| # | id | Shamail source | after |
|---|----|----------------|-------|
| 1 | intro* | ch1 #8 | |
| 2 | stature | ch1 #2, #3, #7, #8 | intro |
| 3 | face* | ch1 | |
| 4 | brow | ch1 #8 | face |
| 5 | eyes* | ch1 | |
| 6 | mouth | ch1 #8, #15 | eyes |
| 7 | neck | ch1 #7, #8, #12 | mouth |
| 8 | chest | ch1 #7, #8 | neck |
| 9 | hands* | ch1 | |
| 10 | fragrance* | ch1 #8 + ch48 | |
| 11 | feet | ch1 #8 + ch18 #122 + ch40 #260 | fragrance |
| 12 | seal | ch2 #16–23 | feet |
| 13 | hair | ch3–6 + ch1 #8 | seal |
| 14 | speech | ch33 #222–224 | hair |
| 15 | smile | ch34 #224–232 | speech |
| 16 | voice | ch44 #313–319 | smile |
| 17 | tears | ch45 #321–324 | voice |

## Merges

- **brow** = forehead + eyebrows + nose. In #8 these are three short adjacent phrases, and each one alone is too thin for a station. The "vein that anger makes pulse" gives the character link (bukhari:3560: he never took revenge for his own sake).
- **mouth** = cheeks + mouth + teeth (#8, #15). It is kept apart from **smile** (ch34) because the saliva signs belong here and the smile hadith sit at a later point in the book.
- **hair** = ch3 hair + ch4 combing + ch5 grey hair + ch6 dye + the beard from #8. The beard alone was one phrase (كث اللحية), and ch5 counts the white hairs of the head and beard together.
- **feet** = ch1 feet + gait + ch18 walking. #123 and #124 in ch18 repeat #5 and #7. Only #122 ("the earth seemed folded up for him") is new, so the station stays at the ch1 position. The ch40 swollen-feet hadith (#260) supplies the character link.
- **kohl (ch7)** gets no station. It is about a practice, not a feature. Suggested additions to the existing **eyes** station:
  - physical shamail:51: يَكْتَحِلُ قَبْلَ أَنْ يَنَامَ بِالإِثْمِدِ، ثَلاثًا فِي كُلِّ عَيْنٍ ("used to apply antimony before going to sleep, three times in each eye")
  - physical shamail:225: أَكْحَلُ الْعَيْنَيْنِ، وَلَيْسَ بِأَكْحَلَ ("his eyes looked as if lined with kohl, though they were not")
- **Not used**: ch8–17 and ch19–32 (clothes, objects, food), ch50 (cupping) and ch54 (death). shamail:326 was skipped as unsuitable for children.
- **Fragrance** sits between hands and feet, which splits the "hands and feet" pair in the hadith. One option is to move fragrance to just after **face**, since أَزْهَرُ اللَّوْنِ (bright complexion) comes before the forehead in #8.

## Signs

15 cited signs (6 mujiza, 5 karama, 4 khasisa) and 1 research card. The kind on every card is our own classification, not the source's.

Research needed:
- **stature**: the report that he looked taller than tall people walking beside him. It is not in Bukhari, Muslim, Tirmidhi, Abu Dawud, Mishkat or the dataset's partial Ahmad.

Other candidates found but not used:
- Dream khasisa: "whoever sees me in a dream has seen me, for Satan cannot take my form" (shamail:407, bukhari:110). It could close the walkthrough or go on **face**.
- Hudaybiyya well: he spat into a bucket from the well and the well then watered everyone (bukhari:4151). This could be a 4th sign for **mouth**.
- Hair shared out at Hajj (muslim:1305b) and Abu Ṭalḥa taking his hair (bukhari:171). These could go on **hair**.

`cite()` needs these new `BOOKS` entries:
- `tirmidhi` ("Jāmi‘ al-Tirmidhī", ch 49)
- `abudawud` ("Abū Dāwūd", ch 11)
- bukhari book names for 1, 8, 11, 56, 61, 62, 63, 64, 77

## Black hair report

**Not found** in Bukhari, Muslim, Tirmidhi, Abu Dawud, Mishkat al-Masabih or the dataset's Ahmad, which is partial (about 2 MB) and has no ‘Amr ibn Akhtab entry. I searched for: أخطب; السائب; Arabic سواد/أسود near مسح or شيب; and English "black" near hair or touch.

Closest verified reports:
- **tirmidhi:3629** (Tirmidhi ch49, graded ḥasan gharīb): Abū Zayd ‘Amr ibn Akhṭab (ﷺ written for صلى الله عليه وسلم): مَسَحَ رَسُولُ اللَّهِ ﷺ يَدَهُ عَلَى وَجْهِي وَدَعَا لِي قَالَ عَزْرَةُ إِنَّهُ عَاشَ مِائَةً وَعِشْرِينَ سَنَةً وَلَيْسَ فِي رَأْسِهِ إِلاَّ شَعَرَاتٌ بِيضٌ. Dataset English: "The Messenger of Allah wiped his hand over my face and supplicated for me." 'Azrah said: "Indeed he lived for one-hundred and twenty years, and there weren't upon his head except for a few small grey hairs." This is used as a sign on **hair**.
- **bukhari:3540** (dataset): as-Sā’ib ibn Yazīd at 94 was "quite strong and of straight figure", and said his hearing and sight came from the Prophet's invocation. This is used as a sign on **seal**, because his head-stroking story is shamail:16. Hair colour is not mentioned.

Suggestion: the hands station's research card could point to tirmidhi:3629. Keep the card for the specific "black where he touched" wording, which needs a source outside this dataset (it is likely from the Dalā’il or Mu‘jam literature, unverified).

## Translation issues noticed (dataset English)

These are recorded in `corrections.json`. `src/data/texts.ts` applies only the "clear" ones to the page; the "scholar-check" ones wait for review.

- #2: "brown of color" is attached to the hair, but أسمر اللون is his complexion.
- #3: the narrator appears as "Ibn Ishaq" (should be Abū Isḥāq), and the English adds "neither curly nor lank-haired", which this Arabic does not have. The Arabic also has an odd اليسرى ("left") after أذنيه.
- #8: "would consider him haughty" for أشمّ, which describes a high-bridged nose. The "maternal aunt" error is already flagged in intro.
- #21: "bore their annual crop" for مِنْ عَامِهَا, which means "that same year" (the miracle).
- #28: "Umm Hani bint 'Ali ibn Talib" should be bint Abī Ṭālib. "Arrived boldly" is a mistranslation of قدمة ("once").
- #41: the surah references are off. عمّ يتساءلون is 78, not 74.
- #43: the English is garbled ("with a son of mine, who said").
- #222: "pause periodically" for كلام بيّن فصل ("clear, distinct speech").
- #226: "more cheerful countenance" for أكثر تبسما ("smiled more").
- #230: the English is only "Same as the above hadith", but the Arabic differs (تبسم, not ضحك).
- #318 vs #319: رجّع is translated "quivering voice" in one and "quavering tone" (negated) in the other.
- abudawud:1957: "Our ears were open" for فَفُتِحَتْ أَسْمَاعُنَا ("our hearing was opened").

## Unsure / please check

- **chest** sign bukhari:349 (Jibrīl opening and washing his chest). muslim:162c (number from the add-on, not yet checked on sunnah.com), the childhood version, is more graphic ("took out the heart… blood-clot"), so I used the Isrā’ version instead.
- **seal**: "A sign for Salmān" is labelled khasisa because the Seal itself is unique to him. The date palms are labelled mujiza.
- **voice**: Minā (abudawud:1957) is labelled mujiza. It could equally be karama.
- **voice** physical shamail:319 is Qatāda's own statement (a Successor), not a Companion's description.
- **neck**: "turned all the way round" is my reading of الْتَفَتَ مَعًا/جميعا, following the usual commentary.
- **feet** and **mouth** use saliva and foot-strike reports. The kid lines say "put a little of his saliva" and "struck it with his foot", matching the dataset English.
- Station phrases were copied from the dataset. `bun run check` checks that each one occurs in its hadith's Arabic, ignoring voweling and punctuation.
