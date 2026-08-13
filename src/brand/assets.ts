/** Exact client-supplied identity files, copied byte-for-byte from /assets to /public/assets for delivery. */
export const brandAssets = {
  /** Primary horizontal lockup, gradient icon + wordmark, for light surfaces (header on white). */
  logoLight: "/assets/logos/mendozer-logo-full.svg",
  /** Horizontal lockup with gradient tile background + white text, for dark surfaces (header over hero, footer). */
  logoDark: "/assets/logos/mendozer-logo-dark-theme.svg",
  /** Horizontal white lockup on opaque dark (#303030) tile, for dark photos or solid dark panels. */
  logoMonoWhite: "/assets/logos/mendozer-logo-mono-white.svg",
  /** Horizontal dark charcoal (#303030) mono lockup, for light surfaces requiring single-ink print. */
  logoMonoNavy: "/assets/logos/mendozer-logo-mono-navy.svg",
  /** Horizontal gray (#686868) mono lockup, for grayscale print, fax, partner co-brand on light. */
  logoGrayMono: "/assets/logos/mendozer-logo-gray-mono.svg",
  /** Vertical/stacked lockup, gradient icon + wordmark, for centered/narrow placements (splash, cards). */
  logoStacked: "/assets/logos/mendozer-logo-stacked.svg",
  /** Icon mark only, transparent gradient, for transparent favicon/UI slots on light surfaces. */
  icon: "/assets/logos/mendozer-icon.svg",
  /** Icon mark on opaque gradient tile, for app icons, social avatars, PWA icons. */
  iconTile: "/assets/logos/mendozer-icon-tile.svg",
  /** Favicon entry kept from the previous set per client instruction. */
  favicon: "/assets/favicon/favicon-32.png",
  /** Tangison credit logo, white, used only in footer credit link. */
  tangisonWhite: "/assets/logos/tangison/tangison-logo-white.svg",
} as const;
