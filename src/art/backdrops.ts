export const BACKDROPS = {
  table: {
    back: '<svg class="back" viewBox="0 0 160 128" preserveAspectRatio="xMidYMid slice"><rect width="160" height="128" fill="var(--gold-soft)" opacity=".7"/><rect x="104" y="14" width="40" height="36" rx="5" fill="var(--lapis)" opacity=".25"/><path d="M124 14v36M104 32h40" stroke="var(--panel)" stroke-width="3"/><path d="M38 0v6" stroke="var(--gold)" stroke-width="2"/><circle class="i-glow" cx="38" cy="14" r="10" fill="var(--gold)" opacity=".3"/><path d="M28 14h20l-4-8h-12z" fill="var(--gold)"/></svg>',
    front:
      '<svg class="front" viewBox="0 0 160 30" preserveAspectRatio="none"><rect y="5" width="160" height="25" fill="var(--gold)" opacity=".7"/><rect width="160" height="7" rx="3" fill="var(--gold)"/></svg>',
  },
  path: {
    back: '<svg class="back" viewBox="0 0 160 128" preserveAspectRatio="xMidYMid slice"><rect width="160" height="128" fill="var(--lapis)" opacity=".18"/><circle class="i-glow" cx="134" cy="24" r="13" fill="var(--gold)" opacity=".75"/><g class="i-bob" fill="var(--panel)" opacity=".9"><ellipse cx="54" cy="24" rx="18" ry="7"/><ellipse cx="62" cy="19" rx="10" ry="7"/></g><path d="M0 90c40-18 90-22 160-8v46H0z" fill="var(--sage)" opacity=".75"/><path d="M112 128c-4-14-26-22-12-38h10c-8 12 20 22 24 38z" fill="var(--gold-soft)"/></svg>',
  },
  door: {
    back: '<svg class="back" viewBox="0 0 160 128" preserveAspectRatio="xMidYMid slice"><rect width="160" height="128" fill="var(--rose)" opacity=".1"/><rect x="16" y="18" width="28" height="28" rx="14" fill="var(--lapis)" opacity=".22"/><path d="M98 128V60a24 24 0 0 1 48 0v68z" fill="var(--rose)" opacity=".85"/><path d="M106 128V62a16 16 0 0 1 32 0v66" fill="none" stroke="var(--panel)" stroke-width="2" opacity=".35"/><circle cx="133" cy="94" r="3.5" fill="var(--gold)"/><rect x="88" y="120" width="70" height="8" rx="3" fill="var(--gold)" opacity=".6"/></svg>',
  },
} as const;
export type BackdropId = keyof typeof BACKDROPS;
