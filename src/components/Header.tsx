import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bgImage from '../assets/image/header/bg-header.svg';

const TYPING_WORDS = ['ideate', 'design', 'develop', 'launch'];
const TYPE_DELAY = 120;
const HOLD_MS = 2000;
const ERASE_DELAY = 60;

export default function Header() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    const word = TYPING_WORDS[wordIndex];

    if (isErasing) {
      if (charCount === 0) {
        setIsErasing(false);
        setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
        return;
      }
      const id = setTimeout(() => setCharCount((c) => c - 1), ERASE_DELAY);
      return () => clearTimeout(id);
    }

    if (charCount >= word.length) {
      const id = setTimeout(() => setIsErasing(true), HOLD_MS);
      return () => clearTimeout(id);
    }

    const id = setTimeout(() => setCharCount((c) => c + 1), TYPE_DELAY);
    return () => clearTimeout(id);
  }, [wordIndex, charCount, isErasing]);

  const word = TYPING_WORDS[wordIndex];
  const displayed = word.slice(0, charCount);

  return (
    <header className="relative h-full w-full overflow-visible">
      <div className="pointer-events-none absolute -bottom-1/2 left-0 h-dvh w-full overflow-visible">
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
      </div>

      <div className="relative z-10 mx-auto mt-12 flex max-w-2160 flex-col items-start px-4 md:mt-[52px] md:flex-row 2xl:mt-[90px]">
        <div className="mt-18 hidden shrink-0 -translate-x-1/2 -rotate-90 items-center gap-2 md:mt-14 md:inline-flex md:pt-16">
          <div className="w-10 shrink-0 overflow-hidden">
            <motion.span
              className="block h-px w-full bg-black"
              initial={{ x: '100%' }}
              animate={{
                x: ['100%', '0%', '-100%'],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                },
              }}
            />
          </div>
          <div className="text-xs text-nowrap whitespace-nowrap text-black uppercase">
            SCROLL DOWN
          </div>
        </div>
        <div className="flex w-full flex-col">
          <h1 className="mx-auto min-h-0 w-full max-w-6xl text-[40px] leading-11 -tracking-[1.6px] text-black sm:min-h-[60px] sm:text-3xl md:min-h-[100px] md:text-[52px] md:leading-[60px] md:-tracking-[2.34px] lg:min-h-[180px] lg:text-[60px] lg:leading-16 lg:-tracking-[2.8px] xl:text-7xl xl:leading-20 xl:-tracking-[2.88px]">
            We{' '}
            <span className="inline-flex items-baseline gap-1 italic">
              {displayed}
              <span
                className="animate-blink inline-block h-10 w-px shrink-0 self-baseline bg-black"
                aria-hidden
              />
            </span>{' '}
            <span className="text-primary">fintech</span> solutions that power seamless digital
            payments.
          </h1>
          <p className="mt-[52px] mb-[72px] ml-auto w-full max-w-[224px] text-xl leading-[26px] -tracking-[0.7px] text-black md:mr-20 md:mb-32 md:max-w-60 lg:mr-32 lg:mb-0 xl:mt-20 xl:mr-64 2xl:mt-36 2xl:mr-[30%] 2xl:max-w-[370px]">
            Agile Partners transform and support every aspect of a fintech business at every phase -
            from start-up to large-scale platform — across the world.
          </p>
          <div className="-ml-24 flex justify-start md:-ml-52 lg:-mt-20 xl:-mt-5 xl:ml-0 2xl:mt-28 2xl:ml-[5%]">
            <img
              src={bgImage}
              alt=""
              className="h-full max-h-[200px] min-h-[200px] w-lg object-cover sm:max-h-44 md:max-h-60 md:min-h-60 md:w-auto xl:max-h-[275px] xl:min-h-[275px] 2xl:max-h-[358px] 2xl:min-h-[358px]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
