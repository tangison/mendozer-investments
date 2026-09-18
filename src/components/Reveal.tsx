import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * Plain layout wrapper. The site runs a deliberate motion-cut stance, so
 * this carries no animation state: it only groups children for spacing hooks.
 */
export function Reveal({ children, className = "", style }: RevealProps & { style?: CSSProperties }) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
