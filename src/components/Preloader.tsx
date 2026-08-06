import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from '../hooks/useLenis';

const BRAND = '#3AA9FA';

const A_PATHS = [
  'M23.8564 1.54021C25.2147 -0.396232 27.8323 -0.528778 29.2207 1.26775L29.3516 1.44744L29.3525 1.44939C29.7749 2.08299 29.9296 2.76704 29.9297 3.4826V8.01092C29.9057 11.578 29.9053 15.1461 29.9053 18.7385V35.633H27.5381V3.18377C27.5169 2.98704 27.4566 2.83625 27.3682 2.71893C27.2768 2.59787 27.1425 2.49556 26.9541 2.41619C26.6277 2.27883 26.3181 2.35119 26.0273 2.62225L26.0205 2.62908C25.8672 2.76334 25.75 2.95663 25.5928 3.19256L25.5889 3.19842C21.9126 8.44341 16.2416 16.5146 11.4902 23.2736C9.11478 26.6528 6.96896 29.7046 5.41699 31.9113C4.6411 33.0146 4.01263 33.9073 3.5791 34.5236C3.36262 34.8314 3.1941 35.0705 3.08008 35.2326C3.02318 35.3135 2.97942 35.3756 2.9502 35.4172C2.93593 35.4374 2.92534 35.4535 2.91797 35.464C2.91454 35.4689 2.91107 35.4731 2.90918 35.4758C2.90838 35.4769 2.90765 35.4788 2.90723 35.4797L2.66309 35.3088L2.90625 35.4806L2.81738 35.6066H0L0.327148 35.1388L0.328125 35.1379C0.328753 35.1372 0.33025 35.1351 0.331055 35.134C0.333027 35.1311 0.336212 35.1265 0.339844 35.1213C0.347645 35.1101 0.358909 35.093 0.374023 35.0715C0.404983 35.0272 0.45148 34.9612 0.511719 34.8752C0.632476 34.7027 0.81098 34.4484 1.04004 34.1213C1.49853 33.4665 2.1621 32.5185 2.98047 31.3498C4.61742 29.012 6.87559 25.7863 9.36133 22.2365C14.3333 15.1363 20.2162 6.73712 23.8564 1.54021ZM29.1055 1.61541C29.0674 1.55948 29.0277 1.50467 28.9873 1.45232L29.1055 1.61541ZM24.7842 0.977714C24.7338 1.01786 24.6844 1.06001 24.6357 1.10369L24.7842 0.977714C24.8345 0.937554 24.8856 0.900074 24.9375 0.863457L24.7842 0.977714ZM28.4492 0.908378C28.4978 0.946471 28.546 0.985851 28.5928 1.02752C28.4991 0.94409 28.4014 0.868104 28.3008 0.799003L28.4492 0.908378Z',
  'M16.5605 21.674C17.2757 21.6859 18.3509 21.6868 19.249 21.6838C19.6977 21.6823 20.1019 21.6798 20.3936 21.6779C20.5393 21.677 20.657 21.6756 20.7383 21.675C20.7789 21.6747 20.8107 21.6751 20.832 21.675C20.8426 21.6749 20.851 21.674 20.8564 21.674H24.3174V24.0412H17.1064C16.9617 24.0412 16.8772 24.0658 16.8135 24.1008C16.7476 24.137 16.6758 24.199 16.583 24.3215L16.584 24.3224C15.3499 26.0836 13.367 28.8737 11.6934 31.2228C10.8565 32.3975 10.0956 33.4625 9.54492 34.2336C9.2697 34.619 9.04677 34.9319 8.89258 35.1476C8.81569 35.2552 8.75543 35.3389 8.71484 35.3957C8.69481 35.4237 8.67935 35.4456 8.66895 35.4601C8.66399 35.4671 8.65986 35.473 8.65723 35.4767C8.65604 35.4784 8.65495 35.4806 8.6543 35.4816L8.65332 35.4826L8.56445 35.6066H5.76953L9.70215 30.0402L9.70312 30.0392C9.70355 30.0386 9.70436 30.0373 9.70508 30.0363C9.70669 30.0339 9.70885 30.0299 9.71191 30.0256C9.71863 30.016 9.72922 30.0011 9.74219 29.9826C9.76839 29.9452 9.80679 29.8895 9.85645 29.8185C9.95607 29.6762 10.1009 29.4701 10.2793 29.215C10.6366 28.7043 11.1315 27.9967 11.6807 27.2111C12.7779 25.6415 14.0929 23.7581 14.9668 22.5012C15.1564 22.2168 15.3789 22.004 15.6523 21.8654C15.9242 21.7277 16.2251 21.674 16.5557 21.674H16.5605ZM15.2148 22.6662C13.4781 25.1642 9.99233 30.1444 9.94629 30.2101C9.94922 30.206 13.4672 25.1799 15.2148 22.6662Z',
] as const;

