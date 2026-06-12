import React, { useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** render HUD corner brackets */
  corners?: boolean;
}

/**
 * SpotlightCard — obsidian card whose border and inner glow follow the
 * cursor (via --mx/--my consumed by .spotlight-card in index.css).
 */
const SpotlightCard = ({ children, className, corners = false, ...rest }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  const onMouseEnter = useCallback(() => {
    ref.current?.style.setProperty('--spot-opacity', '1');
  }, []);

  const onMouseLeave = useCallback(() => {
    ref.current?.style.setProperty('--spot-opacity', '0');
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn('spotlight-card card-obsidian', corners && 'hud-corners', className)}
      {...rest}
    >
      {corners && (
        <>
          <span className="hud-bracket" aria-hidden="true" />
          <span className="hud-bracket" aria-hidden="true" />
          <span className="hud-bracket" aria-hidden="true" />
          <span className="hud-bracket" aria-hidden="true" />
        </>
      )}
      {children}
    </div>
  );
};

export default SpotlightCard;
