export function ArrowIcon({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <svg
      aria-hidden="true"
      className={`icon-arrow icon-arrow--${direction}`}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}
