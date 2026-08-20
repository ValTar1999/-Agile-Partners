import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedCircleGraphic from './AnimatedCircleGraphic';
import { RevealWrappedLines } from './RevealLine';

const PARAGRAPH_TEXT =
  'Agile Partners transform and support every aspect of a fintech business at every phase - from start-up to large-scale platform — across the world.';

// Keep placements inside the explicit grid (6 / 12 cols) so overflow-hidden ancestors don't clip.
const PARAGRAPH_GRID_CLASS =
  'col-span-3 col-start-4 min-w-0 md:col-span-5 md:col-start-7 xl:col-span-3 xl:col-start-8';

const PARAGRAPH_TEXT_CLASS =
  'w-full max-w-full text-base break-words -tracking-[0.48px] text-current md:text-xl md:-tracking-[0.7px]';

const PARAGRAPH_LEADING = {
  mobile: { initial: '56px', final: '22px' },
  desktop: { initial: '64px', final: '26px' },
};

function getParagraphLeading() {
  if (typeof window === 'undefined') return PARAGRAPH_LEADING.mobile;
  return window.matchMedia('(min-width: 768px)').matches
    ? PARAGRAPH_LEADING.desktop
    : PARAGRAPH_LEADING.mobile;
}

function useParagraphLeading() {
  const [leading, setLeading] = useState(getParagraphLeading);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () =>
      setLeading(mq.matches ? PARAGRAPH_LEADING.desktop : PARAGRAPH_LEADING.mobile);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return leading;
}