const P_PATH =
  'M2.9502 0.0189386C4.18751 -0.104793 5.14997 0.384336 5.87988 1.29335L6.02344 1.48085L6.02637 1.48574C7.11585 3.0541 8.20524 4.6174 9.29492 6.18007C10.3843 7.74229 11.4739 9.30494 12.5635 10.8734C14.4066 13.5065 16.2759 16.1663 18.0967 18.8256C19.3256 20.6037 18.6982 22.901 16.752 23.7689C16.2729 23.9818 15.7504 24.0589 15.2666 24.059H5.60254V21.6908H15.1699C15.4461 21.6908 15.6703 21.6667 15.8506 21.5951C16.0193 21.5281 16.1616 21.4151 16.2715 21.2045C16.477 20.8106 16.35 20.4631 16.0518 20.0268C12.1004 14.3512 8.17354 8.70018 4.22266 3.04921C4.08387 2.85486 3.99657 2.71388 3.8916 2.62636L3.88477 2.62148L3.87988 2.61659C3.37466 2.14746 2.56256 2.37884 2.38086 3.05019C2.32146 3.26815 2.31934 3.5153 2.31934 3.81093V35.6019H0V3.4037C0.000183003 1.58745 1.15843 0.203631 2.9502 0.0189386ZM15.2666 23.7601L15.6104 23.7465C15.495 23.7562 15.3801 23.7601 15.2666 23.7601Z';

const EASE = [0.65, 0, 0.35, 1] as const;
const WORDMARK_EASE = [0.16, 1, 0.3, 1] as const;
const OPEN_WIDTH = 640;
const CLOSED_WIDTH = 52;
const LINE_REVEAL_DURATION = 0.9;
const LETTER_REVEAL_DELAY = LINE_REVEAL_DURATION / 2;

type Phase = 'intro' | 'pull' | 'brand' | 'exit';

type PreloaderProps = {
  onComplete?: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const lenis = useLenis();

  useEffect(() => {
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = html.style.backgroundColor;

    document.body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
    document.body.style.backgroundColor = '#000000';
    html.style.backgroundColor = '#000000';
    lenis?.stop();

    const prevent = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });

    const timers = [
      window.setTimeout(() => setPhase('pull'), 1500),
      window.setTimeout(() => setPhase('brand'), 2400),
      window.setTimeout(() => setPhase('exit'), 4900),
      window.setTimeout(() => onComplete?.(), 5900),
    ];

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
      document.body.style.overflow = prevBody;
      html.style.overflow = prevHtml;
      document.body.style.backgroundColor = prevBodyBg;
      html.style.backgroundColor = prevHtmlBg;
      lenis?.start();
    };
  }, [lenis, onComplete]);

  const open = phase === 'intro';
  const branded = phase === 'brand' || phase === 'exit';
  const exiting = phase === 'exit';

  return (
    <motion.div
      className="fullscreen-fixed z-10000 flex items-center justify-center bg-black"
      initial={{ y: 0 }}
      animate={{ y: exiting ? '-100%' : 0 }}
      transition={{ duration: 1, ease: EASE }}
      aria-hidden
    >
      <div className="relative flex items-center">
        {/*
              Stage width shrinks on pull → justify-between pulls A & P together.
              Line is absolute in the center and grows with scaleX from the middle.
            */}
        <motion.div
          className="relative flex h-9 max-w-[72vw] items-center justify-between"
          initial={{ width: OPEN_WIDTH }}
          animate={{
            width: open ? OPEN_WIDTH : CLOSED_WIDTH,
            x: branded ? -80 : 0,
          }}
          transition={{
            width: { duration: 0.8, ease: EASE },
            x: {
              duration: 1.1,
              ease: WORDMARK_EASE,
              delay: branded ? 0.8 : 0,
            },
          }}
        >
          {/* A — left edge */}
          <motion.svg
            width="30"
            height="36"
            viewBox="0 0 30 36"
            fill="none"
            className="relative z-10 shrink-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              color: branded ? BRAND : '#ffffff',
            }}
            transition={{
              opacity: { duration: 0.3, ease: 'easeOut', delay: LETTER_REVEAL_DELAY },
              color: { duration: 0.45, ease: 'easeInOut' },
            }}
          >
            {A_PATHS.map((d) => (
              <path
                key={d.slice(0, 24)}
                d={d}
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            ))}
          </motion.svg>

          {/* Line — grows from center to sides, then shrinks */}
          <motion.div
            className="pointer-events-none absolute top-1/2 right-[39px] left-[50px] h-px origin-center -translate-y-1/2 bg-white/55"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: open ? 1 : 0 }}
            transition={{ duration: LINE_REVEAL_DURATION, ease: EASE }}
          />

          {/* P — right edge */}
          <motion.svg
            width="19"
            height="36"
            viewBox="0 0 19 36"
            fill="none"
            className="relative z-10 shrink-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              color: branded ? BRAND : '#ffffff',
            }}
            transition={{
              opacity: { duration: 0.3, ease: 'easeOut', delay: LETTER_REVEAL_DELAY },
              color: { duration: 0.45, ease: 'easeInOut' },
            }}
          >
            <path d={P_PATH} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          </motion.svg>
        </motion.div>

        {/* Wordmark */}
        <motion.span
          className="absolute top-1/2 left-1/2 block text-[25px] leading-normal -tracking-[0.255px] whitespace-nowrap text-white"
          style={{ fontFamily: '"Haas Grot Disp", sans-serif', marginLeft: -38, y: '-50%' }}
          initial={{ opacity: 0, x: -70 }}
          animate={{
            opacity: branded ? 1 : 0,
            x: branded ? 0 : -70,
          }}
          transition={{
            opacity: {
              duration: 2,
              ease: WORDMARK_EASE,
              delay: branded ? 1 : 0,
            },
            x: {
              duration: 1.1,
              ease: WORDMARK_EASE,
              delay: branded ? 0.8 : 0,
            },
          }}
        >
          Agile Partners
        </motion.span>
      </div>
    </motion.div>
  );
}
