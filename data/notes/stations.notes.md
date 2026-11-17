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
| 6 | mouth | ch1 #8, #9 | eyes |
| 7 | neck | ch1 #7, #8, #12 | mouth |
| 8 | chest | ch1 #7, #8 | neck |
| 9 | hands* | ch1 | |
| 10 | fragrance* | ch48 + muslim:2330b | |
| 11 | feet | ch1 #8 + ch18 #122 + ch40 #260 | fragrance |
| 12 | seal | ch2 #16–23 | feet |
| 13 | hair | ch3–6 + ch1 #8 | seal |
| 14 | speech | ch33 #222–224 | hair |
| 15 | smile | ch34 #224–232 | speech |
| 16 | voice | ch44 #313–317 + bukhari:769 | smile |
| 17 | tears | ch45 #321–324 | voice |

## Merges

- **brow** = forehead + eyebrows + nose. In #8 these are three short adjacent phrases, and each one alone is too thin for a station. The "vein that anger makes pulse" gives the character link (bukhari:3560: he never took revenge for his own sake).
- **mouth** = cheeks + mouth + teeth (#8, #9). It is kept apart from **smile** (ch34) because the saliva signs belong here and the smile hadith sit at a later point in the book.
- **hair** = ch3 hair + ch4 combing + ch5 grey hair + ch6 dye + the beard from #8. The beard alone was one phrase (كث اللحية), and ch5 counts the white hairs of the head and beard together.
- **feet** = ch1 feet + gait + ch18 walking. #123 and #124 in ch18 repeat #5 and #7. Only #122 ("the earth seemed folded up for him") is new, so the station stays at the ch1 position. The ch40 swollen-feet hadith (#260) supplies the character link.
- **kohl (ch7)** gets no station. It is about a practice, not a feature. **eyes** shows the natural kohl-dark look instead (shamail:225, أَكْحَلُ الْعَيْنَيْنِ، وَلَيْسَ بِأَكْحَلَ). The practice itself (shamail:51, kohl before sleep, three times in each eye) is not shown.
- **Not used**: ch8–17 and ch19–32 (clothes, objects, food), ch50 (cupping) and ch54 (death). shamail:326 was skipped as unsuitable for children.
- **Fragrance** sits between hands and feet, which splits the "hands and feet" pair in the hadith. One option is to move fragrance to just after **face**, since أَزْهَرُ اللَّوْنِ (bright complexion) comes before the forehead in #8.

## Signs

31 cited signs (11 mujiza, 8 karama, 12 khasisa) and 1 research card (hands). The kind on every card is our own classification, not the source's.

Needing a scholar:
- **stature**: “Never looking shorter” rests on one route, al-Bayhaqī’s Dalāʾil (bayhaqi-dalail:1/285) through Ṣubayḥ al-Farghānī, whom al-Bayhaqī calls not well known. Al-Qārī counts it a miracle (mujiza); whether to present it as one is open. ‘Alī’s «إذا جاء مع القوم غمرهم» (ahmad:1300) is separate and sits in the station’s descriptions.

Other candidates found but not used:
- Dream khasisa: "whoever sees me in a dream has seen me, for Satan cannot take my form" (shamail:407, bukhari:110). It could close the walkthrough or go on **face**.

`cite()` needs these new `BOOKS` entries:
- `tirmidhi` ("Jāmi‘ al-Tirmidhī", ch 49)
- `abudawud` ("Abū Dāwūd", ch 11)
- bukhari book names for 1, 8, 11, 56, 61, 62, 63, 64, 77

## Black hair report

The **hands** card "Hair that stayed black" cites Abū Sufyān Madlūk (tabarani-kabir:20/804): where the Prophet ﷺ had stroked his head stayed black when the rest turned white. The same is reported of al-Sā’ib ibn Yazīd (bayhaqi-dalail:6/209), Muḥammad ibn Anas, brought to him as a baby (bayhaqi-dalail:6/213-2), ‘Amr ibn Tha‘laba (tabarani-kabir:17/84) and Qays ibn Zayd (shifa:1/645). None is graded, and ‘Amr’s chain runs through Ya‘qūb al-Zuhrī: a scholar should check the chains.

Related reports used elsewhere:
- **tirmidhi:3629** (Tirmidhi ch49, graded ḥasan gharīb): Abū Zayd ‘Amr ibn Akhṭab: مَسَحَ رَسُولُ اللَّهِ ﷺ يَدَهُ عَلَى وَجْهِي وَدَعَا لِي قَالَ عَزْرَةُ إِنَّهُ عَاشَ مِائَةً وَعِشْرِينَ سَنَةً وَلَيْسَ فِي رَأْسِهِ إِلاَّ شَعَرَاتٌ بِيضٌ. Used as a sign on **hair**. Al-Bayhaqī gives the same story with «اللهم جمله وأدم جماله» and calls its chain sound and connected (bayhaqi-dalail:6/211): the prayer kept his whole head mostly dark, which is a different kind of report from the touched patch.
- **bukhari:3540**: as-Sā’ib ibn Yazīd at 94 was "quite strong and of straight figure", and said his hearing and sight came from the Prophet's invocation. Used as a sign on **seal**, because his head-stroking story is shamail:16.

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
- #225: "his eyes are blackened [with kohl], though and he is not black-eyed" for أكحل العينين وليس بأكحل ("his eyes look lined with kohl, though they are not").
- #226: "more cheerful countenance" for أكثر تبسما ("smiled more").
- #230: the English is only "Same as the above hadith", but the Arabic differs (تبسم, not ضحك).
- #318 vs #319: رجّع is translated "quivering voice" in one and "quavering tone" (negated) in the other.
- muslim:2340b: "there is one amongst the people of the earth who… had seen him except me" for وما على وجه الأرض رجل رآه غيري ("there is no man left on earth who saw him except me").
- abudawud:1957: "Our ears were open" for فَفُتِحَتْ أَسْمَاعُنَا ("our hearing was opened").
- bukhari:5907: "his palms were soft" for بَسِطَ الْكَفَّيْنِ, which Ibn Ḥajar reads as long without excess.
- bukhari:3561: "the sweat of the Prophet" for عَرْف, which is fragrance (sweat is عَرَق).

## Unsure / please check

- **chest**: the children's card is the Isrā’ washing (bukhari:349). The childhood opening is a grown-up card in Aḥmad's gentlest wording (ahmad:21261); muslim:162c (number from the add-on, not yet checked on sunnah.com) tells it more vividly ("took out the heart… blood-clot"). How far to tell the opening to children is still to be decided.
- **seal**: "A sign for Salmān" is labelled khasisa because the Seal itself is unique to him. The date palms are labelled mujiza.
- **voice**: Minā (abudawud:1957) is labelled mujiza. It could equally be karama.
- **neck**: "turned all the way round" is my reading of الْتَفَتَ مَعًا/جميعا, following the usual commentary.
- **feet** and **mouth** use saliva and foot-strike reports. The kid lines say "put a little of his saliva" and "struck it with his foot", matching the dataset English.
- Station phrases were copied from the dataset. `bun run check` checks that each one occurs in its hadith's Arabic, ignoring voweling and punctuation.

## Senses: eyes, mouth, smile, tears

Points for a scholar on these four stations. Grades are shown on the site, so Da'if Shamāʾil reports stay alongside the sound ones; severely weak reports (Da'if Jiddan, munkar, mawdu') are left out.

- **eyes**
  - أشكل العين (shamail:9): the gloss follows Qāḍī ʿIyāḍ, al-Nihāya and al-Qārī (a red tinge in the white of the eye), not the narrator Simāk's "long-slit eye", which they call a slip. Confirm.
  - The ʿAlawī route of Hind's description (bayhaqi-dalail:1/285) is cited beside shamail:8 for the downward gaze. Its chain is ungraded.
  - Qatāda's eye (tabarani-kabir:19/12) is grown-up only, as a battle injury. Badr or Uḥud: al-Bayhaqī (3/251) gives both.
  - hakim:4274 (Umm Maʿbad): is the corpus grade صحيح al-Dhahabī's or al-Ḥākim's?
- **mouth**
  - The light seen between his teeth when he spoke (shamail:15, with the same chain at darimi:59, bayhaqi-dalail:1/215 and tabarani-kabir:11/12181) is graded Daʿīf Jiddan and is not shown, not even for grown-ups. The bright-teeth entry (tabarani-kabir:10/10397, ungraded) mentions in its note why it is missing. A scholar may still prefer a flagged grown-up card.
  - ضليع الفم as a kināya for eloquence is al-Qārī's reading (1/45), given in a note rather than as the meaning.
  - Icon: the lantern now stands for true words. The owner may prefer another.
- **smile**
  - shamail:226 ("no one smiled more", Daʿīf) is not shown: tirmidhi:3641 carries the same words from the same Companion with a Ḥasan grade, so it would only repeat.
  - Jarīr's smile is a character card (shamail:230). His horse is a sign on **chest** (bukhari:4357), where the report has his chest struck; it is labelled karāma (blessing through his touch and prayer) and could be mujiza.
  - bayhaqi-dalail:1/274-2 («إذا ضحك يتلألأ») comes through al-Zuhrī from Abū Hurayra, a broken chain.
- **tears**
  - The death of his son Ibrāhīm (bukhari:1303) is a grown-up-only character card. The child-facing station line mentions only that he wept "when someone he loved was dying".
  - The weeping camel (hakim:2485) also appears at abudawud:2549, which the corpus shows ungraded; al-Bayhaqī attributes it to Muslim. A scholar should confirm the grade shown.
  - hakim:1671 (tears at the Black Stone) runs through Nuʿaym ibn Ḥammād, whom some critics weaken despite al-Ḥākim's grade.
  - Qatāda's eye on **eyes** also has his tears (دمعت عيناه); it is shown there, not here.

Handed to other stations: the ʿAlawī route of Hind (bayhaqi-dalail:1/285) also covers face, brow, neck, chest, hands, feet, speech; Muḥammad ibn Ḥāṭib's burned hand (hakim:6909) fits **hands**; the eloquence kināya of ضليع الفم fits **speech**.

## Chest

Physical: Hind (shamail:8) with al-Barā’'s ṣaḥīḥ wording for the shoulders (bukhari:3551) and the ‘Alawī route's فسيح الصدر (bayhaqi-dalail:1/285), which avoids the unnamed man in Tirmidhī's chain. جليل المشاش والكتد (shamail:7) is glossed as large joints and upper back, following al-Nihāya on كتد.

Character: Ibn ‘Abbās's wind (bukhari:6), ‘Alī's أجود الناس صدرا (shamail:7, Ḍa‘īf, with al-Qārī's reading) and Qur’an 3:159 ("Soft-hearted"). Signs: the washing (bukhari:349), 94:1, Jarīr (bukhari:4357), ‘Alī sent to Yemen (hakim:4658, on the two Shaykhs' criteria per al-Ḥākim), and the childhood opening as a grown-up card (ahmad:21261, ungraded).

Open points:
- Whether the ‘Alawī route lifts Hind's report (its chain runs through the Ḥusaynī family to Ja‘far al-Ṣādiq).
- How far to tell the opening of the chest to children.
- Not used: darimi:13 and hakim:4230 (the heart sealed after the opening) are on **seal** as a grown-up card; muslim:468a, because the hadith never says the unease left; quran:94:2–3, 39:22, 6:125, 20:25 and 53:11, which are about others or open disputes.

## Hands

Physical: شثن (shamail:5) with Anas's ṣaḥīḥ "big hands and feet" (bukhari:5907), رحب الراحة (shamail:8, only in Hind), softer than silk (shamail:344) and cooler than snow (bukhari:3553). The notes give the commentators' reconciliation of thick and soft (al-Haytamī: soft skin, strong bones) and teach راحة only as one word family with ريح and رائحة.

Character: never said no (muslim:2311a), the handful of jewellery for ar-Rubayyi‘ (shamail:201, Ḍa‘īf), never "uff" and never hit a servant (shamail:344, 347), and the servant girl who could lead him by the hand (ibnmajah:4177). Signs: water from his fingers (bukhari:169), the cool, fragrant pat (muslim:2329), hair that stayed black (tabarani-kabir:20/804), pebbles glorifying in his palm (bayhaqi-dalail:6/64) and Umm Ma‘bad's ewe (hakim:4274).

Open points:
- شثن: whether to mention "inclining to short" (al-Nihāya, al-Qārī) or follow Ibn Ḥajar's "thick without shortness or roughness".
- بسط / سبط الكفين (bukhari:5907): the rendering, and whether the sunnah.com "soft" should be replaced.
- The touched-hair chains (see Black hair report).
- Not used: the generosity reading of رحب الراحة as a physiognomic sign (qari-jam:1/40 gives it only as «قيل»); lisan:سبط's "open-handed", which Ibn Ḥajar says is not meant here; quran:48:10 and 8:17, which put a divine attribute or a battle in front of children; Ḥanẓala's healing palm (ahmad:20665), kept back to avoid crowding the station.

## Feet

Physical: Hind's feet and walk (shamail:8), Anas's ṣaḥīḥ "when he walked he leaned forward" (muslim:2330b) and Abū Hurayra's "the earth seemed folded up for him" (shamail:122). The notes carry the lexical meanings (خمص, مسيح, صبب, قلع, هون) and say which readings are open.

Character: the swollen feet (shamail:260, with the 17:3 echo of Nūḥ, framed as an echo), walking with the widow and the poor (nasai:1414), and walking behind his Companions and greeting first (shamail:8, Ḍa‘īf, with al-Qārī's shepherd reading). Signs: Uḥud (bukhari:3686) and Jābir's tired camel (ahmad:14195; Muslim has it without the foot).

Open points:
- The hollow of the foot: Hind's خمصان الأخمصين against Abū Hurayra's "no hollow" (adab:1155, ungraded; bayhaqi-dalail:1/274-2 has a gap in its chain). The gloss says "drawn in" without taking a side.
- Which صبب wording to show (من صبب, في صبب) and whether to give Ibn ‘Abbās's "strength of body" reading.
- Not used: the footprint likened to Ibrāhīm's at the Maqām and the rabbi who knew his walk (ibnsad:1/117-3, 5/458, 1/412-2), all through al-Wāqidī (matrūk); Ḥirā’ (abunuaym-dalail:337) and Thabīr (tirmidhi:3703), which repeat Uḥud; ‘Alī healed with a nudge of the foot (tirmidhi:3564), whose context is a prayer to die; Qur’an 17:37, 5:6, 38:42, 34:10 and 57:28, which are about others or only images.

## Seal

Physical: ‘Alī's "Seal of Prophethood, for he is the Seal of the Prophets" (shamail:19), the dove's egg in Muslim (muslim:2344b) and in Jābir's Shamā'il wording as a reddish lump (shamail:17, Ḍa‘īf), Abū Sa‘īd's "raised piece of flesh" (shamail:22, the plainest), the canopy button (shamail:16) and the gathered hairs (shamail:20). Al-Qārī's note that all the similes describe one raised piece of flesh is on shamail:22.

Character: as-Sā’ib (shamail:16), Ibn Sarjis (shamail:23) and Umm Khālid playing with the Seal (bukhari:5993, "Patient"). Signs: Salmān (shamail:21), the date palms, the Seal foretold to Salmān by his teacher (ibnsad:4/81-2), as-Sā’ib at 94 (bukhari:3540), the last brick (bukhari:3535), Qur’an 33:40, and a grown-up card on the heart sealed after the childhood washing (darimi:13).

Open points:
- زر الحجلة: canopy button or partridge's egg.
- Right or left shoulder: ibnsad:4/81-2 says right, muslim:2346 left.
- Whether the Seal is the mark of the sealing after the chest-opening (Qāḍī ‘Iyāḍ for, al-Nawawī against).
- Not used: the inscription reports («محمد رسول الله» written in the Seal; al-‘Asqalānī: none is established) and Baḥīrā kissing the Seal (ibnsad:1/153-2, al-Wāqidī); Rumaytha's "I could have kissed the Seal" (shamail:18, Ḍa‘īf), whose report is about the death of Sa‘d; Abū Rimtha's father offering to treat it as a growth (ahmad:7116), which needs explaining; the musk from the Seal (shifa:1/154, no chain); Wahb ibn Munabbih on the marks of earlier prophets (haytami-ashraf:1/81-2).