function RevealParagraph({ text, delay = 0 }: { text: string; delay?: number }) {
  const leading = useParagraphLeading();
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => setHeight(el.offsetHeight);
    update();
    void document.fonts?.ready?.then(update);

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, leading.final]);

  return (
    <div className={PARAGRAPH_GRID_CLASS}>
      <div className="relative w-full min-w-0">
        <p
          ref={measureRef}
          className={`${PARAGRAPH_TEXT_CLASS} pointer-events-none invisible absolute inset-x-0 top-0`}
          style={{ lineHeight: leading.final }}
          aria-hidden
        >
          {text}
        </p>
        <div className="w-full min-w-0 overflow-hidden" style={{ height: height || undefined }}>
          <motion.p
            className={PARAGRAPH_TEXT_CLASS}
            initial={{ y: '100%', opacity: 0.5, lineHeight: leading.initial }}
            animate={{ y: 0, opacity: 1, lineHeight: leading.final }}
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
            {text}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

// const TYPING_WORDS = ['ideate', 'design', 'develop', 'launch'];
// const TYPE_DELAY = 120;
// const HOLD_MS = 2000;
// const ERASE_DELAY = 60;

const CIRCLE_2_DELAY = 0.8;
const CIRCLE_3_DELAY = 3.0;

const HEADING_SEGMENTS = [
  { text: 'We' },
  { text: 'ideate', className: 'italic' },
  { text: 'fintech', className: 'text-primary' },
  { text: 'solutions that power seamless digital payments.' },
];

export default function Header() {
  // const [wordIndex, setWordIndex] = useState(0);
  // const [charCount, setCharCount] = useState(0);
  // const [isErasing, setIsErasing] = useState(false);

  // useEffect(() => {
  //   const word = TYPING_WORDS[wordIndex];

  //   if (isErasing) {
  //     if (charCount === 0) {
  //       setIsErasing(false);
  //       setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
  //       return;
  //     }
  //     const id = setTimeout(() => setCharCount((c) => c - 1), ERASE_DELAY);
  //     return () => clearTimeout(id);
  //   }

  //   if (charCount >= word.length) {
  //     const id = setTimeout(() => setIsErasing(true), HOLD_MS);
  //     return () => clearTimeout(id);
  //   }

  //   const id = setTimeout(() => setCharCount((c) => c + 1), TYPE_DELAY);
  //   return () => clearTimeout(id);
  // }, [wordIndex, charCount, isErasing]);

  // const word = TYPING_WORDS[wordIndex];
  // const displayed = word.slice(0, charCount);

  return (
    <header className="relative h-full w-full overflow-visible">
      {/* <div className="pointer-events-none absolute -bottom-1/2 left-0 h-dvh w-full overflow-visible">
        <svg
          className="-mt-64 h-full w-full origin-bottom scale-[1.53] overflow-visible object-cover md:scale-125 lg:mt-0 lg:-ml-[20%] lg:scale-100 xl:-mt-[15%] 2xl:-ml-[10%] 2xl:scale-75"
          viewBox="0 0 1341 1045"
          preserveAspectRatio="xMinYMax meet"
          fill="none"
        >
          <defs>
            <filter
              id="blob-blur"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="120" />
            </filter>
          </defs>
          <circle
            className="animate-blob-a"
            style={{ transformOrigin: '432px 515px' }}
            cx="432"
            cy="515"
            r="255"
            fill="#0AE58A"
            filter="url(#blob-blur)"
          />
          <circle
            className="animate-blob-b"
            style={{ transformOrigin: '864px 454px', animationDelay: '-2s' }}
            cx="864"
            cy="454"
            r="255"
            fill="#3AA9FA"
            filter="url(#blob-blur)"
          />
          <circle
            className="animate-blob-c"
            style={{ transformOrigin: '548px 571px', animationDelay: '-5s' }}
            cx="548"
            cy="571"
            r="255"
            fill="#3AA9FA"
            filter="url(#blob-blur)"
          />
        </svg>
      </div> */}

      <div className="relative z-10 mx-auto w-full max-w-2160 flex-col items-start px-4 md:px-10">
        <div className="relative z-10 mx-auto mt-5 grid w-full max-w-2160 grid-cols-1 items-start gap-y-8 md:mt-13 md:grid-cols-12 md:gap-x-8 md:gap-y-0 2xl:mt-4.5">
          <motion.div
            className="mt-5 hidden shrink-0 flex-col items-center gap-3 justify-self-start md:col-span-1 md:col-start-1 md:row-start-1 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            <span className="rotate-180 text-xs leading-4 font-normal tracking-[0.12px] whitespace-nowrap text-current uppercase [writing-mode:vertical-rl]">
              SCROLL DOWN
            </span>
            <div className="h-10 w-px shrink-0 overflow-hidden">
              <motion.span
                className="block h-full w-px bg-current"
                initial={{ y: '-100%' }}
                animate={{
                  y: ['-100%', '0%', '100%'],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  },
                }}
              />
            </div>
          </motion.div>
          <h1 className="min-h-0 w-full text-[40px] leading-11 -tracking-[1.6px] text-current md:col-span-11 md:col-start-2 md:min-h-25 md:text-[52px] md:leading-15 md:-tracking-[2.34px] lg:min-h-45 lg:text-[60px] lg:leading-16 lg:-tracking-[2.8px] xl:row-start-1 xl:text-7xl xl:leading-20 xl:-tracking-[2.88px] 2xl:col-span-8 2xl:col-start-3">
            <RevealWrappedLines active baseDelay={0} stagger={0.08} segments={HEADING_SEGMENTS} />
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-6 gap-y-8 md:mt-11 md:grid-cols-12 md:gap-x-8 xl:mt-16">
          <RevealParagraph text={PARAGRAPH_TEXT} />
        </div>

        <div className="relative mt-5 w-full md:mt-24 xl:-mt-24 xl:w-1/2">
          <motion.svg
            className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 xl:scale-105"
            width="925"
            height="627"
            viewBox="0 0 925 627"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          >
            <g opacity="0.2" filter="url(#filter0_f_8264_6194)">
              <circle cx="410.383" cy="313.383" r="106.383" fill="#00F38E" />
            </g>
            <g filter="url(#filter1_f_8264_6194)">
              <circle cx="306.383" cy="313.383" r="106.383" fill="#00F38E" />
            </g>
            <g filter="url(#filter2_f_8264_6194)">
              <circle cx="610.681" cy="313.504" r="113.504" fill="#007BF9" />
            </g>
            <g filter="url(#filter3_f_8264_6194)">
              <circle cx="454.761" cy="313.584" r="92.584" fill="#007BF9" />
            </g>
            <defs>
              <filter
                id="filter0_f_8264_6194"
                x="204"
                y="107"
                width="412.765"
                height="412.765"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur_8264_6194" />
              </filter>
              <filter
                id="filter1_f_8264_6194"
                x="0"
                y="7"
                width="612.765"
                height="612.765"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_8264_6194" />
              </filter>
              <filter
                id="filter2_f_8264_6194"
                x="297.177"
                y="0"
                width="627.009"
                height="627.009"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_8264_6194" />
              </filter>
              <filter
                id="filter3_f_8264_6194"
                x="162.177"
                y="21"
                width="585.168"
                height="585.168"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_8264_6194" />
              </filter>
            </defs>
          </motion.svg>

          <div className="z-20 flex items-center -space-x-20 xl:ml-[15%]">
            <AnimatedCircleGraphic type="circle" className="circle-1" />
            <AnimatedCircleGraphic type="sphere" delay={CIRCLE_2_DELAY} className="circle-2" />
            <AnimatedCircleGraphic type="target" delay={CIRCLE_3_DELAY} className="circle-3" />
          </div>
        </div>
      </div>
    </header>
  );
}
