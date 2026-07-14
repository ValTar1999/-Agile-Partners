import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

type RevealLineProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** When false, animates on mount (hero). Default: on scroll into view. */
  whenInView?: boolean;
};

export default function RevealLine({
  children,
  delay = 0,
  className,
  whenInView = true,
}: RevealLineProps) {
  const motionProps = whenInView
    ? {
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, margin: '-10px' as const },
      }
    : {
        animate: { y: 0, opacity: 1 },
      };

  return (
    <span className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        className="block"
        initial={{ y: '100%', opacity: 0.5 }}
        {...motionProps}
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
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
