import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCircleGraphic, { type AnimatedCircleGraphicType } from './AnimatedCircleGraphic';
import RevealLine, { RevealWrappedLines } from './RevealLine';

const services = [
  'UX/UI design',
  'Product management',
  'Website and mobile development',
  'Platform architecture',
];

const phases = [
  {
    title: 'Strategy and Planning',
    number: '01',
    description:
      'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'circle' as AnimatedCircleGraphicType,
  },
  {
    title: 'Create and Build',
    number: '02',
    description:
      'We focus on generating ideas and strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'sphere' as AnimatedCircleGraphicType,
    twoColumns: true,
  },
  {
    title: 'Promote and Grow',
    number: '03',
    description:
      'We focus on generating ideas & strategies that are progressive, feasible, scalable, and have what it takes to turn into a pioneering fintech solution.',
    services,
    graphic: 'target' as AnimatedCircleGraphicType,
  },
];

const serviceItemClass =
  'text-xl leading-7 font-normal -tracking-[0.7px] text-current xl:text-2xl xl:leading-7 xl:-tracking-[0.72px]';
const LINE_REVEAL_DURATION = 0.5;
const TEXT_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HEADING_SEGMENTS = [
  { text: 'We thrive at the intersection of' },
  {
    text: 'technology, data, design, and marketing.',
    className: 'text-primary',
  },
];

function PhaseGraphic({
  type,
  delay = 0,
  active,
}: {
  type: AnimatedCircleGraphicType;
  delay?: number;
  active: boolean;
}) {
  return (
    <AnimatedCircleGraphic
      type={type}
      active={active}
      delay={delay}
      size={160}
      strokeWidth={2}
      className="shrink-0"
      circleVariant={type === 'circle' ? 'double' : 'once'}
    />
  );
}

type Phase = (typeof phases)[number];

function PhaseBlock({ phase }: { phase: Phase }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, margin: '-220px' });

  const lineDelay = 0.55;
  const afterLine = lineDelay + LINE_REVEAL_DURATION;

  return (
    <div ref={ref} className="grid grid-cols-1 items-start md:grid-cols-12 md:gap-x-8 md:gap-y-0">
      <motion.div
        className="mb-5 hidden h-px w-full origin-left bg-current md:col-span-4 md:col-start-1 md:row-start-1 md:block xl:col-span-4 xl:col-start-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{
          duration: LINE_REVEAL_DURATION,
          ease: 'easeOut',
          delay: lineDelay,
        }}
      />
      <motion.div
        className="mb-5 hidden h-px w-full origin-left bg-current md:col-span-8 md:col-start-5 md:row-start-1 md:block xl:col-span-5 xl:col-start-7"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{
          duration: LINE_REVEAL_DURATION,
          ease: 'easeOut',
          delay: lineDelay,
        }}
      />
      <motion.div
        className="mb-5 h-px w-full origin-left bg-current md:hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{
          duration: LINE_REVEAL_DURATION,
          ease: 'easeOut',
          delay: lineDelay,
        }}
      />

      <div className="mb-8 flex w-full items-baseline justify-between gap-4 md:mb-0 md:contents">
        <div className="overflow-hidden md:col-span-3 md:col-start-1 md:row-start-2 md:mb-0 xl:col-span-3 xl:col-start-2">
          <motion.h3
            className="min-w-0 text-2xl leading-7 font-medium -tracking-[0.72px] text-current"
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
              duration: 0.55,
              ease: TEXT_REVEAL_EASE,
              delay: afterLine,
            }}
          >
            {phase.title}
          </motion.h3>
        </div>
        <div className="overflow-hidden md:col-span-1 md:col-start-4 md:row-start-2 md:mb-0 md:text-right xl:col-start-5">
          <motion.span
            className="font-inter shrink-0 text-2xl leading-7 -tracking-[0.72px] text-current"
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
              duration: 0.5,
              ease: TEXT_REVEAL_EASE,
              delay: afterLine + 0.06,
            }}
          >
            {phase.number}
          </motion.span>
        </div>
      </div>

      <div className="col-span-full flex justify-center py-12 md:col-span-4 md:col-start-1 md:row-start-3 md:py-0 md:pt-8 xl:col-span-2 xl:col-start-3 xl:pt-20">
        <PhaseGraphic type={phase.graphic} active={active} delay={afterLine + 0.13} />
      </div>

      <div className="col-span-full flex flex-col md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-2 xl:col-span-5 xl:col-start-7">
        <motion.p
          className="mb-8 text-xl leading-[26px] -tracking-[0.7px] text-current"
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{
            duration: 0.55,
            ease: TEXT_REVEAL_EASE,
            delay: afterLine + 0.07,
          }}
        >
          {phase.description}
        </motion.p>
        {phase.twoColumns ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-1">
            <ul className="space-y-1">
              {phase.services.map((s, serviceIndex) => (
                <motion.li
                  key={s}
                  className={serviceItemClass}
                  initial={{ opacity: 0, y: 24 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.45,
                    ease: TEXT_REVEAL_EASE,
                    delay: afterLine + 0.19 + serviceIndex * 0.06,
                  }}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
            <ul className="space-y-1">
              {phase.services.map((s, serviceIndex) => (
                <motion.li
                  key={`${s}-2`}
                  className={serviceItemClass}
                  initial={{ opacity: 0, y: 24 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{
                    duration: 0.45,
                    ease: TEXT_REVEAL_EASE,
                    delay: afterLine + 0.19 + (serviceIndex + phase.services.length) * 0.06,
                  }}
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="space-y-1">
            {phase.services.map((s, serviceIndex) => (
              <motion.li
                key={s}
                className={serviceItemClass}
                initial={{ opacity: 0, y: 24 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.45,
                  ease: TEXT_REVEAL_EASE,
                  delay: afterLine + 0.19 + serviceIndex * 0.06,
                }}
              >
                {s}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function WhatWeDo({ id }: { id?: string }) {
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: '-40px' });

  return (
    <section
      id={id}
      className="relative z-10 mx-auto w-full max-w-2160 scroll-pt-20 px-4 pt-24 pb-16 md:px-10 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 xl:pt-80"
    >
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-12">
        <div ref={introRef} className="col-span-12 xl:col-span-6 xl:col-start-2">
          <RevealLine
            active={introInView}
            className="mb-5 text-sm leading-4 tracking-[0.14px] text-current uppercase md:text-base md:leading-5 md:tracking-[0.16px]"
          >
            WHAT WE DO
          </RevealLine>
          <h2 className="text-[32px] leading-[34px] -tracking-[1.28px] text-current md:text-[52px] md:leading-[60px] md:-tracking-[2.34px]">
            <RevealWrappedLines
              active={introInView}
              baseDelay={0.15}
              stagger={0.15}
              segments={HEADING_SEGMENTS}
            />
          </h2>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-20 md:mt-[100px] md:gap-24 lg:gap-[100px]">
        {phases.map((phase) => (
          <PhaseBlock key={phase.number} phase={phase} />
        ))}
      </div>
    </section>
  );
}
