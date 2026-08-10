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

function linesEqual(a: WordToken[][], b: WordToken[][]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j].text !== b[i][j].text || a[i][j].className !== b[i][j].className) {
        return false;
      }
    }
  }
  return true;
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

      const containerWidth = el.getBoundingClientRect().width;
      if (containerWidth < 1) return;

      // Prefer width packing over offsetTop — more stable across fonts/subpixels/Safari.
      const spaceWidth = (() => {
        const probe = el.querySelector<HTMLElement>('[data-space]');
        return probe?.getBoundingClientRect().width ?? containerWidth * 0.02;
      })();

      const grouped: WordToken[][] = [];
      let line: WordToken[] = [];
      let lineWidth = 0;

      nodes.forEach((node, index) => {
        const word = words[index] ?? { text: node.textContent ?? '' };
        const wordWidth = node.getBoundingClientRect().width;
        const nextWidth = line.length === 0 ? wordWidth : lineWidth + spaceWidth + wordWidth;

        if (line.length > 0 && nextWidth > containerWidth + 0.5) {
          grouped.push(line);
          line = [word];
          lineWidth = wordWidth;
          return;
        }

        line.push(word);
        lineWidth = nextWidth;
      });

      if (line.length) grouped.push(line);

      const next = grouped.length ? grouped : [words];
      setLines((prev) => (linesEqual(prev, next) ? prev : next));
    };

    measure();

    void document.fonts?.ready?.then(() => measure());

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (rootRef.current) ro.observe(rootRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [words]);

  return (
    <span ref={rootRef} className={`relative block w-full ${className ?? ''}`}>
      {/* In-flow full-width measure: absolute + inset can shrink wrong on some WebKit sizes. */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none block h-0 w-full overflow-hidden opacity-0"
      >
        {words.map((word, i) => (
          <span key={i}>
            {i > 0 ? <span data-space> </span> : null}
            <span data-word className={`whitespace-nowrap ${word.className ?? ''}`}>
              {word.text}
            </span>
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
