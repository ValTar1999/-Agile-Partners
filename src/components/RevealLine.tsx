import { useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type RevealLineProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** When false, animates on mount (hero). Default: on scroll into view. */
  whenInView?: boolean;
  /** Shared trigger: when set, overrides per-line whileInView. */
  active?: boolean;
};

export default function RevealLine({
  children,
  delay = 0,
  className,
  whenInView = true,
  active,
}: RevealLineProps) {
  const controlled = active !== undefined;

  const motionProps = controlled
    ? {
        animate: active ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0.5 },
      }
    : whenInView
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

export type RevealTextSegment = {
  text: string;
  className?: string;
};

type WordToken = {
  text: string;
  className?: string;
};

type RevealWrappedLinesProps = {
  segments: RevealTextSegment[];
  className?: string;
  baseDelay?: number;
  stagger?: number;
  /** Shared in-view trigger from parent. If omitted, observes this block once. */
  active?: boolean;
};

function tokenize(segments: RevealTextSegment[]): WordToken[] {
  const words: WordToken[] = [];
  for (const segment of segments) {
    const parts = segment.text.trim().split(/\s+/).filter(Boolean);
    for (const part of parts) {
      words.push({ text: part, className: segment.className });
    }
  }
  return words;
}

/** Splits flowing text into visual lines and reveals each with staggered RevealLine. */
export function RevealWrappedLines({
  segments,
  className,
  baseDelay = 0,
  stagger = 0.15,
  active: activeProp,
}: RevealWrappedLinesProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const words = useMemo(() => tokenize(segments), [segments]);
  const [lines, setLines] = useState<WordToken[][]>(() => [words]);
  const inView = useInView(rootRef, { once: true, margin: '-40px' });
  const active = activeProp ?? inView;

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      const nodes = el.querySelectorAll<HTMLElement>('[data-word]');
      if (!nodes.length) return;

      const grouped: WordToken[][] = [];
      let line: WordToken[] = [];
      let lastTop: number | null = null;
      // Subpixel / italic metrics can make same-line words differ by 1px after round().
      const LINE_TOLERANCE_PX = 4;

      nodes.forEach((node, index) => {
        const top = node.offsetTop;
        if (lastTop !== null && Math.abs(top - lastTop) > LINE_TOLERANCE_PX && line.length) {
          grouped.push(line);
          line = [];
          lastTop = top;
        } else if (lastTop === null) {
          lastTop = top;
        }
        line.push(words[index] ?? { text: node.textContent ?? '' });
      });

      if (line.length) grouped.push(line);
      setLines(grouped.length ? grouped : [words]);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [words]);

  return (
    <span ref={rootRef} className={`relative block ${className ?? ''}`}>
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute inset-x-0 top-0"
      >
        {words.map((word, i) => (
          <span key={i} data-word className={word.className}>
            {i > 0 ? ' ' : ''}
            {word.text}
          </span>
        ))}
      </span>

      {lines.map((line, lineIndex) => (
        <RevealLine
          key={line.map((w) => w.text).join(' ')}
          delay={baseDelay + lineIndex * stagger}
          active={active}
        >
          {line.map((word, i) => (
            <span key={`${word.text}-${i}`} className={word.className}>
              {i > 0 ? ' ' : ''}
              {word.text}
            </span>
          ))}
        </RevealLine>
      ))}
    </span>
  );
}
