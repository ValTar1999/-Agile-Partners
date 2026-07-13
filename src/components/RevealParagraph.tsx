import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type LeadingConfig = {
  initial: string;
  final: string;
};

const DEFAULT_LEADING: LeadingConfig = {
  initial: '56px',
  final: '26px',
};

type RevealParagraphProps = {
  children: ReactNode;
  className?: string;
  textClassName: string;
  delay?: number;
  leading?: LeadingConfig;
  /** When set, overrides useInView (e.g. fixed footer visibility). */
  active?: boolean;
};

export default function RevealParagraph({
  children,
  className,
  textClassName,
  delay = 0,
  leading = DEFAULT_LEADING,
  active,
}: RevealParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState(0);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldShow = active ?? isInView;

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => setHeight(el.offsetHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children, leading.final, textClassName]);

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <p
        ref={measureRef}
        className={`${textClassName} pointer-events-none invisible absolute inset-x-0 top-0`}
        style={{ lineHeight: leading.final }}
        aria-hidden
      >
        {children}
      </p>
      <div className="overflow-hidden" style={height ? { height } : undefined}>
        <motion.p
          className={textClassName}
          initial={{ y: '100%', opacity: 0.5, lineHeight: leading.initial }}
          animate={
            shouldShow
              ? { y: 0, opacity: 1, lineHeight: leading.final }
              : { y: '100%', opacity: 0.5, lineHeight: leading.initial }
          }
          transition={{
            y: {
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay,
            },
            opacity: {
              duration: 0.1,
              ease: 'easeOut',
              delay: delay + 0.18,
            },
            lineHeight: {
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay,
            },
          }}
        >
          {children}
        </motion.p>
      </div>
    </div>
  );
}
