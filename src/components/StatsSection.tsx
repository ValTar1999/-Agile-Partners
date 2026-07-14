import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useInView, useMotionValue, animate, type HTMLMotionProps } from 'framer-motion';
import RevealParagraph from './RevealParagraph';

const STATS: { value: number; suffix: string; label: ReactNode }[] = [
  {
    value: 98,
    suffix: '+',
    label: (
      <>
        people in our
        <br />
        team
      </>
    ),
  },
  {
    value: 5,
    suffix: '',
    label: (
      <>
        countries across
        <br />
        the globe
      </>
    ),
  },
  {
    value: 37,
    suffix: '+',
    label: (
      <>
        projects
        <br />
        launched
      </>
    ),
  },
  {
    value: 7,
    suffix: '',
    label: (
      <>
        years rocking
        <br />
        the fintech
        <br />
        world
      </>
    ),
  },
];

const STAT_GRID = [
  'xl:col-span-4 xl:col-start-5 xl:row-start-1',
  'xl:col-span-4 xl:col-start-9 xl:row-start-1',
  'xl:col-span-4 xl:col-start-5 xl:row-start-2',
  'xl:col-span-4 xl:col-start-9 xl:row-start-2',
] as const;

const fadeIn = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} satisfies Pick<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport' | 'transition'>;

function FadeIn({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div className={className} {...fadeIn}>
      {children}
    </motion.div>
  );
}

function StatsGraphic() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
    >
      <g className="stats-svg-lines">
        <path d="M50.0078 1.16602V97.3811" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M41.543 1.91406L58.2291 96.7179" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M33.3242 4.07129L66.2814 94.5583" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M25.6016 7.72461L73.7506 91.0723" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M18.7129 12.54L80.5595 86.2579" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M12.6523 18.6006L86.3702 80.4472" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M7.83789 25.4902L91.1856 73.6393" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M4.18555 33.2109L94.6726 66.1681" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M2.02539 41.4287L96.8292 58.1148" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M1.2793 49.8975H97.4944" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M2.02539 58.3629L96.8292 41.6768" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M4.18555 66.5822L94.6726 33.625" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M7.83789 74.2194L91.1856 26.1533" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M12.6523 81.1923L86.3702 19.3457" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M18.7129 87.254L80.5595 13.5361" stroke="#0AE58A" strokeMiterlimit="10" />
        <path d="M25.6016 92.0674L73.7506 8.71973" stroke="#0AE58A" strokeMiterlimit="10" />
      </g>
      <path d="M1.30078 99.1053V50.3906H49.5005V99.1053H1.30078Z" fill="url(#stats-paint0)" />
      <path
        d="M98.7227 1.16699L98.7227 49.4219L50.5015 49.4219L50.5015 1.16699L98.7227 1.16699Z"
        fill="url(#stats-paint1)"
      />
      <defs>
        <linearGradient
          id="stats-paint0"
          x1="42.4367"
          y1="64.0142"
          x2="6.66487"
          y2="50.059"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="stats-paint1"
          x1="57.5684"
          y1="35.9269"
          x2="93.2616"
          y2="49.9904"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AnimatedNumber({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    const unsub = motionValue.on('change', (v) => setDisplay(`${Math.round(v)}${suffix}`));
    return unsub;
  }, [motionValue, suffix]);

  useEffect(() => {
    if (start) {
      const controls = animate(motionValue, value, { duration: 1.8, ease: [0.22, 0.61, 0.36, 1] });
      return () => controls.stop();
    }
  }, [start, value, motionValue]);

  return (
    <span className="inline-block shrink-0 text-left text-[96px] leading-[82px] font-normal -tracking-[4.8px] tabular-nums lg:text-[168px] lg:leading-[168px] lg:-tracking-[8.4px]">
      {display}
    </span>
  );
}

export default function StatsSection() {
  const blockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(blockRef, { once: true, margin: '-60px' });

  return (
    <section className="mx-auto w-full max-w-2160 px-4 md:px-10">
      <div className="flex flex-col gap-12 border-y border-white/20 pt-8 pb-24 md:gap-16 md:pt-10 xl:gap-0">
        <div className="grid grid-cols-[1fr_auto] items-start gap-6 md:grid-cols-12 md:gap-x-8">
          <div className="flex min-w-0 flex-col gap-6 md:col-span-8 lg:contents">
            <RevealParagraph
              className="lg:col-span-2"
              textClassName="text-sm font-normal tracking-[0.14px] text-current uppercase xl:text-base xl:tracking-[0.16px] xl:text-nowrap"
              leading={{ initial: '32px', final: '16px' }}
            >
              Let us share some stats
            </RevealParagraph>

            <RevealParagraph
              className="lg:col-span-5 lg:col-start-5"
              textClassName="text-xl font-normal -tracking-[0.7px] text-current xl:text-2xl xl:-tracking-[0.72px]"
              delay={0.08}
              leading={{ initial: '56px', final: '26px' }}
            >
              Fintech isn't easy. We just make it feel that way.
            </RevealParagraph>
          </div>

          <FadeIn className="flex shrink-0 justify-end md:col-span-2 md:col-start-11 2xl:ml-20">
            <StatsGraphic />
          </FadeIn>
        </div>

        <div
          ref={blockRef}
          className="grid grid-cols-1 gap-y-12 md:w-fit md:max-w-full md:grid-cols-2 md:gap-x-12 lg:gap-x-24 xl:w-full xl:max-w-none xl:grid-cols-12 xl:gap-x-8 xl:gap-y-[72px]"
        >
          {STATS.map(({ value, suffix, label }, index) => (
            <motion.div
              key={`${value}${suffix}`}
              className={`flex w-full flex-col items-start gap-1 text-current md:flex-row md:items-start md:gap-6 xl:gap-4 ${STAT_GRID[index]}`}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.12 + index * 0.08,
              }}
            >
              <AnimatedNumber value={value} suffix={suffix} start={isInView} />
              <span className="shrink-0 text-left text-base leading-5 -tracking-[0.48px] whitespace-nowrap text-current">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
