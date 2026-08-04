import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import RevealLine from './RevealLine';

const PARAGRAPH_TEXT =
  'Agile Partners transform and support every aspect of a fintech business at every phase - from start-up to large-scale platform — across the world.';

const PARAGRAPH_GRID_CLASS =
  'col-span-4 col-start-3 md:col-span-5 md:col-start-7 xl:col-span-2 xl:col-start-8 ';

const PARAGRAPH_TEXT_CLASS =
  'text-base -tracking-[0.48px] text-current md:text-xl md:-tracking-[0.7px] min-w-62 max-w-62';

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

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, leading.final]);

  return (
    <div className={`relative ${PARAGRAPH_GRID_CLASS}`}>
      <p
        ref={measureRef}
        className={`${PARAGRAPH_TEXT_CLASS} pointer-events-none invisible absolute inset-x-0 top-0`}
        style={{ lineHeight: leading.final }}
        aria-hidden
      >
        {text}
      </p>
      <div className="min-w-62 overflow-hidden" style={{ height: height || undefined }}>
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
  );
}

// const TYPING_WORDS = ['ideate', 'design', 'develop', 'launch'];
// const TYPE_DELAY = 120;
// const HOLD_MS = 2000;
// const ERASE_DELAY = 60;

/** Flat center meridian — same cubic structure as curved meridians for path morph. */
const MERIDIAN_FLAT =
  'M137.5 276.5C138.5 276.5 138.5 214.715 138.5 138.5C138.5 62.2847 138.5 0.5 137.5 0.5';

/** Circles play one after another: 1 → 2 → 3. */
const CIRCLE_1_DURATION = 0.9;
const CIRCLE_2_DELAY = 0.8;
const CIRCLE_3_DELAY = 3.0;

/** Middle Circle: outer ring → diameter → meridians bend out from center. Total 2.2s. */
const MIDDLE_CIRCLE_RING = {
  delay: 0,
  duration: 0.8,
  d: 'M138.5 0.500574C156.622 0.500573 174.567 4.07004 191.31 11.0052C208.053 17.9403 223.266 28.1053 236.08 40.9198C248.895 53.7342 259.06 68.9472 265.995 85.6901C272.93 102.433 276.499 120.378 276.499 138.5C276.499 156.623 272.93 174.568 265.995 191.31C259.06 208.053 248.895 223.266 236.08 236.081C223.266 248.895 208.053 259.06 191.31 265.995C174.567 272.931 156.622 276.5 138.5 276.5C120.377 276.5 102.432 272.931 85.6895 265.995C68.9466 259.06 53.7336 248.895 40.9192 236.081C28.1047 223.266 17.9397 208.053 11.0046 191.31C4.06946 174.568 0.499992 156.623 0.499994 138.5C0.499996 120.378 4.06947 102.433 11.0046 85.6901C17.9397 68.9472 28.1047 53.7342 40.9192 40.9197C53.7336 28.1053 68.9466 17.9403 85.6895 11.0052C102.432 4.07004 120.377 0.500571 138.5 0.500574L138.5 0.500574Z',
};

const MIDDLE_CIRCLE_DIAMETER = {
  delay: 0.8,
  duration: 0.35,
  d: 'M138.5 0.5V276.5',
};

/** Meridians: each finishes fully, then the next peels out from it. */
const MIDDLE_CIRCLE_MERIDIANS: {
  from: string;
  to: string;
  delay: number;
  duration: number;
}[] = [
  {
    delay: 1.15,
    duration: 0.35,
    from: MERIDIAN_FLAT,
    to: 'M137.5 276.5C159.591 276.5 177.5 214.715 177.5 138.5C177.5 62.2847 159.591 0.5 137.5 0.5',
  },
  {
    delay: 1.5,
    duration: 0.35,
    from: 'M137.5 276.5C159.591 276.5 177.5 214.715 177.5 138.5C177.5 62.2847 159.591 0.5 137.5 0.5',
    to: 'M137.5 276.5C178.921 276.5 212.5 214.715 212.5 138.5C212.5 62.2847 178.921 0.5 137.5 0.5',
  },
  {
    delay: 1.85,
    duration: 0.35,
    from: 'M137.5 276.5C178.921 276.5 212.5 214.715 212.5 138.5C212.5 62.2847 178.921 0.5 137.5 0.5',
    to: 'M137.5 276.5C198.251 276.5 247.5 214.715 247.5 138.5C247.5 62.2847 198.251 0.5 137.5 0.5',
  },
];

