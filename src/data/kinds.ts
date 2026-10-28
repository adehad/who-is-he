import type { Kind } from "@/models/station";

export const KINDS: Record<Kind, { label: string; explain: string }> = {
  mujiza: {
    label: "Mu‘jiza",
    explain: "A miracle that showed he was truly Allah’s Messenger.",
  },
  karama: {
    label: "Karāma",
    explain: "A blessing that came through his touch or presence.",
  },
  khasisa: {
    label: "Khaṣīṣa",
    explain: "Something special that only he had.",
  },
  research: {
    label: "Still researching",
    explain: "We have not found and checked a source for this yet.",
  },
};
