type BrandArtworkProps = {
  label?: string;
  className?: string;
};

/**
 * PLACEHOLDER: branded geometric visual used only where no relevant real photo exists.
 * It is intentionally abstract and carries an explicit accessible label rather than implying a project.
 */
export function BrandArtwork({ label = "Abstract Mendozer brand-gradient graphic", className = "" }: BrandArtworkProps) {
  return (
    <div aria-label={label} className={`brand-artwork ${className}`} role="img">
      <span className="brand-artwork__beam brand-artwork__beam--one" />
      <span className="brand-artwork__beam brand-artwork__beam--two" />
      <span className="brand-artwork__beam brand-artwork__beam--three" />
      <span className="brand-artwork__line" />
    </div>
  );
}