/** Third Circle rings: draw 0→100 with staggered delays (ms from Rive timeline). */
const CIRCLE_3_RINGS: { d: string; delay: number }[] = [
  {
    delay: 0,
    d: 'M138.5 0.500574C156.622 0.500573 174.567 4.07004 191.31 11.0052C208.053 17.9403 223.266 28.1053 236.08 40.9198C248.895 53.7342 259.06 68.9472 265.995 85.6901C272.93 102.433 276.499 120.378 276.499 138.5C276.499 156.623 272.93 174.568 265.995 191.31C259.06 208.053 248.895 223.266 236.08 236.081C223.266 248.895 208.053 259.06 191.31 265.995C174.567 272.931 156.622 276.5 138.5 276.5C120.377 276.5 102.432 272.931 85.6895 265.995C68.9466 259.06 53.7336 248.895 40.9192 236.081C28.1047 223.266 17.9397 208.053 11.0046 191.31C4.06946 174.568 0.499992 156.623 0.499994 138.5C0.499996 120.378 4.06947 102.433 11.0046 85.6901C17.9397 68.9472 28.1047 53.7342 40.9192 40.9197C53.7336 28.1053 68.9466 17.9403 85.6895 11.0052C102.432 4.07004 120.377 0.500571 138.5 0.500574L138.5 0.500574Z',
  },
  {
    delay: 0.4,
    d: 'M138.5 51.498C149.925 51.498 161.238 53.7484 171.793 58.1205C182.349 62.4927 191.94 68.9011 200.018 76.9798C208.097 85.0584 214.505 94.6493 218.878 105.205C223.25 115.76 225.5 127.073 225.5 138.498C225.5 149.923 223.25 161.236 218.878 171.792C214.505 182.347 208.097 191.938 200.018 200.016C191.94 208.095 182.349 214.503 171.793 218.876C161.238 223.248 149.925 225.498 138.5 225.498C127.075 225.498 115.762 223.248 105.207 218.876C94.6512 214.503 85.0604 208.095 76.9817 200.016C68.903 191.938 62.4946 182.347 58.1225 171.791C53.7503 161.236 51.5 149.923 51.5 138.498C51.5 127.073 53.7503 115.76 58.1225 105.205C62.4946 94.6493 68.903 85.0584 76.9817 76.9797C85.0604 68.9011 94.6512 62.4927 105.207 58.1205C115.762 53.7484 127.075 51.498 138.5 51.498L138.5 51.498Z',
  },
  {
    delay: 1,
    d: 'M138.499 80.502C146.116 80.502 153.658 82.0022 160.695 84.9169C167.732 87.8317 174.125 92.104 179.511 97.4898C184.897 102.876 189.169 109.269 192.084 116.306C194.999 123.343 196.499 130.885 196.499 138.502C196.499 146.119 194.999 153.661 192.084 160.698C189.169 167.734 184.897 174.128 179.511 179.514C174.125 184.9 167.732 189.172 160.695 192.087C153.658 195.002 146.116 196.502 138.499 196.502C130.882 196.502 123.34 195.002 116.303 192.087C109.266 189.172 102.873 184.9 97.4868 179.514C92.101 174.128 87.8288 167.734 84.914 160.698C81.9992 153.661 80.499 146.119 80.499 138.502C80.499 130.885 81.9992 123.343 84.914 116.306C87.8288 109.269 92.101 102.876 97.4868 97.4898C102.873 92.104 109.267 87.8317 116.303 84.9169C123.34 82.0022 130.882 80.502 138.499 80.502L138.499 80.502Z',
  },
  {
    delay: 1,
    d: 'M138.499 88.502C145.065 88.502 151.567 89.7952 157.633 92.308C163.699 94.8207 169.211 98.5037 173.854 103.147C178.497 107.79 182.18 113.302 184.693 119.368C187.206 125.434 188.499 131.936 188.499 138.502C188.499 145.068 187.206 151.57 184.693 157.636C182.18 163.702 178.497 169.214 173.854 173.857C169.211 178.5 163.699 182.183 157.633 184.696C151.567 187.209 145.065 188.502 138.499 188.502C131.933 188.502 125.431 187.209 119.365 184.696C113.299 182.183 107.787 178.5 103.144 173.857C98.5008 169.214 94.8178 163.702 92.305 157.636C89.7923 151.57 88.499 145.068 88.499 138.502C88.499 131.936 89.7923 125.434 92.305 119.368C94.8178 113.302 98.5008 107.79 103.144 103.147C107.787 98.5037 113.299 94.8207 119.365 92.308C125.431 89.7952 131.933 88.502 138.499 88.502L138.499 88.502Z',
  },
  {
    delay: 1,
    d: 'M138.501 96.498C144.016 96.498 149.478 97.5844 154.574 99.6951C159.669 101.806 164.299 104.899 168.199 108.8C172.1 112.7 175.193 117.33 177.304 122.425C179.415 127.521 180.501 132.983 180.501 138.498C180.501 144.014 179.415 149.475 177.304 154.571C175.193 159.666 172.1 164.296 168.199 168.197C164.299 172.097 159.669 175.19 154.574 177.301C149.478 179.412 144.016 180.498 138.501 180.498C132.985 180.498 127.524 179.412 122.428 177.301C117.333 175.19 112.703 172.097 108.802 168.197C104.902 164.296 101.809 159.666 99.698 154.571C97.5873 149.475 96.501 144.014 96.501 138.498C96.501 132.983 97.5873 127.521 99.698 122.425C101.809 117.33 104.902 112.7 108.802 108.8C112.703 104.899 117.333 101.806 122.428 99.6951C127.524 97.5844 132.985 96.498 138.501 96.498L138.501 96.498Z',
  },
  {
    delay: 1,
    d: 'M138.5 104.498C142.965 104.498 147.386 105.377 151.511 107.086C155.636 108.795 159.384 111.299 162.542 114.456C165.699 117.614 168.203 121.362 169.912 125.487C171.621 129.612 172.5 134.033 172.5 138.498C172.5 142.963 171.621 147.384 169.912 151.509C168.203 155.634 165.699 159.382 162.542 162.54C159.384 165.697 155.636 168.201 151.511 169.91C147.386 171.619 142.965 172.498 138.5 172.498C134.035 172.498 129.614 171.619 125.489 169.91C121.364 168.201 117.616 165.697 114.458 162.54C111.301 159.382 108.797 155.634 107.088 151.509C105.379 147.384 104.5 142.963 104.5 138.498C104.5 134.033 105.379 129.612 107.088 125.487C108.797 121.362 111.301 117.614 114.458 114.456C117.616 111.299 121.364 108.795 125.489 107.086C129.614 105.377 134.035 104.498 138.5 104.498L138.5 104.498Z',
  },
  {
    delay: 1,
    d: 'M138.5 112.498C141.914 112.498 145.295 113.171 148.45 114.477C151.604 115.784 154.47 117.699 156.885 120.113C159.299 122.528 161.214 125.394 162.521 128.548C163.827 131.703 164.5 135.084 164.5 138.498C164.5 141.912 163.827 145.293 162.521 148.448C161.214 151.602 159.299 154.468 156.885 156.883C154.47 159.297 151.604 161.212 148.45 162.519C145.295 163.826 141.914 164.498 138.5 164.498C135.086 164.498 131.705 163.826 128.55 162.519C125.396 161.212 122.53 159.297 120.115 156.883C117.701 154.468 115.786 151.602 114.479 148.448C113.173 145.293 112.5 141.912 112.5 138.498C112.5 135.084 113.173 131.703 114.479 128.548C115.786 125.394 117.701 122.528 120.115 120.113C122.53 117.699 125.396 115.784 128.55 114.477C131.705 113.171 135.086 112.498 138.5 112.498L138.5 112.498Z',
  },
  {
    delay: 1,
    d: 'M138.5 120.498C140.864 120.498 143.204 120.964 145.388 121.868C147.572 122.773 149.556 124.099 151.228 125.77C152.899 127.442 154.225 129.426 155.13 131.61C156.034 133.794 156.5 136.134 156.5 138.498C156.5 140.862 156.034 143.202 155.13 145.386C154.225 147.57 152.899 149.555 151.228 151.226C149.556 152.897 147.572 154.223 145.388 155.128C143.204 156.032 140.864 156.498 138.5 156.498C136.136 156.498 133.796 156.032 131.612 155.128C129.428 154.223 127.444 152.897 125.772 151.226C124.101 149.555 122.775 147.57 121.87 145.386C120.966 143.202 120.5 140.862 120.5 138.498C120.5 136.134 120.966 133.794 121.87 131.61C122.775 129.426 124.101 127.442 125.772 125.77C127.444 124.099 129.428 122.773 131.612 121.868C133.796 120.964 136.136 120.498 138.5 120.498L138.5 120.498Z',
  },
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
  const displayed = 'ideate';

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
        <div className="relative z-10 mx-auto mt-12 grid w-full max-w-2160 grid-cols-1 items-start gap-y-8 md:mt-13 md:grid-cols-12 md:gap-x-8 md:gap-y-0 2xl:mt-4.5">
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
            <RevealLine delay={0} whenInView={false}>
              We{' '}
              <span className="inline-flex items-baseline gap-1 italic">
                {displayed}
                {/* <span
                  className="animate-blink inline-block h-10 w-px shrink-0 self-baseline bg-current"
                  aria-hidden
                /> */}
              </span>{' '}
              <span className="text-primary">fintech</span> solutions that
            </RevealLine>
            <RevealLine className="pb-0.5" delay={0.08} whenInView={false}>
              power seamless digital payments.
            </RevealLine>
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-6 gap-y-8 md:mt-11 md:grid-cols-12 md:gap-x-8 xl:mt-20">
          <RevealParagraph text={PARAGRAPH_TEXT} />
        </div>

        <div className="relative mt-20 w-full xl:mt-0 xl:w-1/2">
          <motion.svg
            className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
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
              <circle cx="610.681" cy="313.504" r="113.504" fill="#3BADFF" />
            </g>
            <g filter="url(#filter3_f_8264_6194)">
              <circle cx="454.761" cy="313.584" r="92.584" fill="#3BADFF" />
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
            <svg
              className="circle-1"
              width="277"
              height="277"
              viewBox="0 0 277 277"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M138.5 0.500574C156.622 0.500573 174.567 4.07004 191.31 11.0052C208.053 17.9403 223.266 28.1053 236.08 40.9198C248.895 53.7342 259.06 68.9472 265.995 85.6901C272.93 102.433 276.499 120.378 276.499 138.5C276.499 156.623 272.93 174.568 265.995 191.31C259.06 208.053 248.895 223.266 236.08 236.081C223.266 248.895 208.053 259.06 191.31 265.995C174.567 272.931 156.622 276.5 138.5 276.5C120.377 276.5 102.432 272.931 85.6895 265.995C68.9466 259.06 53.7336 248.895 40.9192 236.081C28.1047 223.266 17.9397 208.053 11.0046 191.31C4.06946 174.568 0.499992 156.623 0.499994 138.5C0.499996 120.378 4.06947 102.433 11.0046 85.6901C17.9397 68.9472 28.1047 53.7342 40.9192 40.9197C53.7336 28.1053 68.9466 17.9403 85.6895 11.0052C102.432 4.07004 120.377 0.500571 138.5 0.500574L138.5 0.500574Z"
                stroke="#3BADFF"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: CIRCLE_1_DURATION, ease: 'easeOut' }}
              />
            </svg>

            <svg
              className="circle-2"
              width="277"
              height="277"
              viewBox="0 0 277 277"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d={MIDDLE_CIRCLE_RING.d}
                stroke="#3BADFF"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: MIDDLE_CIRCLE_RING.duration,
                  ease: 'linear',
                  delay: CIRCLE_2_DELAY + MIDDLE_CIRCLE_RING.delay,
                }}
              />
              <motion.path
                d={MIDDLE_CIRCLE_DIAMETER.d}
                stroke="#3BADFF"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: MIDDLE_CIRCLE_DIAMETER.duration,
                  ease: 'linear',
                  delay: CIRCLE_2_DELAY + MIDDLE_CIRCLE_DIAMETER.delay,
                }}
              />
              {MIDDLE_CIRCLE_MERIDIANS.map(({ from, to, delay, duration }) => (
                <motion.path
                  key={to}
                  stroke="#3BADFF"
                  initial={{ d: from, opacity: 0 }}
                  animate={{ d: to, opacity: 1 }}
                  transition={{
                    d: { duration, ease: 'easeOut', delay: CIRCLE_2_DELAY + delay },
                    opacity: { duration: 0.01, delay: CIRCLE_2_DELAY + delay },
                  }}
                />
              ))}
            </svg>

            <svg
              className="circle-3"
              width="277"
              height="277"
              viewBox="0 0 277 277"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {CIRCLE_3_RINGS.map(({ d, delay }) => (
                <motion.path
                  key={d.slice(0, 24)}
                  d={d}
                  stroke="#3BADFF"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1,
                    ease: 'linear',
                    delay: CIRCLE_3_DELAY + delay,
                  }}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
